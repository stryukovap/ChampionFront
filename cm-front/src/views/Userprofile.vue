<template>
  <div class="wrapper cm-co-profile">

    <user-info class="user-info"></user-info>
    <user-certificates class="user-certificates"></user-certificates>

      <user-team v-if="userIsCoach"></user-team>
      <user-history></user-history>

  </div>
</template>
<script>
import axios from "axios";
import userInfo from "../components/userProfile/userInfo";
import userHistory from "../components/userProfile/userHistory";
import userTeam from "../components/userProfile/userTeam";
import userCertificates from "../components/userProfile/userCertificates";

export default {
  name: "user-profile",
  components: {
    userInfo,
      userHistory,
      userTeam,
    userCertificates,
  },
  data: function() {
    return {
        userIsCoach: false
    };
  },
    mounted() {
        axios.get('https://champion-api.herokuapp.com/api/sportsman/' + this.$route.params.sportsman_id)
            .then(response => {
                if (response.status === 200) {
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
  .wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }
  .user-info {
    margin-top: 40px;
    margin-bottom: 40px;    
  }
  .user-certificates {
    margin-bottom: 40px;
  }

  @media (max-width: 1220px) {
    .wrapper {
      margin: 0 10px;
    }
  }

  @media (max-width: 576px) {
    .wrapper {
      margin: 0;
    }
  }
</style>
