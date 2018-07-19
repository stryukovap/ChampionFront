<template>
  <div class="row cm-co-team">
      <h2>Teams</h2>
      <div class="col-12 team-list">
        <div class="row justify-content-around">
          <div class="col-3"
            v-for = '(team, index) in userTeams'
            :key = 'team.index'
            v-if = 'index < 8'>
            <a v-bind:href="team.link" class="col-4">
              <img v-bind:src = "team.avatar" width="35" height="35" alt = "coach photo" class = "coach-photo">
              {{ team.name }}
            </a>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "userTeams",
  data: function() {
    return {
      userTeams: []
    };
  },
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.userTeams.push({
            name: response.data[i].name,
            avatar: "img/user-photo.PNG",
            link: "#"
          });
        }
      })
      .catch(error => {
        window.console.log(error);
      });
  }
};
</script>

<style scoped>
</style>
