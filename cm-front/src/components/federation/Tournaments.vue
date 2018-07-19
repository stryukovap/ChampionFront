<template>
<section>
    <div class="container mb-5 mt-3">
        <div class="row">
            <div class="col-xs-12 col-md-9 main-content">
              <h2 class="h2">Nearest tournaments</h2>
                <div class="row">
                    <div class="col-xs-12 col-sm-4"
                        v-for='(tournament, index) in tournaments'
                        v-if='index < 6 || isAllTournamentsShown'
                        :key='tournament.index'>
                        <a v-bind:href="tournament.link" class="text-secondary">
                        <div class="thumbnail">
                            <img class="card-img-top"
                                 v-bind:src="tournament.avatar"
                                 alt="Card image cap">
                            <div class="caption mb-3">
                                <h4 class="text-center">{{ tournament.name }}</h4>
                                <p class="text-center mb-1">Start date: {{ tournament.date }}</p>
                                <p class="text-center mb-1">Registration starts/finishes {{ tournament.registration }}</p>
                                <p class="text-center mb-1">{{ tournament.numberOfMembers }} Members</p>
                            </div>
                        </div>
                        </a>
                    </div>
                </div>
                <div class="text-right">
                  <a v-on:click.prevent="togleTournamentsState" href="#">{{ linkText }}</a>
                </div>
            </div>
            <news></news>
        </div>
    </div>
</section>
</template>

<script>
import axios from "axios";
import news from "./News";
export default {
  name: "tournaments",
  components: {
    news
  },
  data: function() {
    return {
      tournaments: [],
      isAllTournamentsShown: false
    };
  },
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.tournaments.push({
            avatar:
              "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16345a6903e%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16345a6903e%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.203125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
            name: response.data[i].name,
            date: "04.04.04",
            registration: "02.02.02 - 03.03.03",
            numberOfMembers: "5/100",
            link: "#"
          });
        }
      })
      .catch(error => {
        window.console.log(error);
      });
  },
  methods: {
    togleTournamentsState() {
      this.isAllTournamentsShown = !this.isAllTournamentsShown;
    }
  },
  computed: {
    linkText: function() {
      return this.isAllTournamentsShown ? "Less..." : "More...";
    }
  }
};
</script>

<style>
</style>
