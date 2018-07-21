<template>
  <div class="row cm-user-history">
      <h2>Tournaments history</h2>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Tournament name</th>
            <th scope="col">Dates</th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for='(tournament, index) in userTournaments'
            :key='index'>
              <td><a v-bind:href="tournament.website">{{ tournament.name }}</a></td>
              <td>{{ tournament.phone }}</td>
              <td>{{ tournament.username }}</td>
            
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "userHistory",
  data: function() {
    return {
      userTournaments: []
    };
  },
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.userTournaments.push(response.data[i]);
        }
      })
      .catch(error => {
        window.console.log(error);
      });
  }
};
</script>

<style scoped lang="scss">
</style>
