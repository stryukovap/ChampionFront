<template>
    <div class="row  cm-sp-info">
      <div class="col-2 cm-sp-info-photo">
          <img v-bind:src="userAvatar" width="150" height="150" alt ="user photo" class = "user__photo">
        <user-contacts v-if="userIsCoach"></user-contacts>
      </div>

      <div class="col-7 cm-sp-info-user user">
        <h2 class="user__full-name">{{ userFullName }}</h2>
        <p class="user__role">{{ userRole }}</p>
        <p class="user__level">
          <img src = "img/belt.png" width="25" height="25" alt = "user belt" class = "user__belt">
          <span class="user__belt-description"> {{ userLevel }}</span>
        </p>
        <p class="user__rank">{{ userRank }}</p>
        <p class="user__weight">{{ userWeight }}</p>
        <p class="user__city">{{ userCity }}</p>
        <p class="user__federation">{{ userFederation }}
        <a v-bind:href="federationLocation">Show on map</a>
        </p>
      </div>

      <user-coaches></user-coaches>
    </div>

</template>

<script>
import axios from "axios";
import UserCoaches from "./userCoaches";
import UserContacts from "./userContacts";
export default {
  name: "user-info",
  components: {
    UserCoaches,
    UserContacts
  },
  props: ["userIsCoach"],
  data: function() {
    return {
      userID: "22",
      userAvatar: "img/user-photo.PNG",
      userFullName: "userFullName",
      userPatronymicName: "userPatronymicName",
      userDOB: "DOB",
      userGender: "userGender",
      userRole: "userRole",
      userLevel: "userLevel",
      userRank: "userRank",
      userWeight: "userWeight",
      userCity: "userCity",
      userFederation: "userFederation",
      federationLocation: "federationLocation"
    };
  },
  mounted() {
    axios
      .get(`https://champion-api.herokuapp.com/api/sportsman/${this.userID}`)
      .then(response => {
        this.userFullName = response.data.first_name + " " + response.data.last_name;
        this.userDOB = response.data.date_of_birth;
        this.userGender = response.data.gender;
        this.userPatronymicName = response.data.patronymic_name;
        this.userRole = response.data.username;
        this.userLevel = response.data.suite;
        this.userRank = response.data.street;
        this.userWeight = response.data.zipcode;
        this.userCity = response.data.city;
        this.userFederation = response.data.company.name;
        this.federationLocation = response.data.geo;
      })
      .catch(error => {
        window.console.log(error);
      });
  }
};
</script>

<style scoped>
</style>
