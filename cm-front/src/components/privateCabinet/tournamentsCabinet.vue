<template>
    <div>
        <div v-if="tournamentsShow">
            <div class="row mt-4 mr-4">
                <div class="col-12 text-right">
                    <button class="btn btn-outline-success"
                            @click="createTournament"
                            v-if="createButtonShow"
                            type="submit">Create</button>
                </div>
            </div>
            <div class="col-xs-12 col-md-9">
                <div class="row">
                    <div class="col-xs-12 col-sm-4"
                         v-for='(tournament, key) in $store.state.tournamentsList'>
                        <div class="thumbnail">
                            <img :src="tournament.imageUrl"
                                 class="mb-2"
                                 width="200px"
                                 alt="Card image cap">
                            <div class="caption mb-3">
                                <h4 @click="openTournament(key)" class="text-center">{{ tournament.name }}</h4>
                                <p class="text-center mb-1">Start date: {{ tournament.dates.dateStart }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
    import * as firebase from 'firebase';
    import TournamentPage from './tournamentPage';
    import TournamentCreate from './tournamentCreate';
    export default {
        name: "tournaments-cabinet",
        components: {
            TournamentPage,
            TournamentCreate
        },
        data: function () {
            return {
                tournamentsShow: true,
                tournamentPageShow: false,
                createButtonShow: true,
                modalShow: false,
                tournamentKey: '',
                federationId: ''
            };
        },
        beforeMount() {
            if (this.$store.state.authUser.federation_users.length !== 0) {
                this.federationId = this.$store.state.authUser.federation_users[0].federation_id;
            } else {
                this.federationId = this.$store.state.authUser.my_sportsmen_profile.federation_sportsmen[0].federation_id;
                this.createButtonShow = false;
            }
        },
        async mounted() {
            try {
                const fbObj = await firebase
                    .database()
                    .ref(this.federationId)
                    .once('value');
                this.$store.commit('setTournamentsList', fbObj.val());
            } catch (error) {
                throw error;
            }
        },
        methods: {
            openTournament(key){
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
                    const fbObj = await firebase.database().ref(this.federationId).once('value');
                    this.$store.commit('setTournamentsList', fbObj.val());
                } catch (error) {
                    throw error;
                }
            },
        }
    }
</script>
