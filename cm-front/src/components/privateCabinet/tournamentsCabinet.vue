<template>
    <div class="tournaments-cabinet container mt-3">
        <h1>Tournaments</h1>
        <div class="row text-left mt-3 mb-3">
            <h2 class="title col">{{tournament.title}}</h2>
            <button class="col btn btn-success">Start</button>
        </div>
        <div class="row">
            <div class="col">
                <h3>Description</h3>
                <p>{{tournament.description}}</p>
                <p>{{tournament.dateStart}} - {{tournament.dateEnd}}</p>
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
                        <span class="card__desc">{{referee.desc}}</span>
                    </div>
                </div>
            </div>
            </div>
                <div v-if="tournamentsShow">
                    <div class="row mt-4 mr-4">
                        <div class="col-12 text-right">
                            <button class="btn btn-outline-success" @click="createTournament" type="submit">
                                Create
                            </button>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-9">
                        <div class="row">
                            <div class="col-xs-12 col-sm-4"
                                 v-for='(tournament, key) in $store.state.tournamentsList'>
                                <div class="thumbnail">
                                    <img class="card-img-top"
                                         src="../../assets/github-mark_560x560.png"
                                         alt="Card image cap">
                                    <div class="caption mb-3">
                                        <h4 @click="openTournament(key)" class="text-center">{{
                                            tournament.name }}</h4>
                                        <p class="text-center mb-1">Start date: {{
                                            tournament.dates.dateStart }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Tabs>
                    <Tab name="Brackets">Brackets</Tab>
                    <Tab name="Participants">
                        <div class="row mt-2">
                            <div class="col-9">
                                <nav class="navbar navbar-light">
                                    <form class="form-inline">
                                        <input class="form-control mr-sm-2" type="search"
                                               placeholder="Enter name" aria-label="Search">
                                        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">
                                            Search
                                        </button>
                                    </form>
                                </nav>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-primary">Save Changes</button>
                            </div>
                            <div class="col-1">
                                <button type="button" class="btn btn-outline-primary">Add</button>
                            </div>
                        </div>

                        <div class="row ml-2">
                            <table class="table table-hover table-sm">
                                <tbody :list="$store.state.sportsmanList">
                                <tr class="row" v-for="item in $store.state.sportsmanList" :key="item.id">
                                    <td class="col-2 text-left">{{item.first_name}} {{item.last_name}}</td>
                                    <td class="col-1 text-left">{{item.gender}}</td>
                                    <td class="col-2 text-left">{{item.date_of_birth}}</td>
                                    <td class="col-1 text-left"><input class="form-control form-control-sm"
                                                                       width="50px"></td>
                                    <td class="col-5 text-right">
                                        <button type="button" class="btn btn-outline-primary btn-sm">
                                            Submit
                                        </button>
                                    </td>
                                    <td class="col-1 text-left">
                                        <button type="button" class="btn btn-outline-primary btn-sm">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </Tab>
                </Tabs>
                <tournament-page
                        v-if="tournamentPageShow"
                        v-bind:tournament-key="tournamentKey"
                        @click.prevent="closeTournament">
                </tournament-page>
                <tournament-create
                        v-if="modalShow"
                        @click.prevent="closeModal"
                        @clicked="closeAndUpdate">
                </tournament-create>
            </div>
</template>
<script>
    import axios from "axios";
    import {Tabs, Tab} from "vue-tabs-component";
    import * as firebase from 'firebase';
    import TournamentPage from './tournamentPage';
    import TournamentCreate from './tournamentCreate';

    export default {
        name: "tournaments-cabinet",
        components: {
            TournamentPage,
            TournamentCreate,
            Tab,
            Tabs
        },
        data: function () {
            return {
                tournamentsShow: true,
                tournamentPageShow: false,
                modalShow: false,
                tournamentKey: '',
                federationCollection: `federation${this.$store.state.federationId}`,
            };
        },
        beforeMount() {
            this.$store.state.sportsmanList = {};
        },
        async mounted() {
            //     axios.get("https://champion-api.herokuapp.com/api/sportsman/list")
            //         .then(response => {
            //             this.$store.commit('setSportsmanList', response.data);
            //             window.console.log(response.data)
            //         })
            //         .catch(error => window.console.log(error));
            // },
            try {
                const fbObj = await firebase.database().ref(this.federationCollection).once('value');
                this.$store.commit('setTournamentsList', fbObj.val());
            } catch (error) {
                throw error;
            }
        },
        methods: {
            openTournament(key) {
                this.tournamentKey = key;
                this.tournamentsShow = false;
                this.tournamentPageShow = true;
            },
            closeTournament() {
                this.tournamentPageShow = false;
                this.tournamentsShow = true;
            },
            createTournament() {
                this.modalShow = true;
            },
            closeModal() {
                this.modalShow = false;
            },
            async closeAndUpdate() {
                this.modalShow = false;
                try {
                    const fbObj = await firebase.database().ref(this.federationCollection).once('value');
                    this.$store.commit('setTournamentsList', fbObj.val());
                } catch (error) {
                    throw error;
                }
            },
        }
    }
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

