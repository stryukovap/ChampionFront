<template>
    <div class="buy-subscription row">
        <table class="table table-hover">
            <thead>
            <tr>
                <th class="table__head-item" scope="col" @click="sortItems('sportsman')">Sportsman</th>
                <th class="table__head-item" scope="col" @click="sortItems('active')">Active</th>
                <th class="table__head-item" scope="col" @click="sortItems('subscription')">Subscription expiry date</th>
            </tr>
            </thead>
            <tr v-for="item in sportsmen">
                <td>{{item.first_name}} {{item.last_name}}</td>
                <td>{{item.id}}</td>
                <td>{{item.date_of_birth}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
import axios from "axios";

export default {
  name: "buysubscription",
  data: function() {
    return {
      sportsmen: {},
      sportsmanIds: []
    };
  },
  mounted() {
    this.sportsmanIds = this.$store.state.selectedSportsmen;
    this.sportsmen = this.sportsmanIds.map(id => {
      return this.$store.state.sportsmanList[id];
    });
    console.log(this.sportsmen);
  }
};
</script>
