<template>
    <div class="coach-cabinet container-fluid">
        <div class="row">
            <div class="col-2">
                <div class="sidebar__cabinet">
                    <div class="list-group" v-for="item of menu">
                        <button @click="toggleMenuItem(item.title)" class="list-group-item list-group-item-action">{{item.title}}</button>
                    </div>
                </div>
            </div>
            <div class="col-10">
                <tournaments-cabinet v-if="activeItem === 'Tournaments'"></tournaments-cabinet>
                <coach-my-team v-else-if="activeItem === 'My team'"></coach-my-team>
                <settings class="col-10" v-else-if="activeItem === 'Settings'"></settings>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import TournamentsCabinet from "./tournaments_cabinet.vue";
import CoachMyTeam from "./coach_my_team";
import Settings from "./settings-cabinet.vue";

export default {
  name: "coach-cabinet",
  components: {
    TournamentsCabinet,
    CoachMyTeam,
    Settings
  },
  data: function() {
    return {
      activeItem: "Tournaments",
      menu: [
        {
          title: "Tournaments",
          href: "coachcabinet/tournaments"
        },
        {
          title: "My team"
        },
        {
          title: "Settings"
        }
      ]
    };
  },
  methods: {
    toggleMenuItem(item) {
      this.activeItem = item;
    }
  },
  mounted() {
    //            axios.get('https://jsonplaceholder.typicode.com/todos')
    //                .then(response => this.menu = response.data)
    //                .catch(error => console.log(error))
  }
};
</script>

<style scoped lang="scss">
.coach-cabinet {
  margin-bottom: 30px;
}
</style>
