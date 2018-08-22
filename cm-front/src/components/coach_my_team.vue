<template>
    <div>
        <div class="row mt-2">
            <div class="col-2">
                <h2>My team</h2>
            </div>
            <div class="col-4">
                <b-dropdown variant="outline-primary" right text="Activate">
                    <b-dropdown-item @click="buySubscription">Buy Sudscription</b-dropdown-item>
                    <b-dropdown-item @click="deleteSportsman">Delete</b-dropdown-item>
                </b-dropdown>
            </div>
            <div class="col-4">
                <nav class="navbar navbar-light">
                    <form class="form-inline">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search input" aria-label="Search">
                        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </nav>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-outline-primary">Create</button>
            </div>
        </div>

        <div class="row">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th><input type="checkbox" @click="selectAll" v-model="allSelected"></th>
                        <th class="table__head-item" scope="col" @click="sortItems('sportsman')">Sportsman</th>
                        <th class="table__head-item" scope="col" @click="sortItems('active')">Active</th>
                        <th class="table__head-item" scope="col" @click="sortItems('subscription')">Subscription expiry date</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <paginate tag="tbody" name="items" :list="items" :per="5" ref="paginator">
                    <tr v-for="item in paginated('items')">
                        <td><input type="checkbox" v-model="selectedItems" @click="selectItem" :value="item" ></td>
                        <td>{{item.name}}</td>
                        <td>{{item.username}}</td>
                        <td>{{item.id}}</td>
                        <th>Edit</th>
                    </tr>
                </paginate>
            </table>
        </div>
        <div>
            <paginate-links for="items" :show-step-links="true" :limit="2" :step-links="{ next: 'Next', prev: 'Previous'}"></paginate-links>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "coach-my-team",
  components: {},
  data: function() {
    return {
      items: [],
      paginate: ["items"],
      sorted: {
        name: false,
        active: false,
        subscription: false
      },
      allSelected: false,
      selectedItems: []
    };
  },
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => (this.items = response.data))
      .catch(error => window.console.log(error));
  },
  methods: {
    sortItems(column) {
      if (column === "sportsman") {
        if (this.sorted.name === false) {
          this.items.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          });
          this.sorted.name = !this.sorted.name;
        } else {
          this.items.sort((a, b) => {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
          });
          this.sorted.name = !this.sorted.name;
        }
      } else if (column === "active") {
        if (this.sorted.active === false) {
          this.items.sort((a, b) => {
            if (a.username > b.username) return 1;
            if (a.username < b.username) return -1;
            return 0;
          });
          this.sorted.active = !this.sorted.active;
        } else {
          this.items.sort((a, b) => {
            if (a.username > b.username) return -1;
            if (a.username < b.username) return 1;
            return 0;
          });
          this.sorted.active = !this.sorted.active;
        }
      } else if (column === "subscription") {
        if (this.sorted.subscription === false) {
          this.items.sort((a, b) => {
            return a.id - b.id;
          });
          this.sorted.subscription = !this.sorted.subscription;
        } else {
          this.items.sort((a, b) => {
            return b.id - a.id;
          });
          this.sorted.subscription = !this.sorted.subscription;
        }
      }
    },
    selectAll() {
      this.selectedItems = [];
      if (!this.allSelected) {
        this.items.forEach(item => {
          this.selectedItems.push(item);
        });
      }
    },
    selectItem() {
      this.allSelected = false;
    },
    buySubscription() {
      this.$router.push({
        path: "/buysubscribtion",
        params: { sportsmans: this.selectedItems }
      });
    },
    deleteSportsman() {
      //            const promises = this.selectedItems.map(item => {
      //                return axios
      //                    .delete(`https://champion-api.herokuapp.com/api/sportsman/${item.id}`)
      //                    .then(response => console.log(response.data.message))
      //            })
      //            return Promise.all(promises)
    }
  }
};
</script>

<style scoped lang="scss">
.table {
  &__head-item {
    cursor: pointer;
  }
}

.navbar-light {
  margin-top: -8px;
}

.paginate-links {
  user-select: none;
  margin: 0 10px;
  list-style: none;
  li {
    margin: 0 10px;
    list-style: none;
    display: inline-block;
    color: #0069d9;
    a {
      cursor: pointer;
    }
  }
  li.active a {
    font-weight: bold;
  }
  li.next:before {
    content: " | ";
    margin-right: 13px;
    color: #ddd;
  }
  li.disabled a {
    color: #ccc;
    cursor: no-drop;
  }
}
</style>
