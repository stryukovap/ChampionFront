<template>
  <div class="row cm-co-team">
      <h2>Team</h2>
      <div class="col-12 team-list">
        <div class="row justify-content">
          <div class="col-3"
            v-for = '(sportsman, index) in userTeam'
            :key = 'sportsman.index'
            v-if = 'index < 8 || isAllSportsmenShown'>
            <a v-bind:href="sportsman.sportsman_id" class="col-4">
              <img src="../../assets/345x345_26.jpg" width="35" height="35" alt = "photo" class = "coach-photo">
              {{ sportsman.sportsmen.first_name }} {{ sportsman.sportsmen.last_name }}
            </a>
          </div>
        </div>
        <div class="text-right">
            <a v-on:click.prevent="togleTeamState" href="#">{{ linkText }}</a>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "userTeam",
  data: function() {
    return {
      userTeam: [],
      isAllSportsmenShown: false
    };
  },
  mounted() {
        axios
      .get(
        `https://champion-api.herokuapp.com/api/sportsman/${
          this.$route.params.sportsman_id
        }`
      )
      .then(response => {
          this.userTeam = response.data.my_sportsmen;
          console.log("response", this.userTeam);
      })
      .catch(error => console.log(error.message));

    // axios
    //   .get("https://jsonplaceholder.typicode.com/users")
    //   .then(response => {
    //     for (let i = 0; i < response.data.length; i++) {
    //       this.userTeam.push({
    //         name: response.data[i].name,
    //         avatar: "img/user-photo.PNG",
    //         link: "#"
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     window.console.log(error);
    //   });


  },
  methods: {
    togleTeamState() {
      this.isAllSportsmenShown = !this.isAllSportsmenShown;
    }
  },
  computed: {
    linkText: function() {
      return this.isAllSportsmenShown ? "Less..." : "More...";
    }
  }
};
</script>

<style scoped>
</style>
