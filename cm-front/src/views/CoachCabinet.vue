<template>
    <div class="coach-cabinet container-fluid">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-2">
                <div class="sidebar__cabinet">
                    <div class="list-group" v-for="item of menu">
                        <button @click="toggleMenuItem(item.title)"
                                class="list-group-item list-group-item-action"
                                v-bind:class="{'list-group-item-success': activeItem === item.title}">
                            {{item.title}}
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-10">
                <tournaments v-if="activeItem === 'Tournaments'"></tournaments>
                <my-team v-else-if="activeItem === 'My team'"></my-team>
                <groups v-else-if="activeItem === 'Groups'"></groups>
                <settings class="col-10" v-else-if="activeItem === 'Settings'"></settings>
            </div>
        </div>
    </div>
</template>

<script>
//import axios from "axios";
import Tournaments from "../components/privateCabinet/tournamentsCabinet.vue";
import MyTeam from "../components/privateCabinet/coachMyTeamCabinet";
import Groups from "../components/privateCabinet/coachGroups";
import Settings from "../components/privateCabinet/settingsCabinet.vue";

export default {
  name: "coach-cabinet",
  components: {
    Tournaments,
    MyTeam,
    Groups,
    Settings
  },
  data: function() {
    return {
      activeItem: "Tournaments",
      menu: [
        {
          title: "Tournaments"
        },
        {
          title: "My team"
        },
        {
          title: "Groups"
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
  mounted() {}
};
</script>

<style scoped lang="scss">
.coach-cabinet {
  margin-bottom: 30px;
}

.list-group-item {
    cursor: pointer;
}

@media (max-width: 992px) {
    .list-group {
        width: 25%;
        display: inline-block;
    }
    .list-group-item {
        font-size: 3em;
    }
}
@media (max-width: 576px) {
    .list-group {
        width: 100%;
        display: block;
    }
}
</style>
