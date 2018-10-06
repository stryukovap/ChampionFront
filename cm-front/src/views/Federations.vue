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
        margin: 0 auto;
    }
    .cards{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-content: flex-start;
        &__item{
            margin: 5px 0 10px 5px;
            align-self: flex-start;
        }
    }

    @media (max-width: 1240px) {
        .wrapper {
            width: 100%;
            padding: 0 20px;
        }
    }

</style>
