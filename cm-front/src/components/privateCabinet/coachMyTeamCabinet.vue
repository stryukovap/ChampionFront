<template>
    <div>
        <div class="row mt-2">
            <div class="col-2">
                <h2>My team</h2>
            </div>
            <div class="col-4">
                <b-dropdown variant="outline-success" right text="Action">
                    <b-dropdown-item @click="buySubscription">Buy Sudscription</b-dropdown-item>
                    <b-dropdown-item @click="deleteSportsman">Delete</b-dropdown-item>
                </b-dropdown>
            </div>
            <div class="col-4">
                <nav class="navbar navbar-light">
                    <form class="form-inline">
                        <input
                                class="form-control mr-sm-2"
                                type="search"
                                v-model="searchingSportsman"
                                placeholder="Enter name"
                                aria-label="Search">
                    </form>
                </nav>
            </div>
            <div class="col-2">
                <button type="button" @click="modalShow = true" class="btn btn-outline-success">Create</button>
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
                <tr v-for="item in $store.state.sportsmanList"
                    v-if="item.first_name.toLowerCase().includes(searchingSportsman.toLowerCase()) ||
                         item.last_name.toLowerCase().includes(searchingSportsman.toLowerCase())">
                    <td>
                        <input type="checkbox"
                               v-model="$store.state.selectedSportsmen"
                               @click="selectSportsman"
                               :value="item.id">
                    </td>
                    <td>{{item.first_name}} {{item.last_name}}</td>
                    <!--<td>{{item.federation_sportsmen[0].is_active ? 'Yes': 'No'}}</td>-->
                    <td>Yes</td>
                    <td>{{item.date_of_birth}}</td>
                    <th>
                        <button @click.prevent="editSportsman(item.id)" class="btn btn-outline-success btn-sm">
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
                searchingSportsman: '',
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
            axios.get(`https://champion-api.herokuapp.com/api/sportsman-list/by-coach/${this.coach_id}`)
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
                axios.get(`https://champion-api.herokuapp.com/api/sportsman-list/by-coach/${this.coach_id}`)
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

    @media screen and (min-width: 120px) and (max-width: 320px) {
        .navbar-light {
            margin-top: -8px;
            margin-left: -34px;
        }
        .btn-outline-success {
            margin-left: -46px;
        }
        .h2 {
            margin-top: 45px;
        }
        .btn-group > .btn:first-child {
            margin-left: -75px;
            margin-top: 85px;
        }
        .form-control {
            display: block;
            width: 100%;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            margin-left: -19px;
            margin-top: 85px;
        }

        .btn:not(:disabled):not(.disabled) {
            cursor: pointer;
            margin-top: 85px;
        }
    }

    @media screen and (min-width: 320px) and (max-width: 576px) {
        .navbar-light {
            margin-top: -8px;
            margin-left: -34px;
        }
        .btn-outline-success {
            margin-left: -46px;
        }
        .h2 {
            margin-top: 45px;
        }
        .btn-group > .btn:first-child {
            margin-left: -75px;
            margin-top: 85px;
        }
        .form-control {
            display: block;
            width: 100%;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            margin-left: -19px;
            margin-top: 85px;
        }

        .btn:not(:disabled):not(.disabled) {
            cursor: pointer;
            margin-top: 85px;
        }
    }

    @media screen and (min-width: 576px) and (max-width: 992px) {
        .navbar-light {
            margin-top: -8px;
            margin-left: -34px;
        }
        .btn-outline-success {
            margin-left: -46px;
        }
        .h2 {
            margin-top: 45px;
        }
        .btn-group > .btn:first-child {
            margin-left: -75px;
            margin-top: 85px;
        }
        .form-control {
            display: block;
            width: 100%;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            margin-left: -19px;
            margin-top: 85px;
        }

        .btn:not(:disabled):not(.disabled) {
            cursor: pointer;
            margin-top: 85px;
        }
    }

</style>