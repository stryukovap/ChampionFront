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
                <button
                        @click.prevent="editTournament"
                        v-if="editButtonShow"
                        class="btn btn-outline-success">Edit</button>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p>{{tournament.description}}</p>
                <p>{{tournament.dates.dateStart}} - {{tournament.dates.dateEnd}}</p>
                <p>Max amount of Participants: {{tournament.maxParticipants}}</p>
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
                <brackets v-bind:tournament-key="tournamentKey"
                          v-bind:federation-id="federationId"></brackets>

            </Tab>
            <Tab name="Participants">
                <participants v-bind:tournament-key="tournamentKey"
                              v-bind:federation-id="federationId"></participants>
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

    export default {
        name: 'tournament-page',
        components: {
            Tab,
            Tabs,
            Brackets,
            Participants,
            TournamentCreate,
        },
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
</style>
