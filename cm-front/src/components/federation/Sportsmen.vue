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
        <router-link tag="a"
                     :to="'/userprofile' + '/' + sportsman.federation_sportsmen[0].sportsman_id"
                     class="user__link">
          Profile
        </router-link>
        <!--<a :href="'https://champion-front-test.herokuapp.com/userprofile/' + sportsman.federation_sportsmen[0].sportsman_id" class="text-secondary">-->
          <div class="thumbnail">
              <img v-if="sportsman.photo_id"
                   :src="sportsman.photo.url"
                   class="user__photo mx-auto d-block"
                   width="150" height="150" alt="photo">
              <img v-else
                   class="user__photo mx-auto d-block"
                   src="../../assets/345x345_26.jpg"
                   width="150" height="150" alt="photo">
            <h4 class="text-center">{{ sportsman.first_name }} {{sportsman.last_name}}</h4>
              <p v-if="sportsman.federation_sportsmen[0].is_coach === 0">sportsmen</p>
              <p v-else>coach</p>
              <!--<p class="text-center">{{ sportsman.role }}</p>-->
            <!--<img v-bind:src="sportsman.belt">{{ sportsman.dan }}</p>-->
            <!--<p class="text-center">{{ sportsman.role }}</p>-->
            <!--<p class="text-center">belt - {{ sportsman.belt }}</p>-->
            <!--<p class="text-center">title - {{ sportsman.title }}</p>-->
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
      },
        sportsmanTest:[],
    };
  },
  mounted() {
    this.updateSportsmen("");

    this.pagination.currentPage = 1;
  },
  methods: {
    updateSportsmen(page) {
      if (page !== 0 && page !== this.pagination.pages + 1)
        this.pagination.currentPage = page;

      axios
        .get(
          "https://champion-api.herokuapp.com/api/sportsman-list/by-federation/" +
            this.$route.params.id +
            "/6?page=" +
            page
        )
        .then(response => {
          // for (let i = 0; i < response.data.data.length; i++) {
              // this.sportsmanTest[i] = response.data;
              console.log(response.data.data);
            // if (page !== "") this.sportsmenList.shift();
            this.sportsmenList = response.data.data;
              // link: `https://champion-front-test.herokuapp.com/userprofile/${response.data.data[i].id}`,
            // });
          // }
          this.pagination.pages = response.data.last_page;
          console.log(this.sportsmenList);
        })
        .catch(error => {
          window.console.log(error);
        });
    }
  }
};
</script>
<style scoped lang="scss">
    .user{
        &__photo{
            width: 125px;
            height: 125px;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: 0 2px 10px 0 #e9e9e9;
        }
    }
</style>
