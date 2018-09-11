<template>
  <div class="row cm-user-history history-content">
      <h2 class="tournament-title">Tournaments history</h2>
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
        userTournaments: [{website: "", name: "", phone: "", username: ""}]
    };
  },
  mounted() {
      // axios
      //   .get("https://jsonplaceholder.typicode.com/users")
      //   .then(response => {
      //     for (let i = 0; i < response.data.length; i++) {
      //       this.userTournaments.push(response.data[i]);
      //     }
      //   })
      //   .catch(error => {
      //     window.console.log(error);
      //   });
  }
};
</script>

<style scoped lang="scss">
.history-content {
  border-radius: 5px;
  background-color: #ffffff;
  border: solid 1px #e9e9e9;
  width: 100%;
  height: 100%;
  -webkit-box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.7);
  box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.7);
  margin: auto;
  margin-bottom: 40px;
}

.tournament-title {
  font-family: "Nova Square", cursive;
  margin-left: 47px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 24px;
}
</style>
