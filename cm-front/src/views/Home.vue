<template>
    <div class="home">
        <div class="container">
            <div class="col-12">
                <!--<div class="row card-list">-->
                <!--<div class="row card-list" v-for="sportName in sports" :key="sportId">-->
                <div class="row card-list">
                    <!--<card class="col-12 col-md-6 col-lg-4 col-xl-4"-->
                          <!--v-for="sport in sports"-->
                          <!--v-bind:Name="sport.Name"-->
                          <!--v-bind:Image="sport.Image"-->
                          <!--:key="sport.Id"/>-->
                    <card class="col-12 col-md-6 col-lg-4 col-xl-4"
                          v-for="sport in sports"
                          v-bind:Name="sport.name"
                          v-bind:link_to="link + '/' + sport.id"
                          :key="sport.id"/>
                </div>
                <!--<card_sport/>-->
            </div>
        </div>
    </div>
</template>
<script>
import Card from "../components/Card";
import axios from "axios";

export default {
  components: { Card },
  data() {
    return {
      sports: {},
        link:"federations"
    };
  },
  mounted(){
      axios
          .get(
              "https://champion-api.herokuapp.com/api/sports"
          )
          .then(response => {
              // handle success
              window.console.log(response);
              if (response.status === 200) {
                  this.sports=response.data
              }
          })
          .catch(function (error) {
              // handle error
              window.console.log(error);
              return true;
          })
  }
};
</script>
