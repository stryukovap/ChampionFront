<template>
  <div class="col-xs-12 col-md-9 main-content">
    <h2 class="h2">Nearest tournaments</h2>
      <div class="row">
          <div class="col-xs-12 col-sm-4"
              v-for='(tournament, index) in tournamentsList'
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
</template>

<script>
import axios from "axios";

export default {
  name: "tournaments",
  props: ['tournamentsList'],
  data: function() {
    return {
      isAllTournamentsShown: false
    };
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
