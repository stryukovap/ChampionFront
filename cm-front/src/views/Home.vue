<template>
        <div class="wrapper">
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
        .wrapper {
            width: 98%;
            margin: 20px;
        }
        .cards {
            width: 936px;
        }
    }
    @media (max-width: 972px) {
        .cards {
            width: 703px;
        }
    }
    @media (max-width: 733px) {
        .cards {
            width: 469px;
        }
    }
</style>
