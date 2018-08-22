<template>
    <div>
        <div class="row mt-2">
            <div class="col-2">
                <h2>My team</h2>
            </div>
            <div class="col-4">
                <b-dropdown variant="outline-primary" right text="Action">
                    <b-dropdown-item @click="buySubscription">Buy Sudscription</b-dropdown-item>
                    <b-dropdown-item @click="deleteSportsman">Delete</b-dropdown-item>
                </b-dropdown>
            </div>
            <div class="col-4">
                <nav class="navbar navbar-light">
                    <form class="form-inline">
                        <input class="form-control mr-sm-2" type="search" placeholder="Enter name" aria-label="Search">
                        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
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
                <tbody>
                    <tr v-for="item in $store.state.sportsmanList">
                        <td><input type="checkbox" v-model="$store.state.selectedSportsmen" @click="selectSportsman" :value="item.id" ></td>
                        <td>{{item.first_name}} {{item.last_name}}</td>
                        <td>{{item.patronymic_name}}</td>
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
                v-bind:person-role="personRole"
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
        name: "coach-my-team",
        components: {
            ModalForm
        },
        data: function () {
            return {
                personRole: 'OwnCoachSportsman',
                modalShow: false,
                coach_id: '',
                sportsmanId: '',
                sorted: {
                    name: false,
                    active: false,
                    subscription: false
                },
                allSelected: false
            }
        },
        beforeMount() {
            this.$store.state.sportsmanList = {};
            this.$store.state.selectedSportsmen = [];
        },
        mounted() {
            this.coach_id = this.$store.state.authUser.my_profile_id;
            axios.get(`http://champion-api.herokuapp.com/api/sportsman-list/by-coach/${this.coach_id}`)
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
            editSportsman(id) {
                this.sportsmanId = id;
                this.modalShow = true;
            },
            closeModal() {
                this.modalShow = false;
                this.sportsmanId = '';
                this.$store.commit('clearSportsmanModel');
            },
            closeAndUpdate() {
                this.modalShow = false;
                this.sportsmanId = '';
                this.$store.commit('clearSportsmanModel');
                axios.get(`http://champion-api.herokuapp.com/api/sportsman-list/by-coach/${this.coach_id}`)
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
                        .post(`https://champion-api.herokuapp.com/api/sportsman/${id}`, {
                            _method: "delete"
                        })
                        .then(response => console.log(response));
                });
                this.$store.commit('removeSportsman');
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