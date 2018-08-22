<template>
    <div>
        <div class="row mt-2">
            <div class="col-2">
                <h2>Sportsmen</h2>
            </div>
            <div class="col-4">
                <b-dropdown variant="outline-primary" right text="Activate">
                    <b-dropdown-item @click="activateSelected">Activate</b-dropdown-item>
                    <b-dropdown-item @click="deactivateSelected">Deactivate</b-dropdown-item>
                    <b-dropdown-item @click="buySubscription">Buy Sudscription</b-dropdown-item>
                    <b-dropdown-item @click="deleteSportsman">Delete</b-dropdown-item>
                </b-dropdown>
            </div>
            <div class="col-4">
                <nav class="navbar navbar-light">
                    <form class="form-inline">
                        <input 
                               v-model="searchingSportsman"
                               class="form-control mr-sm-2"
                               type="search"
                               placeholder="Enter name"
                               aria-label="Search">
                        <button class="btn btn-primary my-2 my-sm-0">
                            Search
                        </button>
                    </form>
                </nav>
            </div>
            <div class="col-2">
                <b-dropdown variant="outline-primary" right text="Create">
                    <b-dropdown-item @click="createPerson('Coach')">Coach</b-dropdown-item>
                    <b-dropdown-item @click="createPerson('Referee')">Referee</b-dropdown-item>
                    <b-dropdown-item @click="createPerson('Sportsman')">Sportsman</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>

        <div class="row">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th><input type="checkbox" @click="selectAll" v-model="allSelected"></th>
                    <th class="table__head-item" scope="col">Sportsman</th>
                    <th class="table__head-item" scope="col">Coaches</th>
                    <th class="table__head-item" scope="col">City</th>
                    <th class="table__head-item" scope="col">Active</th>
                    <th class="table__head-item" scope="col">Is Coach</th>
                    <th class="table__head-item" scope="col">Subscription expiry date</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <!-- <tbody name="items" :list="$store.state.sportsmanList"> -->
                <!-- <tr v-for="item in $store.state.sportsmanList"> --> <!--to delete, previous variant without search-->
                <tbody name="items" :list="this.$store.getters.getFilteredSportsmenList(this.searchingSportsman)">
                  <tr v-for="item in this.$store.getters.getFilteredSportsmenList(this.searchingSportsman)">
                    <td><input type="checkbox"
                               v-model="$store.state.selectedSportsmen"
                               @click="selectSportsman"
                               :value="item.id" >
                    </td>
                    <td>{{item.first_name}} {{item.last_name}}</td>
                    <td>{{item.patronymic_name}}</td>
                    <td>{{item.city}}</td>
                    <td>
                        <input @click="toggleActive(item.id)"
                               type="checkbox"
                               v-model="item.federation_sportsmen[0].is_active"
                               v-bind:true-value="checkbox.active"
                               v-bind:false-value="checkbox.notActive" />
                    </td>
                    <td>
                        <input @click="toggleIsCoach(item.id)"
                               type="checkbox"
                               v-model="item.federation_sportsmen[0].is_coach"
                               v-bind:true-value="checkbox.coach"
                               v-bind:false-value="checkbox.notCoach" />
                    </td>
                    <td>{{item.date_of_birth}}</td>
                    <th>
                        <button @click.prevent="editSportsman(item.id)" class="btn btn-outline-primary btn-sm">
                            Edit
                        </button>
                    </th>
                </tr>
                </tbody>
            </table>
        </div>
        <modal-form
                v-bind:sportsman-id="sportsmanId"
                v-bind:person-role="roleOfCreatedPerson"
                @clicked="closeAndUpdate"
                @click.prevent="closeModal"
                v-if="modalShow">
        </modal-form>
    </div>
</template>

