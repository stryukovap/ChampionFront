<template>
    <div class="tournaments-cabinet container mt-3">
        <div class="row text-left mt-3">
            <div class="col-12">
                <button v-on="$listeners" class="btn btn-sm btn-outline-success">⇐ Back to tournament list</button>
            </div>
        </div>
        <div class="row text-left mt-3 mb-3">
            <div class="col-6">
                <h2 class="title">{{tournament.name}}</h2>
            </div>
            <div class="col-4">
                <button class="col btn btn-success pl-4 pr-4">Start</button>
            </div>
            <div class="col-2 text-right">
                <button @click.prevent="editTournament" class="btn btn-outline-success">Edit</button>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p>{{tournament.description}}</p>
                <p>{{tournament.dates.dateStart}} - {{tournament.dates.dateEnd}}</p>
            </div>
            <div class="col">
                <h3>Referees</h3>
                <div class="col" style="display: flex; flex-wrap: wrap; justify-content: flex-start">
                    <div class="card__referee"
                         v-for="referee in tournament.referees"
                         style=" margin-right: 15px;display: flex; flex-direction: column;align-items: center;">
                        <img src="img/github-mark_560x560.png" width="100px" height="100px"
                             alt="foto referee"
                             class="card__img">
                        <span class="card__desc">{{referee.first_name}} {{referee.last_name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <Tabs>
            <Tab name="Brackets">
                <h3>Categories</h3>
                <div class="row" v-for="category in tournament.categories">
                    <div class="col">
                        Category name: {{category.name}}
                        {{category.ageFrom}} - {{category.ageTo}},
                        Gender - {{category.gender}},
                        Weight - {{category.weight}}
                    </div>
                </div>
            </Tab>
            <Tab name="Participants">
                <div class="row mt-2">
                    <div class="col-sm-8 col-md-10 col-lg-11">
                        <nav class="navbar navbar-light">
                            <form class="form-inline">
                                <input
                                        class="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Enter name"
                                        aria-label="Search">
                                <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </nav>
                    </div>
                    <div class="col-1">
                        <button type="button" @click.prevent="addSportsmen" class="btn btn-primary">Add</button>
                    </div>
                </div>

                <div class="row ml-2" v-if="'sportsmen' in this.$store.state.tournamentsList[this.tournamentKey]">
                    <table class="table table-hover table-sm">
                        <tbody>
                        <tr class="row"
                            v-for="(item, key) in $store.state.tournamentsList[this.tournamentKey].sportsmen"
                            >
                            <td class="col-2 text-left">{{item.sportsman.first_name}} {{item.sportsman.last_name}}</td>
                            <td class="col-1 text-left">{{item.sportsman.gender}}</td>
                            <td class="col-2 text-left">{{item.sportsman.date_of_birth}}</td>
                            <td class="col-2 text-left">
                                <input class="form-control form-control-sm" v-model="item.sportsman.weight">
                            </td>
                            <td class="col-sm-3 col-md-3 col-lg-4 text-right">
                                <button type="button"
                                        v-if="item.isPermit === false"
                                        class="btn btn-outline-primary btn-sm"
                                @click.prevent="permitParticipation(item, key)">Submit</button>
                            </td>
                            <td class="col-1 text-left">
                                <button type="button"
                                        class="btn btn-outline-primary btn-sm"
                                        @click.prevent="removeSportsman(key)">Delete</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Tab>
        </Tabs>
        <tournament-create
                v-if="tournamentEditShow"
                v-bind:tournament-key="tournamentKey"
                @click.prevent="tournamentEditShow = false"
                @clicked="closeAndUpdate"
        ></tournament-create>
        <add-sportsmen-popup
                v-if="sportsmenAddListShow"
                v-bind:tournament-key="tournamentKey"
                @click.prevent="closeModal"
                @clicked="closeAndUpdate">
        </add-sportsmen-popup>
    </div>
</template>
<script>
import axios from "axios";
import * as firebase from "firebase";
import { Tabs, Tab } from "vue-tabs-component";
import TournamentCreate from "./tournamentCreate";
import AddSportsmenPopup from "./tournamentAddSportsmanPopup";

export default {
  name: "tournament-page",
  components: {
    Tab,
    Tabs,
    TournamentCreate,
    AddSportsmenPopup
  },
  props: ["tournamentKey"],
  data: function() {
    return {
      tournament: {},
      tournamentEditShow: false,
      sportsmenAddListShow: false,
      federationId: "",
      http: axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.authUser.auth_token
        }
      })
    };
  },
  beforeMount() {
    this.tournament = this.$store.state.tournamentsList[this.tournamentKey];
  },
  mounted() {
    this.federationId = this.$store.state.authUser.federation_users[0].federation_id;
  },
  methods: {
    editTournament() {
      this.tournamentEditShow = true;
    },
    addSportsmen() {
      this.sportsmenAddListShow = true;
    },
    closeModal() {
      this.sportsmenAddListShow = false;
    },
    async closeAndUpdate() {
      this.sportsmenAddListShow = false;
      this.tournamentEditShow = false;
      try {
        const fbObj = await firebase
          .database()
          .ref(this.federationId)
          .once("value");
        this.$store.commit("setTournamentsList", fbObj.val());
      } catch (error) {
        throw error;
      }
    },
    async permitParticipation(item, key) {
      item.isPermit = true;
      try {
        await firebase
          .database()
          .ref(this.federationId)
          .child(this.tournamentKey)
          .child("sportsmen")
          .child(key)
          .update(item);
      } catch (error) {
        throw error;
      }
      // item.sportsman._method = "put";
      // this.http.post(`https://champion-api.herokuapp.com/api/sportsman/${item.sportsman.id}`,
      //     item.sportsman)
      //     .catch(error => console.log(error.message));
    },
    async removeSportsman(key) {
      try {
        await firebase
          .database()
          .ref(this.federationId)
          .child(this.tournamentKey)
          .child("sportsmen")
          .child(key)
          .remove();
      } catch (error) {
        throw error;
      }
      try {
        const fbObj = await firebase
          .database()
          .ref(this.federationId)
          .once("value");
        this.$store.commit("setTournamentsList", fbObj.val());
      } catch (error) {
        throw error;
      }
    }
  }
};
</script>

<style lang="scss">
.table {
  &__head-item {
    cursor: pointer;
  }
}
.navbar-light {
  margin-top: -8px;
}
</style>
