<template>
    <div>
        <div class="container">
            <div class="col-12">
                <!--<div class="row card-list">-->
                <!--<div class="row card-list" v-for="sportName in sports" :key="sportId">-->
                <div class="row card-list">
                    <!--<card class="col-12 col-md-6 col-lg-4 col-xl-4"-->
                          <!--v-for="federation in federations"-->
                          <!--v-bind:Name="federation.name"-->
                          <!--v-bind:Image="federation.Image"-->
                          <!--:key="federation.Id"/>-->
                    <card class="col-12 col-md-6 col-lg-4 col-xl-4"
                          v-for="federation in federations"
                          v-bind:Name="federation.name"
                          :key="federation.id"/>
                </div>
                <!--<card_sport/>-->
            </div>
        </div>
    </div>
</template>

<script>
import Card from "../components/Card";
import axios from "axios";
// https://champion-api.herokuapp.com/api/federations/{sportId}
export default {
  name: "Federations",
    props:["id"],
  components: { Card },
  data() {
    return {
      federations: []
    };
  },
    mounted(){
        axios
            .get(
        "https://champion-api.herokuapp.com/api/federations/" + this.id
            )
            .then(response => {
                // handle success
                window.console.log(response);
                if (response.status === 200) {
                    this.federations=response.data
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

<style scoped>
</style>
