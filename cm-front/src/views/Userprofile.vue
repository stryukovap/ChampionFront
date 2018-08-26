<template>
  <div class="container cm-co-profile">

    <user-info class="user-info" v-bind:userIsCoach="userIsCoach"></user-info>
    <user-certificates></user-certificates>

    <user-team v-if="userIsCoach"></user-team>
    <user-history></user-history>

  </div>
</template>
<script>
import axios from "axios";
import userInfo from "../components/userProfile/userInfo";
import userCertificates from "../components/userProfile/userCertificates";
import userHistory from "../components/userProfile/userHistory";
import userTeam from "../components/userProfile/userTeam";

export default {
  name: "user-profile",
  components: {
    userInfo,
    userCertificates,
    userHistory,
    userTeam
  },
  data: function() {
    return {
      userIsCoach: false
    };
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
  .user-info{
    margin-top: 40px;
  }
</style>
