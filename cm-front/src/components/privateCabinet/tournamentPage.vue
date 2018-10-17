<template>
    <div class="tournaments-cabinet container mt-3">
        <div class="row text-left mt-3">
            <div class="col-10">
                <button v-on="$listeners" class="btn btn-sm btn-outline-success">⇐ Back to tournament list</button>
            </div>
            <div class="col-2">
                <h4> <span v-if="isTournamentDeleted" class="badge badge-danger ml-3">Deleted!</span></h4>
            </div>
        </div>
        <div class="row text-left mt-3 mb-3">
            <div class="col-6">
                <h2 class="title">{{tournament.name}}
                    <span v-if="tournament.isStarted && !tournament.isFinished" class="badge badge-success">Started</span>
                    <span v-if="tournament.isFinished" class="badge badge-danger">Finished</span>
                </h2>
            </div>
            <div class="col-2">
                <button @click="startTournament"
                        :disabled="tournament.isStarted == 1"
                        class="col btn btn-success pl-4 pr-4"
                        v-if="editButtonShow">Start</button>
            </div>
            <div class="col-2">
                <button @click="finishTournament"
                        :disabled="tournament.isStarted == 0 || tournament.isFinished == 1"
                        class="col btn btn-success pl-4 pr-4"
                        v-if="editButtonShow">Finish</button>
            </div>
            <div class="col-2 text-right">
                <button
                        @click.prevent="editTournament"
                        :disabled="tournament.isStarted == 1"
                        v-if="editButtonShow"
                        class="btn btn-outline-success mr-2">Edit</button>
                <button
                        @click.prevent="deleteTournament"
                        :disabled="tournament.isStarted == 1"
                        v-if="editButtonShow"
                        class="btn btn-outline-success">Delete</button>
            </div>
        </div>
        <div class="row">
            <div class="col-2">
                <img :src="tournament.imageUrl"
                     width="150px"
                     alt="tournament photo">
            </div>
            <div class="col-4">
                <p class='tour__description'>{{tournament.description}}</p>
                <p>{{tournament.dates.dateStart}} - {{tournament.dates.dateEnd}}</p>
                <p>Amount of Participants: {{tournament.amountOfParticipants}}/{{tournament.maxParticipants}}</p>
            </div>
            <div class="col-6">
                <h3>Referees</h3>
                <div class="col" style="display: flex; flex-wrap: wrap; justify-content: flex-start">
                    <div class="card__referee"
                         v-for="referee in tournament.referees"
                         style=" margin-right: 15px;display: flex; flex-direction: column;align-items: center;">
                        <img v-bind:src="referee.photo ? referee.photo.url : '/img/345x345_26.acd2e707.jpg'" width="100px" height="100px"
                             alt="foto referee"
                             class="card__img">
                        <span class="card__desc">{{referee.first_name}} {{referee.last_name}}</span>
                    </div>
                </div>
            </div>
        </div>

        <Tabs>
            <Tab name="Brackets">
                <brackets 
                          v-bind:tournament-key="tournamentKey"
                          v-bind:federation-id="federationId"
                          v-bind:tournament-is-finished="tournament.isFinished"
                          v-bind:tournament="tournament"
                          ref="tournamentBrakets">
                </brackets>

            </Tab>
            <Tab name="Participants">
                <participants v-bind:tournament-key="tournamentKey"
                              v-bind:federation-id="federationId"
                              v-bind:tournament="tournament"
                              @clicked="closeAndUpdate"
                ></participants>
            </Tab>
        </Tabs>
        <tournament-create
                v-if="tournamentEditShow"
                v-bind:tournament-key="tournamentKey"
                @click.prevent="tournamentEditShow = false"
                @clicked="closeAndUpdate"
        ></tournament-create>
    </div>
