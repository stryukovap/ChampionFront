<template>
        <div class="container">
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
