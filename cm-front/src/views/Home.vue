<template>
        <div class="container">
            <div class="cards">
                <card class="cards__item" v-for="sport in sports"
                      v-bind:Name="sport.name"
                      v-bind:link_to="link + '/' + sport.id"
                      :key="sport.id"/>
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
      link: "federations"
    };
  },
  mounted() {
    axios
      .get("https://champion-api.herokuapp.com/api/sports")
      .then(response => {
        // handle success
        window.console.log(response);
        if (response.status === 200) {
          this.sports = response.data;
        }
      })
      .catch(function(error) {
        // handle error
        window.console.log(error);
        return true;
      });
  }
};
</script>
<style scoped lang="scss">
    .cards{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 30px;
        &__item{
            margin-top: 30px;
            margin-right: 34px;
            &:nth-child(4n){
                margin-right: 0;
            }
        }
    }
</style>
