<template>
<div>
    <section>
        <div class="container">
            <div class="row">
                <h2 class="h2">Our Sportsmen</h2>
            </div>
        </div>
    </section>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-2"
                    v-for='(sportsman, index) in sportsmen'
                    v-if='index < 6 || isAllSportsmenShown'
                    :key='sportsman.index'>
                    <a v-bind:href="sportsman.link" class="text-secondary">
                      <div class="thumbnail">
                        <img src="img/user-photo.PNG" class="mx-auto d-block">
                        <h4 class="text-center">{{ sportsman.name }}</h4>
                        <p class="text-center">{{ sportsman.role }}<img v-bind:src="sportsman.avatar">{{ sportsman.dan }}</p>
                      </div>
                    </a>
                </div>
            </div>
            <div class="text-right">
              <a v-on:click.prevent="togleSportsmenState" href="#">{{ linkText }}</a>
            </div>
        </div>
    </section>
</div>
</template>
<script>
import axios from "axios";
export default {
  name: "sportsmen",
  data: function() {
    return {
      sportsmen: [],
      isAllSportsmenShown: false
    };
  },
  mounted() {
    axios
      .get("http://champion-api.herokuapp.com/api/sportsman/list")
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.sportsmen.push({
            name: response.data[i].first_name + " " + response.data[i].last_name,
            role: "coach",
            avatar: "img/pos.png",
            dan: 3,
            link: "#"
          });
        }
      })
      .catch(error => {
        for(let i = 0; i < 10; i++) {
          this.sportsmen.push({
            name: "sp1",
            role: "coach",
            avatar: "img/pos.png",
            dan: 3,
            link: "#"
          });
        }
        window.console.log(error);
      });
  },
  methods: {
    togleSportsmenState() {
      this.isAllSportsmenShown = !this.isAllSportsmenShown;
    }
  },
  computed: {
    linkText: function() {
      return this.isAllSportsmenShown ? "Less..." : "More...";
    }
  }
};
</script>
<style>
</style>
