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
                        <input v-model="searchingSportsman" class="form-control mr-sm-2" type="search" placeholder="Enter name" aria-label="Search">
                        <button @click="searchSportsman" class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </nav>
            </div>
            <div class="col-2">
                <button type="button" @click="modalShow = true" class="btn btn-outline-primary">Create</button>
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
                <tbody name="items" :list="$store.state.sportsmanList">
                    <tr v-for="item in $store.state.sportsmanList">
                        <td><input type="checkbox" v-model="$store.state.selectedSportsmen" @click="selectSportsman" :value="item.id" ></td>
                        <td>{{item.first_name}} {{item.last_name}}</td>
                        <td>{{item.patronymic_name}}</td>
                        <td>{{item.date_of_birth}}</td>
                        <th>Edit</th>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <!--<paginate-links for="items" :show-step-links="true" :limit="2" :step-links="{ next: 'Next', prev: 'Previous'}"></paginate-links>-->
        </div>
        <modal-form @clicked="closeAndUpdate" @click.prevent="modalShow = false" v-if="modalShow"></modal-form>
    </div>
</template>

<script>
    import axios from "axios";
    import ModalForm from "./modalForm.vue";

    export default {
        name: "coach-my-team",
        components: {
            ModalForm
        },
        data: function () {
            return {
                modalShow: false,
                paginate: ['items'],
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
            closeAndUpdate() {
                this.modalShow = false;
                axios.get("https://champion-api.herokuapp.com/api/sportsman/list")
                    .then(response => {
                        this.$store.commit('setSportsmanList', response.data);
                    })
                    .catch(error => console.log(error));
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

//        sortItems(column) {
//            if(column === 'sportsman') {
//                if (this.sorted.name === false) {
//                    this.$store.state.sportsmanList.sort((a,b) => {
//                        if (a.name > b.name) return 1;
//                        if (a.name < b.name) return -1;
//                        return 0;
//                    });
//                    this.sorted.name = !this.sorted.name;
//                } else {
//                    this.$store.state.sportsmanList.sort((a,b) => {
//                        if (a.name > b.name) return -1;
//                        if (a.name < b.name) return 1;
//                        return 0;
//                    });
//                    this.sorted.name = !this.sorted.name;
//                }
//            } else if (column === 'active') {
//                if (this.sorted.active === false) {
//                    this.$store.state.sportsmanList.sort((a, b) => {
//                        if (a.username > b.username) return 1;
//                        if (a.username < b.username) return -1;
//                        return 0;
//                    });
//                    this.sorted.active = !this.sorted.active;
//                } else {
//                    this.$store.state.sportsmanList.sort((a, b) => {
//                        if (a.username > b.username) return -1;
//                        if (a.username < b.username) return 1;
//                        return 0;
//                    });
//                    this.sorted.active = !this.sorted.active;
//                }
//            } else if (column === 'subscription') {
//                if (this.sorted.subscription === false) {
//                    this.$store.state.sportsmanList.sort((a, b) => {
//                        return a.id - b.id;
//                    });
//                    this.sorted.subscription = !this.sorted.subscription;
//                } else {
//                    this.$store.state.sportsmanList.sort((a, b) => {
//                        return b.id - a.id;
//                    });
//                    this.sorted.subscription = !this.sorted.subscription;
//                }
//            }
//        },
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