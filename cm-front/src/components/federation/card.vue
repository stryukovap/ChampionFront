<template>
    <section>
        <div class="container">
            <h2>Nearest tournaments</h2>
            <div class="row">
                <div class="col-xs-12 col-sm-4"
                    v-for='(tournament, key) in $store.state.tournamentsList'>
                    <div class="thumbnail">
                        <img class="card-img-top"
                             src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16345a6903e%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16345a6903e%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.203125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                             alt="Card image cap">
                        <div class="caption">
                            <h4 class="text-center" >{{ tournament.name }}</h4>
                            <p class="text-center">Start date: {{ tournament.dates.dateStart }}</p>
                            <p class="text-center">Registration starts/finishes : {{tournament.dates.dateStart}}/{{tournament.dates.dateEnd}}</p>
                            <p class="text-center">{{ tournament.maxParticipants }} Members</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import * as firebase from "firebase";
// import TournamentPage from "./tournamentPage";
// import TournamentCreate from "./tournamentCreate";
export default {
    name: "card",

    data: function () {
        // console.log(tournamentKey);
        return {
            tournamentsShow: true,
            tournamentPageShow: false,
            // tournamentKey: "",
            federationId: this.$route.params.id,
        };
    },

    // beforeMount: function () {
    //     this.federationId = this.$store.state.authUser.federation_users[0].federation_id;
    // },

    async mounted() {
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
  // {
 //       openTournament(key) {
  //          this.tournamentKey = key;
  //          this.tournamentsShow = false;
  //          this.tournamentPageShow = true;
  //      },
  //      closeTournament() {
  //          this.tournamentPageShow = false;
  //          this.tournamentsShow = true;
  //      },
  //      createTournament() {
   //         this.modalShow = true;
   //     },
   //     closeModal() {
   //         this.modalShow = false;
   //     },
   //     async closeAndUpdate() {
         //   this.modalShow = false;
   //         try {
   //             const fbObj = await firebase
   //                .database()
   //                 .ref(this.federationId)
   //                  .once("value");
   //              this.$store.commit("setTournamentsList", fbObj.val());
   //          } catch (error) {
   //              throw error;
   //         }
   //      }
   //  };
   //  .then(response => {
   //      for (let i = 0; i < response.data.data.length; i++) {
   //          window.console.log(response.data.data[i]);
   //          if(page !== "") this.sportsmenList.shift();
   //          this.sportsmenList.push({
   //              name: response.tournament.name,
   //              dateStart: "tournament.dates.dateStart",
   //              dateEnd: "tournament.dates.dateEnd",
   //              Members: tournament.maxParticipants,
   //          });
   //      }
   //  })


</script>

<style scoped>
</style>
