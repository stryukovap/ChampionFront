<template>
  <div class="col-3 cm-sp-inf-coaches">
        <h2>Coaches</h2>
        <ul
          class="list-unstyled cm-sp-info__coaches-list coaches-list"
          v-for = '(coach, index) in userCoaches'
          :key = 'coach.index'
          v-if = 'index < 4'>
            <li>
              <a v-bind:href="coach.link">
                <img v-bind:src="coach.avatar" width="35" height="35" alt = "coach photo" class = "coach-photo">
                {{ coach.name }}
              </a>
            </li>

        </ul>

      </div>
</template>

<script>
import axios from "axios";
export default {
  name: "userCoaches",
  data: function() {
    return {
      userCoaches: []
    };
  },
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.userCoaches.push({
            name: response.data[i].name,
            avatar: "img/user-photo.PNG",
            link: "#"
          });
        }
      })
      .catch(error => {
        window.console.log(error);
      });
  }
};
</script>

<style scoped>
/* .coaches-list a,
.coaches-list a:hover { */
  /* text-decoration: none;
  color: inherit; */
/* } */
</style>
