<template>
<div class="sportsman__wrapper">
    <div class="sportsman__list">
      <div class="sportsman__item"
        v-for='(sportsman) in sportsmenList'
        :key='sportsman.index'>
        <router-link tag="a"
                     :to="'/userprofile' + '/' + sportsman.federation_sportsmen[0].sportsman_id"
                     class="sportsman__link">
          <div class="sportsman__info">
            <img v-if="sportsman.photo_id"
                 :src="sportsman.photo.url"
                 class="sportsman__photo"
                 alt="photo">
            <img v-else
                 class="sportsman__photo"
                 src="../../assets/345x345_26.jpg"
                 alt="photo">
            <h4 class="sportsman__name">{{ sportsman.first_name }}</h4>
            <h4 class="sportsman__name">{{sportsman.last_name}}</h4>
          </div>
          <div class="sportsman__desc">
            <p class="sportsman__role" v-if="sportsman.federation_sportsmen[0].is_coach === 0">sportsmen</p>
            <p class="sportsman__role" v-else>coach</p>
          </div>
        </router-link>
        <!--<a :href="'https://champion-front-test.herokuapp.com/userprofile/' + sportsman.federation_sportsmen[0].sportsman_id" class="text-secondary">-->

              <!--<p class="text-center">{{ sportsman.role }}</p>-->
            <!--<img v-bind:src="sportsman.belt">{{ sportsman.dan }}</p>-->
            <!--<p class="text-center">{{ sportsman.role }}</p>-->
            <!--<p class="text-center">belt - {{ sportsman.belt }}</p>-->
            <!--<p class="text-center">title - {{ sportsman.title }}</p>-->
        <!--</a>-->
      </div>
    </div>
  <!--<div class="container">-->
    <!--<nav aria-label="Page navigation example">-->
      <ul class="pagination__list">
        <li class="pagination__item"
            v-bind:class="{ 'disabled': pagination.currentPage === 1 }"
            @click="updateSportsmen(pagination.currentPage - 1)"
        >
          <a class="pagination__link pagination__link--left" href="#" tabindex="-1"></a>
        </li>
        <li v-for="page in pagination.pages" class="pagination__item"
            v-bind:class="{ 'active': pagination.currentPage === page }"
            @click="updateSportsmen(page)"
        >
          <a class="pagination__link">{{page}}</a>
        </li>
        <li class="pagination__item"
            v-bind:class="{ 'disabled': pagination.currentPage ===  pagination.pages}"
            @click="updateSportsmen(pagination.currentPage + 1)"
        >
          <a class="pagination__link pagination__link--right" href="#"></a>
        </li>
      </ul>
    <!--</nav>-->
  </div>

<!--</div>-->

  <!--</div>-->
<!--</div>-->
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
      sportsmanTest: []
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
            "/5?page=" +
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
  p, h4{
    margin: 0;
    padding: 0;
  }
.sportsman {
  &__item{
    width: 225px;
    height: 261px;
    border-radius: 5px;
    box-shadow: 0 0 10px 0 #e9e9e9;
    background-color: #ffffff;
    border: solid 1px #e9e9e9;
    margin-right: 15px;
    -webkit-box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.7);
    -moz-box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.7);
    box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.7);
    &:last-child{
      margin-right: 0;
    }
  }
  &__photo {
    width: 125px;
    height: 125px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 2px 10px 0 #e9e9e9;
  }
  &__link {
    text-decoration: none;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 4px solid transparent;
    &:hover {
      border: 4px solid #f77f00;
      border-radius: 5px;
    }
  }
  &__name {
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #262626;
    text-align: center;
    margin-top: 24px;
    &:last-child{
      margin-top: 5px;
    }
  }
  &__desc {
    margin-top: auto;
    width: 100%;
  }
  &__role {
    font-family: "Roboto", sans-serif;
    text-align: left;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #262626;
  }
  &__list {
    display: flex;
    justify-content: flex-start;
    align-self: stretch;
  }
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 40px;
  }
}
.pagination {
  &__list {
    align-self: stretch;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    margin-top: 40px;
  }
  &__item {
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    color: #000000;
    &.active {
      color: #ffffff;
      background-color: #3f88c5;
    }
  }
  &__link {
    font-family: "Roboto", sans-serif;
    display: block;
    width: 37px;
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    /*line-height: normal;*/
    line-height: 37px;
    letter-spacing: normal;
    color: #000000;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    &--left {
      height: 37px;
      &:before {
        content: "";
        display: block;
        position: absolute;
        top: 8.5px;
        left: 5.5px;
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-right: 20px solid #3f88c5;
        border-bottom: 10px solid transparent;
      }
    }
    &--right {
      height: 37px;
      &:before {
        content: "";
        display: block;
        position: absolute;
        top: 8.5px;
        right: 5.5px;
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-left: 20px solid #3f88c5;
        border-bottom: 10px solid transparent;
      }
    }
  }
}
</style>
