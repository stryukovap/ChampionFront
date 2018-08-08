<template>
    <div>
        <div class="row mt-4 mr-4">
            <div class="col-12 text-right">
                <button class="btn btn-outline-primary" @click="createTournament" type="submit">Create</button>
            </div>
        </div>
        <div class="col-xs-12 col-md-9">
            <div class="row">
                <div class="col-xs-12 col-sm-4"
                     v-for='tournament in tournamentsList'>
                    <div class="thumbnail">
                        <img class="card-img-top"
                             src="../../assets/github-mark_560x560.png"
                             alt="Card image cap">
                        <div class="caption mb-3">
                            <h4 class="text-center">{{ tournament.name }}</h4>
                            <p class="text-center mb-1">Start date: {{ tournament.dates.dateStart }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                modalShow: false,
                federationId: `federation${this.$store.state.federationId}`,
                tournamentsList: [],
            };
        },
        async mounted() {
            try {
                const fbObj = await firebase.database().ref(this.federationId).once('value');
                this.tournamentsList = fbObj.val();
                console.log(this.tournamentsList);
            } catch (error) {
                throw error;
            }
        },
        methods: {
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
                    this.tournamentsList = fbObj.val();
                    console.log(this.tournamentsList);
                } catch (error) {
                    throw error;
                }
            },
        }
    }
</script>
