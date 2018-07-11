<template>
  <div class="row cm-co-team">
      <h2>Teams</h2>
      <div class="col-12 team-list">
        <div class="row justify-content-around">
          <div class="col-3"
            v-for = '(team, index) in userTeams'
            :key = 'team.index'
            v-if = 'index < 8'>
            <a href="#" class="col-4">
              <img src = "img/user-photo.PNG" width="35" height="35" alt = "coach photo" class = "coach-photo">
              {{ team }}
            </a>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'userTeams',
  data: function () {
    return {
      userTeams: []
    }
  },
  mounted () {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          this.userTeams.push(response.data[i].name);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }
}
</script>

<style scoped>
</style>