<script>
import axios from "axios";
import ModalForm from "./modalForm.vue";
export default {
  name: "federation-sportsmen",
  components: {
    ModalForm
  },
  data: function() {
    return {
      federationId: "",
      modalShow: false,
      roleOfCreatedPerson: "",
      sportsmanId: "",
      checkbox: {
        active: 1,
        notActive: 0,
        coach: 1,
        notCoach: 0
      },
      allSelected: false,
      searchingSportsman: '',
      http: axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.authUser.auth_token,
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE"
        }
      })
    };
  },
  beforeMount() {
    this.$store.state.sportsmanList = {};
    this.$store.state.selectedSportsmen = [];
  },
  mounted() {
    this.federationId = this.$store.state.authUser.federation_users[0].federation_id;
    axios
      .get(
        `http://champion-api.herokuapp.com/api/sportsman-list/all-by-federation/${
          this.federationId
        }/20`
      )
      .then(response => {
        this.$store.commit("setSportsmanList", response.data.data);
        this.$store.commit('setSportsmenList', response.data.data);
        console.log(response.data);
      })
      .catch(error => console.log(error));
  },
  methods: {
    selectAll() {
      this.$store.state.selectedSportsmen = [];
      if (!this.allSelected) {
        this.$store.commit("setSelectedSportsmen");
      }
    },
    selectSportsman() {
      this.allSelected = false;
    },
    createPerson(role) {
      this.modalShow = true;
      this.roleOfCreatedPerson = role;
    },
    editSportsman(id) {
      this.sportsmanId = id;
      this.modalShow = true;
    },
    closeModal() {
      this.modalShow = false;
      this.sportsmanId = "";
      this.roleOfCreatedPerson = "";
      this.$store.commit("clearSportsmanModel");
    },
    closeAndUpdate() {
      this.modalShow = false;
      this.sportsmanId = "";
      this.roleOfCreatedPerson = "";
      this.$store.commit("clearSportsmanModel");
      axios
        .get(
          `http://champion-api.herokuapp.com/api/sportsman-list/all-by-federation/${
            this.federationId
          }/20`
        )
        .then(response => {
          this.$store.commit("setSportsmanList", response.data.data);
        })
        .catch(error => console.log(error));
    },
    toggleActive(id) {
      if (
        this.$store.state.sportsmanList[id].federation_sportsmen[0]
          .is_active === 0
      ) {
        this.$store.state.sportsmanList[
          id
        ].federation_sportsmen[0].is_active = 1;
      } else {
        this.$store.state.sportsmanList[
          id
        ].federation_sportsmen[0].is_active = 0;
      }
      this.http
        .post(
          `http://champion-api.herokuapp.com/api/federation-sportsman/${
            this.$store.state.sportsmanList[id].federation_sportsmen[0].id
          }`,
          {
            _method: "put",
            sportsman_id: id,
            federation_id: this.federationId,
            is_active: this.$store.state.sportsmanList[id]
              .federation_sportsmen[0].is_active,
            is_coach: this.$store.state.sportsmanList[id]
              .federation_sportsmen[0].is_coach,
            is_referee: this.$store.state.sportsmanList[id]
              .federation_sportsmen[0].is_referee,
            belt: this.$store.state.sportsmanList[id].federation_sportsmen[0]
              .belt
          }
        )
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
    },
    toggleIsCoach(id) {
      if (
        this.$store.state.sportsmanList[id].federation_sportsmen[0].is_coach ===
        0
      ) {
        this.$store.state.sportsmanList[
          id
        ].federation_sportsmen[0].is_coach = 1;
      } else {
        this.$store.state.sportsmanList[
          id
        ].federation_sportsmen[0].is_coach = 0;
      }
      this.http
        .post(
          `http://champion-api.herokuapp.com/api/federation-sportsman/${
            this.$store.state.sportsmanList[id].federation_sportsmen[0].id
          }`,
          {
            _method: "put",
            sportsman_id: id,
            federation_id: this.federationId,
            is_active: this.$store.state.sportsmanList[id]
              .federation_sportsmen[0].is_active,
            is_coach: this.$store.state.sportsmanList[id]
              .federation_sportsmen[0].is_coach,
            is_referee: this.$store.state.sportsmanList[id]
              .federation_sportsmen[0].is_referee,
            belt: this.$store.state.sportsmanList[id].federation_sportsmen[0]
              .belt
          }
        )
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
    },
    activateSelected() {
      this.$store.state.selectedSportsmen.map(id => {
        this.$store.state.sportsmanList[
          id
        ].federation_sportsmen[0].is_active = 1;
        return this.http
          .post(
            `http://champion-api.herokuapp.com/api/federation-sportsman/${
              this.$store.state.sportsmanList[id].federation_sportsmen[0].id
            }`,
            {
              _method: "put",
              sportsman_id: id,
              federation_id: this.federationId,
              is_active: this.$store.state.sportsmanList[id]
                .federation_sportsmen[0].is_active,
              is_coach: this.$store.state.sportsmanList[id]
                .federation_sportsmen[0].is_coach,
              is_referee: this.$store.state.sportsmanList[id]
                .federation_sportsmen[0].is_referee,
              belt: this.$store.state.sportsmanList[id].federation_sportsmen[0]
                .belt
            }
          )
          .then(response => console.log(response.data))
          .catch(error => console.log(error));
      });
    },
    deactivateSelected() {
      this.$store.state.selectedSportsmen.map(id => {
        this.$store.state.sportsmanList[
          id
        ].federation_sportsmen[0].is_active = 0;
        return this.http
          .post(
            `http://champion-api.herokuapp.com/api/federation-sportsman/${
              this.$store.state.sportsmanList[id].federation_sportsmen[0].id
            }`,
            {
              _method: "put",
              sportsman_id: id,
              federation_id: this.federationId,
              is_active: this.$store.state.sportsmanList[id]
                .federation_sportsmen[0].is_active,
              is_coach: this.$store.state.sportsmanList[id]
                .federation_sportsmen[0].is_coach,
              is_referee: this.$store.state.sportsmanList[id]
                .federation_sportsmen[0].is_referee,
              belt: this.$store.state.sportsmanList[id].federation_sportsmen[0]
                .belt
            }
          )
          .then(response => console.log(response.data))
          .catch(error => console.log(error));
      });
    },
    buySubscription() {
      this.$router.push({ path: "/buysubscribtion" });
    },
    deleteSportsman() {
      this.$store.state.selectedSportsmen.map(id => {
        return axios
          .post(`https://champion-api.herokuapp.com/api/sportsman/${id}`, {
            _method: "delete"
          })
          .then(response => console.log(response))
          .catch(error => console.log(error.message));
      });
      this.$store.commit("removeSportsman");
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
