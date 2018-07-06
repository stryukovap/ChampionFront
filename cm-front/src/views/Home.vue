<template>
    <div class="home">
        <div class="container">
            <div class="col-12">
                <!--<div class="row card-list">-->
                <!--<div class="row card-list" v-for="sportName in sports" :key="sportId">-->
                <div class="row card-list">
                    <card_sport class="col-12 col-md-6 col-lg-4 col-xl-4"
                                v-for="sport in sports"
                                v-bind:sportName="sport.sportName"
                                v-bind:sportImage="sport.sportImage"
                                :key="sport.sportId"/>
                </div>
                <!--<card_sport/>-->
            </div>
        </div>
    </div>
</template>
<script>
import Card_sport from "../components/Card_sport";

export default {
  components: { Card_sport },
  data() {
    // return { sports:[{name: 'football'},{name: 'handball'}
    return {
      sports: [
        {
          sportId: "111",
          sportName: "TKV",
          sportImage: "logo.png"
        },
        {
          sportId: "222",
          sportName: "TVK",
          sportImage: "logo.png"
        },
        {
          sportId: "333",
          sportName: "VKT",
          sportImage: "github-mark_560x560.png"
        }
      ]
    };
  }
};
</script>
