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
                        <input
                                v-model="searchingSportsman"
                                class="form-control mr-sm-2"
                                type="search"
                                placeholder="Enter name"
                                aria-label="Search">
                        <button
                                @click.prevent="searchSportsman"
                                class="btn btn-primary my-2 my-sm-0">
                            Search
                        </button>
                    </form>
                </nav>
            </div>
            <div class="col-2">
                <b-dropdown variant="outline-primary" right text="Create">
                    <b-dropdown-item @click="createPerson('Coach')">Coach</b-dropdown-item>
                    <b-dropdown-item @click="createPerson('Referee')">Referee</b-dropdown-item>
                    <b-dropdown-item @click="createPerson('Sportsman')">Sportsman</b-dropdown-item>
                </b-dropdown>
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
                        <td><input
                                type="checkbox"
                                v-model="$store.state.selectedSportsmen"
                                @click="selectSportsman"
                                :value="item.id" >
                        </td>
                        <td>{{item.first_name}} {{item.last_name}}</td>
                        <td>{{item.patronymic_name}}</td>
                        <td>{{item.city}}</td>
                        <td>
                            <input
                                    @click="toggleActive(item.id)"
                                    type="checkbox"
                                    v-model="item.city"
                                    v-bind:true-value="checkbox.active"
                                    v-bind:false-value="checkbox.notActive" />
                        </td>
                        <td>
                            <input
                                    @click="toggleIsCoach(item.id)"
                                    type="checkbox"
                                    v-model="item.patronymic_name"
                                    v-bind:true-value="checkbox.coach"
                                    v-bind:false-value="checkbox.notCoach" />
                        </td>
                        <td>{{item.date_of_birth}}</td>
                        <th>
                            <button @click.prevent="editSportsman(item.id)" class="btn btn-outline-primary btn-sm">
                                Edit
                            </button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
        <modal-form
                v-bind:sportsman-id="sportsmanId"
                v-bind:person-role="roleOfCreatedPerson"
                @clicked="closeAndUpdate"
                @click.prevent="closeModal"
                v-if="modalShow">
        </modal-form>
    </div>
</template>

<script>
    import axios from "axios";
    import ModalForm from "./modalForm.vue";
    export default {
        name: "federation-sportsmen",
        components: {
            ModalForm
        },
        data: function () {
            return {
                modalShow: false,
                roleOfCreatedPerson: '',
                sportsmanId: '',
                sorted: {
                    name: false,
                    active: false,
                    subscription: false
                },
                checkbox: {
                    active: 'Odessa',
                    notActive: 'Kyiv',
                    coach: 'coach',
                    notCoach: 'not a coach'
                },
                allSelected: false,
                searchingSportsman: '',
                http: axios.create({
                    headers: { Authorization: "Bearer " + this.$store.state.authUser.auth_token}
                })
            }
        },
        beforeMount() {
            this.$store.state.sportsmanList = {};
            this.$store.state.selectedSportsmen = [];
        },
        mounted() {
            // axios.get("https://champion-api.herokuapp.com/api/sportsman/list")
            //     .then(response => {
            //         this.$store.commit('setSportsmanList', response.data);
            //     })
            //     .catch(error => console.log(error));

            // axios.get("https://champion-api.herokuapp.com/api/federations")
            //     .then(response => {
            //         console.log(response.data);
            //     });
            // 6960b15ffd99a85a0fd58939c8841bf1

            axios.get("https://champion-api.herokuapp.com/api/sportsman-list/by-federation/72/2")
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
            createPerson(role) {
                this.modalShow = true;
                this.roleOfCreatedPerson = role;
            },
            editSportsman(id) {
                this.sportsmanId = id;
                this.modalShow = true;
            },
            closeModal() {
                this.modalShow = false;
                this.sportsmanId = '';
                this.roleOfCreatedPerson = '';
            },
            closeAndUpdate() {
                this.modalShow = false;
                this.sportsmanId = '';
                this.roleOfCreatedPerson = '';
                axios.get("https://champion-api.herokuapp.com/api/sportsman/list")
                    .then(response => {
                        this.$store.commit('setSportsmanList', response.data);
                    })
                    .catch(error => console.log(error));
            },
            toggleActive(id) {
                if (this.$store.state.sportsmanList[id].city === 'Kyiv') {
                    this.$store.state.sportsmanList[id].city = 'Odessa';
//                    this.$store.state.sportsmanList[id].active = true;
                } else {
                    this.$store.state.sportsmanList[id].city = 'Kyiv';
//                    this.$store.state.sportsmanList[id].active = false;
                }
                this.http.put(`https://champion-api.herokuapp.com/api/sportsman/${id}`,
                    this.$store.state.sportsmanList[id])
                    .then(response => console.log('saved successfully'))
                    .catch(error => console.log(error.message));
            },
            toggleIsCoach(id) {
                if (this.$store.state.sportsmanList[id].patronymic_name === 'not a coach') {
                    this.$store.state.sportsmanList[id].patronymic_name = 'coach';
//                    this.$store.state.sportsmanList[id].isCoach = true;
                } else {
                    this.$store.state.sportsmanList[id].patronymic_name = 'not a coach';
//                    this.$store.state.sportsmanList[id].isCoach = false;
                }
                this.http.put(`https://champion-api.herokuapp.com/api/sportsman/${id}`,
                    this.$store.state.sportsmanList[id])
                    .then(response => console.log('saved successfully'))
                    .catch(error => console.log(error.message));
            },
            activateSelected() {
                this.$store.state.selectedSportsmen.map(id => {
                    this.$store.state.sportsmanList[id].active = true;
                    return this.http.put(`https://champion-api.herokuapp.com/api/sportsman/${id}`,
                        this.$store.state.sportsmanList[id])
                        .then(response => console.log(response.data.message))
                        .catch(error => console.log(error.message));
                });
            },
            deactivateSelected() {
                this.$store.state.selectedSportsmen.map(id => {
                    this.$store.state.sportsmanList[id].active = false;
                    return this.http.put(`https://champion-api.herokuapp.com/api/sportsman/${id}`,
                        this.$store.state.sportsmanList[id])
                        .then(response => console.log(response.data.message))
                        .catch(error => console.log(error.message));
                });
            },
            buySubscription() {
                this.$router.push({ path: '/buysubscribtion'});
            },
            deleteSportsman() {
                this.$store.state.selectedSportsmen.map(id => {
                    return axios
                        .delete(`https://champion-api.herokuapp.com/api/sportsman/${id}`)
                        .then(response => console.log(response))
                        .catch(error => console.log(error.message));
                });
                this.$store.commit('removeSportsman');
            },
            searchSportsman() {
//                axios.post(`https://champion-api.herokuapp.com/api/sportsman/search`, {
//                    name: this.searchingSportsman})
//                    .then(response => console.log(response.data))
//                    .catch(error => console.log(error.message));
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