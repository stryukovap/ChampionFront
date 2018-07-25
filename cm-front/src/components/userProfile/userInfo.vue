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
      userFullName: "User Name",
      userRole: "Coach",
      userLevel: "2 Dan",
      userRank: "International Master of Sports",
      userWeight: "68 kg",
      userCity: "Odessa",
      userFederation: "Federation Name",
      federationLocation: "#"
    };
  },
  mounted() {
    axios
      .get("https://champion-api.herokuapp.com/api/sportsman/" + this.userID)
      .then(response => {
        this.userFullName =
          response.data.first_name + " " + response.data.last_name;
        // this.userRole = response.data[0].username
        // this.userLevel = response.data[0].suite
        // this.userRank = response.data[0].street
        // this.userWeight = response.data[0].zipcode
        // this.userCity = response.data[0].city
        // this.userFederation = response.data[0].company.name
        // this.federationLocation = response.data[0].geo
      })
      .catch(error => {
        window.console.log(error);
      });
  }
};
</script>

<style scoped>
</style>
