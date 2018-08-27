<template>
    <div class="tournaments-cabinet container mt-3">
        <div class="row text-left mt-3">
            <div class="col-12">
                <button v-on="$listeners" class="btn btn-sm btn-outline-success">⇐ Back to tournament list</button>
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
                        class="col btn btn-success pl-4 pr-4">Start</button>
            </div>
            <div class="col-2">
                <button @click="finishTournament"
                        :disabled="tournament.isStarted == 0 || tournament.isFinished == 1"
                        class="col btn btn-success pl-4 pr-4">Finish</button>
            </div>
            <div class="col-2 text-right">
                <button
                        @click.prevent="editTournament"
                        :disabled="tournament.isStarted == 1"
                        v-if="editButtonShow"
                        class="btn btn-outline-success">Edit</button>
            </div>
        </div>
        <div class="row">
            <div class="col-2">
                <img :src="tournament.imageUrl"
                     width="150px"
                     alt="tournament photo">
            </div>
            <div class="col-4">
                <p>{{tournament.description}}</p>
                <p>{{tournament.dates.dateStart}} - {{tournament.dates.dateEnd}}</p>
                <p>Max amount of Participants: {{tournament.maxParticipants}}</p>
            </div>
            <div class="col-6">
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
                <brackets v-bind:tournament-key="tournamentKey"
                          v-bind:federation-id="federationId"></brackets>

            </Tab>
            <Tab name="Participants">
                <participants v-bind:tournament-key="tournamentKey"
                              v-bind:federation-id="federationId"
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
            TournamentCreate,
        },
        mixins: [bracketModule],
        props: ['tournamentKey'],
        data: function () {
            return {
                tournament: {},
                tournamentEditShow: false,
                editButtonShow: true,
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
                console.log(this.tournament);
                this.createBrackets()
            },
            async sendBracket() {

            },
            createBrackets() {
                this.tournament.categories.forEach((category, key) => {
                    if ("male" in category) {

                        category.male.forEach((weightCategory, key) => {
                            if ("sportsmen" in weightCategory) {
                                // firebase
                                //     .database()
                                //     .ref(this.federationId)
                                //     .child(this.tournamentKey)
                                //     .child("categories")
                                //     .child(category)
                                //     .child('male')
                                //     .child(weightCategory[key])
                                //     .update({ bracket: this.$store.state.bracket });
                                // this.$set(weightCategory, "bracket", []);

                                // this.$store.commit('createBracket', weightCategory.sportsmen);
                                createBracket(weightCategory.sportsmen);
                                console.log(this.$store.state.bracket)

                                // this.sendBracket()
                            }
                        });
                    }
                    if ("female" in category) {
                        category.female.forEach(weightCategory => {
                            if ("sportsmen" in weightCategory) {
                                // this.amountOfParticipants += weightCategory.sportsmen.length;
                            }
                        });
                    }
                });
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
            },
            // createBracket(listOfPlayers) {
            //     listOfPlayers = this.processListOfPlayer(listOfPlayers);
            //     // var bracket = [];
            //
            //     var numberOfRounds = Math.log2(listOfPlayers.length) + (
            //         ( listOfPlayers.length === 2 )
            //             ? 0
            //             : 1
            //     );
            //     for ( var i = 0; i < numberOfRounds; i++ ) {
            //         var round = [];
            //         var numberOfFightsInRound = Math.ceil(listOfPlayers.length / Math.pow(2, i + 1));
            //         for ( var j = 0; j < numberOfFightsInRound; j++ ) {
            //             if ( i === 0 ) {
            //                 var f1 = listOfPlayers[ j * 2 ];
            //                 var f2 = listOfPlayers[ j * 2 + 1 ];
            //             }
            //             else {
            //                 var f1 = null;
            //                 var f2 = null;
            //             }
            //             var fight = {
            //                 fighter1 : f1,
            //                 fighter2 : f2,
            //                 winner : null
            //             };
            //             round.push(fight);
            //         }
            //         this.$store.state.bracket.push(round);
            //     }
            //     // return bracket;
            // },
            // processListOfPlayer(listOfPlayers) {
            //     // listOfPlayers = _.shuffle(listOfPlayers);   // uncomment to shuffle
            //     var neededLength = Math.pow(2, Math.ceil(Math.log2(listOfPlayers.length)));
            //     var numberOfDummies = neededLength - listOfPlayers.length;
            //     for ( var i = 0; i < numberOfDummies; i++ ) {
            //         if ( i % 2 === 0 ) {
            //             listOfPlayers.splice(i, 0, null);
            //         }
            //         else {
            //             listOfPlayers.splice(listOfPlayers.length - i, 0, null);
            //         }
            //     }
            //     return listOfPlayers;
            // },
            // isWinner(roundNumber, fightNumber, winner) {
            //     var curFight = ourBracket[ roundNumber ][ fightNumber ];
            //     curFight.winner = winner;
            //     if ( roundNumber >= ourBracket.length - 2 )
            //         return;
            //     var nextRound = this.getNextFight(roundNumber, fightNumber, 1);
            //     if ( roundNumber !== ourBracket.length - 3 ) {
            //         this.forwardFighterToNextRound(nextRound, winner, curFight);
            //     }
            //     else {
            //         var presentFight = ourBracket[ roundNumber ][ fightNumber ];
            //         var looser = this.getLooser(presentFight);
            //         var afterNextRound = this.getNextFight(roundNumber, fightNumber, 2);
            //         this.forwardFighterToNextRound(nextRound, looser, curFight);
            //         this.forwardFighterToNextRound(afterNextRound, winner, curFight);
            //     }
            // },

            // forwardFighterToNextRound(nextFight, fighter, curFight) {
            //     if ( !nextFight.fighter1 ) {
            //         nextFight.fighter1 = fighter;
            //         nextFight.prevFight1 = curFight;
            //     }
            //     else {
            //         nextFight.fighter2 = fighter;
            //         nextFight.prevFight2 = curFight;
            //     }
            //     curFight.nextFight = nextFight;
            // },

            // getNextFight(roundNumber, fightNumber, step) {
            //     var nextFightNumber = Math.ceil(( fightNumber + 1 ) / 2) - 1;
            //     return ourBracket[ roundNumber + step ][ nextFightNumber ];
            // },

            // getLooser(figth) {
            //     return ( figth.fighter1 === figth.winner ) ? figth.fighter2 : figth.fighter1;
            // }

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
