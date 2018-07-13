<template>
<div>
    <section>
        <div class="container">
            <div class="row">
                <h2 class="h2">Our Sportsmen</h2>
                <a v-on:click.prevent="togleSportsmenState" class="h2" href="#">{{ linkText }}</a>
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
                    <div class="thumbnail">
                        <img src="img/user-photo.PNG">
                        <div class="caption">
                            <h4 class="text-center">{{ sportsman.name }}</h4>
                            <p class="text-center">{{ sportsman.role }}<img v-bind:src="sportsman.avatar">{{ sportsman.dan }}</p>
                        </div>
                    </div>
                </div>
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
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.sportsmen.push({
            name: response.data[i].name,
            role: "coach",
            avatar: "img/pos.png",
            dan: response.data[i].id
          });
        }
      })
      .catch(error => {
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
      return this.isAllSportsmenShown ? "See 6" : "See all";
    }
  }
};
</script>

<style>
</style>
