<template>
<div class="cm-co-info-contacts">
    <h2>Contacts</h2>
    <p class="user-phone">{{ userPhone }}</p>
    <div class="user-socials">
    <a v-bind:href="userFacebook">
        <img src = "img/facebook-icon.PNG" alt = "facebook">
    </a>
    <a v-bind:href="userInstagram">
        <img src = "img/instagram-icon.PNG" alt = "instagram">
    </a>

    </div>
</div>
</template>
<script>
import axios from "axios";
export default {
  name: "userContacts",
  data: function() {
    return {
      userPhone: "",
      userFacebook: "#",
      userInstagram: "#"
    };
  },
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        this.userPhone = response.data[3].phone;
        //   this.userFacebook = response.data[0].name,
        //   this.userInstagram = response.data[0].name
      })
      .catch(error => {
        window.console.log(error);
      });
  }
};
</script>
<style scoped>
</style>
