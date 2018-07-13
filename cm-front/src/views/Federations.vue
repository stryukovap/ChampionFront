<template>
    <div>
        <div class="container">
            <div class="col-12">
                <!--<div class="row card-list">-->
                <!--<div class="row card-list" v-for="sportName in sports" :key="sportId">-->
                <div class="row card-list">
                    <card class="col-12 col-md-6 col-lg-4 col-xl-4"
                          v-for="federation in federations"
                          v-bind:Name="federation.Name"
                          v-bind:Image="federation.Image"
                          :key="federation.Id"/>
                </div>
                <!--<card_sport/>-->
            </div>
        </div>
    </div>
</template>

<script>
import Card from "../components/Card";

export default {
  name: "Federations",
  components: { Card },
  data() {
    return {
      federations: [
        {
          Id: "111",
          Name: "TKV",
          Image: "logo.png"
        },
        {
          Id: "222",
          Name: "TVK",
          Image: "logo.png"
        },
        {
          Id: "333",
          Name: "VKT",
          Image: "github-mark_560x560.png"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>
