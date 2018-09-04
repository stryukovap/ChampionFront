<template>
  <div class="container cm-co-profile">

    <user-info class="user-info"></user-info>
    <user-certificates></user-certificates>

    <user-team v-if="userIsCoach"></user-team>
    <user-history></user-history>

  </div>
</template>
<script>
import axios from "axios";
import userInfo from "../components/userProfile/userInfo";
<<<<<<< HEAD
// import userCertificates from "../components/userProfile/userCertificates";
import userHistory from "../components/userProfile/userHistory";
import userTeam from "../components/userProfile/userTeam";
=======
import userCertificates from "../components/userProfile/userCertificates";
// import userHistory from "../components/userProfile/userHistory";
// import userTeam from "../components/userProfile/userTeam";
>>>>>>> 06de6c0eef41bf94d5133ce1a453b27a36c3a1c9

export default {
  name: "user-profile",
  components: {
    userInfo,
<<<<<<< HEAD
    // userCertificates,
    userHistory,
    userTeam
=======
    userCertificates,
    // userHistory,
    // userTeam
>>>>>>> 06de6c0eef41bf94d5133ce1a453b27a36c3a1c9
  },
  data: function() {
    return {
      userIsCoach: false
    };
  },
  mounted() {
    axios.get('https://champion-api.herokuapp.com/api/sportsman/' + this.$route.params.sportsman_id)
    .then(response => {
        if ( response.status === 200 ) {
            // this.options = response.data.data;
            // window.console.log("response:", response.data.federation_sportsmen[0].is_coach);
            this.userIsCoach = Boolean(response.data.federation_sportsmen[0].is_coach);
            // window.console.log("useriscoach:", this.userIsCoach);
        }
    })
    .catch(error => window.console.log(error));
  }
};
</script>
<style scoped lang="scss">
  .user-info{
    margin-top: 40px;
  }
</style>
