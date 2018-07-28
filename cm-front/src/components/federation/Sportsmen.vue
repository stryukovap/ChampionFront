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
                    v-for='(sportsman, index) in sportsmenList'
                    v-if='index < 6 || isAllSportsmenShown'
                    :key='sportsman.index'>
                    <a v-bind:href="sportsman.link" class="text-secondary">
                      <div class="thumbnail">
                        <img v-bind:src="sportsman.avatar" class="mx-auto d-block">
                        <h4 class="text-center">{{ sportsman.name }}</h4>
                        <p class="text-center">{{ sportsman.role }}<img v-bind:src="sportsman.belt">{{ sportsman.dan }}</p>
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
  props: ['sportsmenList'],
  data: function() {
    return {
      isAllSportsmenShown: false
    };
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
