<template>
  <div class="container cm-co-profile">

    <user-info v-bind:userIsCoach="userIsCoach"></user-info>
    <user-certificates></user-certificates>

    <user-teams v-if="userIsCoach"></user-teams>
    <user-history></user-history>

  </div>
</template>
<script>
import axios from "axios";
import userInfo from "../components/userProfile/userInfo";
import userCertificates from "../components/userProfile/userCertificates";
import userHistory from "../components/userProfile/userHistory";
import userTeams from "../components/userProfile/userTeams";

export default {
  name: "user-profile",
  components: {
    userInfo,
    userCertificates,
    userHistory,
    userTeams
  },
  data: function() {
    return {
      userIsCoach: false
    };
  },
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(response => {
        this.userIsCoach = response.data[3].completed;
      })
      .catch(error => {
        window.console.log(error);
      });
  }
};
</script>
<style>
.container {
  text-align: left;
}
</style>
