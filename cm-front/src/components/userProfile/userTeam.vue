<template>
  <div class="row cm-co-team team-content" v-if="userTeam.length > 0">
      <h2 class="team-title">Team</h2>
      <div class="col-12 team-list">
        <div class="row justify-content">
          <div class="col-3 sportsman-item"
            v-for = '(sportsman, index) in userTeamShow'
            :key = 'sportsman.index'>
              <a v-bind:href="sportsman.sportsman_id">
                <div class="flex-wrap">
                  <img v-if="sportsman.photo" v-bind:src="sportsman.photo.url" width="50" height="50" alt="photo" class="coach-photo">
                  <img v-else src="../../assets/345x345_26.jpg" width="50" height="50" alt="photo" class="coach-photo">
                  <div class="sportsman-name">{{ sportsman.sportsmen.first_name }} {{ sportsman.sportsmen.last_name }}</div>
                </div>
              </a>

          </div>
        </div>
        <div class="show-more" v-if="!isAllSportsmenShown">
            <!-- <a v-on:click.prevent="togleTeamState" href="#">{{ linkText }}</a> -->
            <a v-on:click.prevent="showMore" href="#">Show more</a>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "userTeam",
  data: function() {
    return {
      userTeam: [],
      userTeamShow: [],
      isAllSportsmenShown: true
    };
  },
  mounted() {
      axios
        .get(
              `https://champion-api.herokuapp.com/api/sportsman/${
                  this.$route.params.sportsman_id
                  }`)
        .then(response => {
            this.userTeam = response.data.my_sportsmen;
            this.userTeamShow = this.userTeam.slice(0, 4);

            this.isAllSportsmenShown = (this.userTeam.length <= 4);
            // console.log(this.userTeam.length);
            // console.log("response", this.userTeam);
        })
        .catch(error => console.log(error.message));
      // axios
      //   .get("https://jsonplaceholder.typicode.com/users")
      //   .then(response => {
      //     for (let i = 0; i < response.data.length; i++) {
      //       this.userTeam.push({
      //         name: response.data[i].name,
      //         avatar: "img/user-photo.PNG",
      //         link: "#"
      //       });
      //     }
      //   })
      //   .catch(error => {
      //     window.console.log(error);
      //   });
      
  },
  methods: {
    showMore() {
      // this.isAllSportsmenShown = !this.isAllSportsmenShown;
      this.userTeamShow = this.userTeam.slice(0, this.userTeamShow.length + 4);
      if (this.userTeamShow.length === this.userTeam.length) this.isAllSportsmenShown = true;
    }
  },
  // computed: {
  //   linkText: function() {
  //     return this.isAllSportsmenShown ? "Less..." : "More...";
  //   }
  // }
};
</script>

<style scoped>
.coach-photo {
  border-radius: 50%;
  display: block;
}

.team-content {
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

.team-title {
  margin-left: 47px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: "Nova Square", cursive;
  font-size: 24px;
}

.team-list {
  margin-left: 32px;
}

.sportsman-item {
  margin-bottom: 33px;
}

.show-more {
  margin-bottom: 20px;
  font-size: 14px;
}

.sportsman-name {
  font-size: 14px;
  margin-left: 13px;
  color: #000000;
  max-width: 170px;
  text-align: left;
}

.flex-wrap {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
}

</style>
