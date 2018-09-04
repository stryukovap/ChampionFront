<template>
    <div class="tournaments-cabinet container mt-3">
        <div class="row text-left mt-3 mb-3">
            <div class="col-6">
                <h2 class="title">{{tournament.name}}
                    <span v-if="tournament.isStarted && !tournament.isFinished"
                          class="badge badge-success">Started</span>
                    <span v-if="tournament.isFinished" class="badge badge-danger">Finished</span>
                </h2>
            </div>
            <div class="col-6"></div>
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
                <p>Amount of Participants: {{tournament.amountOfParticipants}}/{{tournament.maxParticipants}}</p>
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
                          v-bind:federation-id="federationId"
                          v-bind:tournament="tournament"></brackets>

            </Tab>
            <Tab name="Participants">
                <participants v-bind:tournament-key="tournamentKey"
                              v-bind:federation-id="federationId"
                              v-bind:tournament="tournament"
                ></participants>
            </Tab>
        </Tabs>
    </div>
</template>
<script>
    import {Tabs, Tab} from 'vue-tabs-component';

    import Brackets from '../privateCabinet/tournamentBrackets';
    import Participants from '../privateCabinet/tournamentParticipants';

    export default {
        name: 'tournament-page',
        components: {
            Tab,
            Tabs,
            Brackets,
            Participants
        },
        data: function () {
            return {
                tournament: {},
                tournamentKey: '',
                federationId: '',
            }
        },
        beforeMount() {
            this.tournamentKey = this.$route.params.id;
            this.tournament = this.$store.state.tournamentsList[this.tournamentKey];
        },
        mounted() {
            if (this.$store.state.authUser.federation_users.length !== 0) {
                this.federationId = this.$store.state.authUser.federation_users[0].federation_id;
            } else {
                this.federationId = this.$store.state.authUser.my_sportsmen_profile.federation_sportsmen[0].federation_id;
            }
        },
        methods: {
        }
    }
</script>

