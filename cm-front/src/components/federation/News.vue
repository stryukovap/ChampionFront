<template>
<div>
  <h2 class="h2-1 ml-5">News</h2>
  <div class="row">
      <div class="col-md-6 col-lg-12"
          v-for='(post, index) in newsList'
          v-if='index < 2 || isAllPostsShown'
          :key='post.index'>
          <a v-bind:href="post.link" class="text-secondary">
            <div class="thumbnail">
                <img class="card-img-top"
                        v-bind:src="post.avatar"
                        alt="Card image cap">
                <div class="caption">
                  <h4 class="text-center">{{ post.name }}</h4>
                  <p class="text-center">{{ post.date }}</p>
                </div>
            </div>
          </a>
      </div>
  </div>
  <div class="text-right">
      <a v-on:click.prevent="togleNewsState" href="#">{{ linkText }}...</a>
  </div>
</div>
</template>
<script>
import axios from "axios";
export default {
  name: "news",
  props: ['newsList'],
  data: function() {
    return {
      isAllPostsShown: false
    };
  },
  methods: {
    togleNewsState() {
      this.isAllPostsShown = !this.isAllPostsShown;
    }
  },
  computed: {
    linkText: function() {
      return this.isAllPostsShown ? "Less" : "More";
    }
  }
};
</script>
<style>
</style>
