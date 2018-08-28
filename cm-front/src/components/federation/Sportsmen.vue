<template>
<div>
  <div class="container">
    <div class="row">
      <h2 class="h2">Our Sportsmen</h2>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-sm-6 col-md-3 col-lg-2"
        v-for='(sportsman, index) in sportsmenList'
        :key='sportsman.index'>
        <a v-bind:href="sportsman.link" class="text-secondary">
          <div class="thumbnail">
            <img v-bind:src="sportsman.avatar" class="mx-auto d-block">
            <h4 class="text-center">{{ sportsman.name }}</h4>
            <!-- <p class="text-center">{{ sportsman.role }}<img v-bind:src="sportsman.belt">{{ sportsman.dan }}</p> -->
            <p class="text-center">{{ sportsman.role }}</p>
            <p class="text-center">belt - {{ sportsman.belt }}</p>
            <p class="text-center">title - {{ sportsman.title }}</p>
          </div>
        </a>
      </div>
    </div>
    <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item"
        v-bind:class="{ 'disabled': pagination.currentPage === 1 }"
        @click="updateSportsmen(pagination.currentPage - 1)"
      >
        <a class="page-link" href="#" tabindex="-1">Previous</a>
      </li>
      <li v-for="page in pagination.pages" class="page-item"
        v-bind:class="{ 'active': pagination.currentPage === page }"
        @click="updateSportsmen(page)"
      >
        <span class="page-link">{{page}}</span>
      </li>
      <li class="page-item"
        v-bind:class="{ 'disabled': pagination.currentPage ===  pagination.pages}"
        @click="updateSportsmen(pagination.currentPage + 1)"
      >
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
  </div>
</div>
</template>
<script>
import axios from "axios";
export default {
  name: "sportsmen",
  data: function() {
    return {
      sportsmenList: [],
      pagination: {
        currentPage: 1,
        pages: 0
      }
    };
  },
  mounted() {
    this.updateSportsmen("");
    
    this.pagination.currentPage = 1;
  },
  methods: {
    updateSportsmen(page) {
      if(page !== 0 && page !== this.pagination.pages + 1) this.pagination.currentPage = page;

      axios
      .get(
        "http://champion-api.herokuapp.com/api/sportsman-list/by-federation/" + this.$route.params.id + "/12?page=" + page
      )
      .then(response => {
        for (let i = 0; i < response.data.data.length; i++) {
          if(page !== "") this.sportsmenList.shift();
          this.sportsmenList.push({
            name: response.data.data[i].first_name + " " + response.data.data[i].last_name,
            role: response.data.data[i].federation_sportsmen[0].is_coach ? "coach" : "sportsman",
            belt: this.$store.state.federationBelts[response.data.data[i].federation_sportsmen[0].federation_belt_id] || "no",
            title: response.data.data[i].federation_sportsmen[0].title || "no",
            link: "#",
            avatar: "../img/user-photo.PNG"
          });
        }
        this.pagination.pages = response.data.last_page;
      })
      .catch(error => {
        window.console.log(error);
      })
    }

  },
};
</script>
<style>
</style>
