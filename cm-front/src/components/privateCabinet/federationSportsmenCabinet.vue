<template>
    <div>
        <div class="row mt-2">
            <div class="col-2">
                <h2>Sportsmen</h2>
            </div>
            <div class="col-4">
                <b-dropdown variant="outline-primary" right text="Activate">
                    <b-dropdown-item @click="activateSelected">Activate</b-dropdown-item>
                    <b-dropdown-item @click="deactivateSelected">Deactivate</b-dropdown-item>
                    <b-dropdown-item @click="buySubscription">Buy Sudscription</b-dropdown-item>
                    <b-dropdown-item @click="deleteSportsman">Delete</b-dropdown-item>
                </b-dropdown>
            </div>
            <div class="col-4">
                <nav class="navbar navbar-light">
                    <form class="form-inline">
                        <input v-model="searchingSportsman" class="form-control mr-sm-2" type="search" placeholder="Enter name" aria-label="Search">
                        <button @click="searchSportsman" class="btn btn-outline-primary my-2 my-sm-0">Search</button>
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
                    <th class="table__head-item" scope="col" @click="sortItems('coaches')">Coaches</th>
                    <th class="table__head-item" scope="col" @click="sortItems('city')">City</th>
                    <th class="table__head-item" scope="col" @click="sortItems('active')">Active</th>
                    <th class="table__head-item" scope="col" @click="sortItems('isCoach')">Is Coach</th>
                    <th class="table__head-item" scope="col" @click="sortItems('subscription')">Subscription expiry date</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody name="items" :list="$store.state.sportsmanList">
                    <tr v-for="item in $store.state.sportsmanList">
                        <td><input type="checkbox" v-model="$store.state.selectedSportsmen" @click="selectSportsman" :value="item.id" ></td>
                        <td>{{item.first_name}} {{item.last_name}}</td>
                        <td>{{item.patronymic_name}}</td>
                        <td>{{item.city}}</td>
                        <td>
                            <input @click="deactivateOne" v-if="item.first_name === 'Ivan'" checked type="checkbox">
                            <input  @click="activateOne(item.id)" v-else type="checkbox">
                        </td>
                        <td>
                            <input @click="removeFromCoach(item.id)" v-if="item.first_name === 'name'" checked type="checkbox">
                            <input @click="addToCoach(item.id)" v-else type="checkbox">
                        </td>
                        <td>{{item.date_of_birth}}</td>
                        <th>Edit</th>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>{{$store.state.selectedSportsmen}}</p>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "federation-sportsmen",
        data: function () {
            return {
                sorted: {
                    name: false,
                    active: false,
                    subscription: false
                },
                allSelected: false,
                searchingSportsman: ''
            }
        },
        beforeMount() {
            this.$store.state.sportsmanList = {};
            this.$store.state.selectedSportsmen = [];
        },
        mounted() {
            axios.get("https://champion-api.herokuapp.com/api/sportsman/list")
                .then(response => {
                    this.$store.commit('setSportsmanList', response.data);
                })
                .catch(error => console.log(error));
        },
        methods: {
            selectAll() {
                this.$store.state.selectedSportsmen = [];
                if (!this.allSelected) {
                    this.$store.commit('setSelectedSportsmen');
                }
            },
            selectSportsman() {
                this.allSelected = false;
            },
            activateOne(id) {
                this.$store.state.sportsmanList[id].first_name = 'Ivan';
//                this.$store.state.sportsmanList[id].active = true;

                axios.put(`https://champion-api.herokuapp.com/api/sportsman/${id}`, {
                    first_name: 'Ivan'
//                    active: true
                })
                    .then(response => console.log('saved successfully'))
                    .catch(error => console.log(error.message));
            },
            deactivateOne() {
                this.$store.state.sportsmanList[id].first_name = 'Ivan';
//                this.$store.state.sportsmanList[id].active = false;
                axios.put(`https://champion-api.herokuapp.com/api/sportsman/${id}`, {
                    first_name: 'Ivan'
//                    active: false
                })
                    .then(response => console.log('saved successfully'))
                    .catch(error => console.log(error.message));
            },
            addToCoach(id) {
                this.$store.state.sportsmanList[id].isCoach = true;
                axios.put(`https://champion-api.herokuapp.com/api/sportsman/${id}`, {
                    isCoach: true
                })
                    .then(response => console.log('saved successfully'))
                    .catch(error => console.log(error.message));
            },
            removeFromCoach(id) {
                this.$store.state.sportsmanList[id].isCoach = false;
                axios.put(`https://champion-api.herokuapp.com/api/sportsman/${id}`, {
                    isCoach: false
                })
                    .then(response => console.log('saved successfully'))
                    .catch(error => console.log(error.message));
            },
            activateSelected() {
                this.$store.state.selectedSportsmen.map(id => {
                    this.$store.state.sportsmanList[id].active = true;
                    return axios
                        .put(`https://champion-api.herokuapp.com/api/sportsman/${id}`, {
                            active: true
                        })
                        .then(response => console.log(response.data.message))
                });
            },
            deactivateSelected() {
                this.$store.state.selectedSportsmen.map(id => {
                    this.$store.state.sportsmanList[id].active = false;
                    return axios
                        .put(`https://champion-api.herokuapp.com/api/sportsman/${id}`, {
                            active: false
                        })
                        .then(response => console.log(response.data.message))
                });
            },
            buySubscription() {
                this.$router.push({ path: '/buysubscribtion'});
            },
            deleteSportsman() {
                this.$store.state.selectedSportsmen.map(id => {
                    return axios
                        .delete(`https://champion-api.herokuapp.com/api/sportsman/${id}`)
                        .then(response => console.log(response));
                });
                this.$store.commit('removeSportsman');
            },
            searchSportsman() {
                axios.post(`https://champion-api.herokuapp.com/api/sportsman/search`, {
                    name: this.searchingSportsman
                }).then(response => console.log(response.data))
            }
        }
    }
</script>

<style lang="scss">
    .table {
        &__head-item {
            cursor: pointer;
        }
    }

    .navbar-light {
        margin-top: -8px;
    }
</style>