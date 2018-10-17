<template>
        <div class="wrapper">
                <div class="cards">
                    <card class="cards__item"
                          v-for="federation in federations"
                          v-bind:Name="federation.name"
                          v-bind:link_to="link + '/' + federation.id"
                          :key="federation.id"/>
                </div>
            </div>
</template>

<script>
import Card from "../components/Card";
import axios from "axios";
// https://champion-api.herokuapp.com/api/federations/{sportId}
export default {
  name: "Federations",
  link: "federation",
  components: { Card },
  data() {
    return {
      federations: {},
      link: "federation"
    };
  },
  mounted() {
    axios
      .get(
        "https://champion-api.herokuapp.com/api/federations/" +
          this.$route.params.id
      )
      .then(response => {
        // handle success
        window.console.log(response);
        if (response.status === 200) {
          this.federations = response.data;
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
    .wrapper {
        width: 1200px;
        margin: 50px auto;
    }
    .cards{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-content: flex-start;
        margin-left: auto;
        margin-right: auto;
    }

    @media (max-width: 1200px) {
        /*.wrapper {*/
            /*width: 98%;*/
            /*margin: 20px;*/
        /*}*/
        .cards {
            width: 98%;
        }
    }
    /*@media (max-width: 972px) {*/
        /*.cards {*/
            /*width: 703px;*/
        /*}*/
    /*}*/
    /*@media (max-width: 733px) {*/
        /*.cards {*/
            /*width: 469px;*/
        /*}*/
    /*}*/
        /*@media (max-width: 570px) {*/
            /*.cards {*/
                /*margin: 10px;*/
            /*}*/
    /*}*/

</style>