</template>
<script>
    import axios from 'axios';
    import * as firebase from 'firebase';
    import {Tabs, Tab} from 'vue-tabs-component';

    import Brackets from './tournamentBrackets';
    import Participants from './tournamentParticipants';
    import TournamentCreate from './tournamentCreate';
    import bracketModule from './bracketModule'

    export default {
        name: 'tournament-page',
        components: {
            Tab,
            Tabs,
            Brackets,
            Participants,
            TournamentCreate
        },
        mixins: [bracketModule],
        props: ['tournamentKey'],
        data: function () {
            return {
                tournament: {},
                tournamentEditShow: false,
                editButtonShow: true,
                isTournamentDeleted: false,
                federationId: '',
                http: axios.create({
                    headers: { Authorization: "Bearer " + this.$store.state.authUser.auth_token}
                })
            }
        },
        beforeMount() {
            this.tournament = this.$store.state.tournamentsList[this.tournamentKey];
        },
        mounted() {
            if (this.$store.state.authUser.federation_users.length !== 0) {
                this.federationId = this.$store.state.authUser.federation_users[0].federation_id;
            } else {
                this.federationId = this.$store.state.authUser.my_sportsmen_profile.federation_sportsmen[0].federation_id;
                this.editButtonShow = false;
            }
        },
        methods: {
            editTournament() {
                this.tournamentEditShow = true;
            },
            async closeAndUpdate() {
                this.tournamentEditShow = false;
                try {
                    const fbObj = await firebase.database().ref(this.federationId).once('value');
                    this.$store.commit('setTournamentsList', fbObj.val());
                } catch (error) {
                    throw error;
                }
                this.tournament = this.$store.state.tournamentsList[this.tournamentKey];
            },
            async startTournament() {
                this.tournament.referees.map(referee => {
                    referee.federation_sportsmen[0].is_referee = 1;
                    return this.http
                        .post(`http://champion-api.herokuapp.com/api/federation-sportsman/${referee.federation_sportsmen[0].id}`, {
                        _method: "put",
                        sportsman_id: referee.id,
                        federation_id: this.federationId,
                        is_active: referee.federation_sportsmen[0].is_active,
                        is_coach: referee.federation_sportsmen[0].is_coach,
                        is_referee: referee.federation_sportsmen[0].is_referee
                    })
                        .then(response => console.log(response.data))
                        .catch(error => console.log(error));
                });
                this.tournament.isStarted = true;
                try {
                    await firebase
                        .database()
                        .ref(this.federationId)
                        .child(this.tournamentKey)
                        .update({'isStarted': this.tournament.isStarted});
                } catch (error) {
                    throw error;
                }
                this.createBrackets();
            },
            createBrackets() {
                this.tournament.categories.forEach((category, categoryKey) => {
                    if ("male" in category) {
                        category.male.forEach((weightCategory, key) => {
                            if ("sportsmen" in weightCategory) {
                                weightCategory.bracket = this.createBracket(weightCategory.sportsmen);
                                // console.log(weightCategory.bracket);
                                firebase
                                    .database()
                                    .ref(this.federationId)
                                    .child(this.tournamentKey)
                                    .child("categories")
                                    .child(categoryKey)
                                    .child('male')
                                    .child(key)
                                    .update({ bracket: weightCategory.bracket});
                                // console.log(this.tournament);
                            }
                        });
                    }
                    if ("female" in category) {
                        category.female.forEach((weightCategory, key) => {
                            if ("sportsmen" in weightCategory) {
                                weightCategory.bracket = this.createBracket(weightCategory.sportsmen);
                                // console.log(weightCategory.bracket);
                                firebase
                                    .database()
                                    .ref(this.federationId)
                                    .child(this.tournamentKey)
                                    .child("categories")
                                    .child(categoryKey)
                                    .child('female')
                                    .child(key)
                                    .update({ bracket: weightCategory.bracket});
                                console.log(this.tournament);
                            }
                        });
                    }
                });
                this.refreshTournaments();
            },
            async refreshTournaments() {
                try {
                    const fbObj = await firebase
                        .database()
                        .ref(this.federationId)
                        .once('value');
                    this.$store.commit('setTournamentsList', fbObj.val());
                    this.tournament = this.$store.state.tournamentsList[this.tournamentKey];
                } catch (error) {
                    throw error;
                }
            },
            async finishTournament() {
                this.tournament.referees.map(referee => {
                    referee.federation_sportsmen[0].is_referee = 0;
                    return this.http
                        .post(`http://champion-api.herokuapp.com/api/federation-sportsman/${referee.federation_sportsmen[0].id}`, {
                            _method: "put",
                            sportsman_id: referee.id,
                            federation_id: this.federationId,
                            is_active: referee.federation_sportsmen[0].is_active,
                            is_coach: referee.federation_sportsmen[0].is_coach,
                            is_referee: referee.federation_sportsmen[0].is_referee
                        })
                        .then(response => console.log(response.data))
                        .catch(error => console.log(error));
                });
               this.tournament.isFinished = true;
                try {
                    await firebase
                        .database()
                        .ref(this.federationId)
                        .child(this.tournamentKey)
                        .update({'isFinished': this.tournament.isFinished});
                } catch (error) {
                    throw error;
                }
                this.$refs.tournamentBrakets.updateWinners();
            },
            async deleteTournament() {
                try {
                    await firebase
                        .database()
                        .ref(this.federationId)
                        .child(this.tournamentKey)
                        .remove();
                    this.refreshTournaments();
                    this.$router.push('federationcabinet');
                    this.isTournamentDeleted = true;
                } catch (error) {
                    throw error;
                }
            }
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

    .winners {
        display : flex;
        width : 1110px;
        justify-content: space-around;
        }

    .awardee-fullname {
        padding : 10px;
        }

    .user-avatar {
        width: 185px;
        height: 185px;
        border-radius: 50%;
        }
    .tour__description {
        word-break: break-all;
    }
</style>
