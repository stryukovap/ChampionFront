<template>
    <div class="popup">
        <div class="popup__inner">
            <form class="popup__tournament container text-center mt-5">
                <div class="popup__title-wrapper row">
                    <h2 class="popup__title col text-left">Create a New Tournament</h2>
                    <button class="popup__exit btn btn-danger"
                            v-on="$listeners">X
                    </button>
                </div>
                <div class="popup__title-wrapper row">
                    <h3 class="popup__title col text-left">General Info</h3>
                </div>
                <div class="cm-form__wrapper popup__wrapper row">
                    <div class="col-2"><label for="name">Name</label></div>
                    <div class="col-10">
                        <input class="form-control" type="text" id="name"
                               placeholder="Name"
                               autofocus
                               autocomplete="off"
                               v-model="tournament.name">
                    </div>
                </div>
                <div class="cm-form__wrapper row">
                    <div class="col-2"><span>Description</span></div>
                    <div class="col-10">
                    <textarea class="form-control"
                              placeholder="Description"
                              autocomplete="off"
                              v-model="tournament.description"></textarea>
                    </div>
                </div>
                <div class="popup__wrapper mt-1 row">
                    <div class="col-2 text-left"><span>Banners</span></div>
                    <div class="col-10" style="display: flex; flex-direction: column; align-items: center;">
                        <img src="../../assets/github-mark_560x560.png" width="150px" height="150px"
                             alt="sportsman foto"
                             class="popup__foto">
                        <label class="mt-3" for="foto" style="cursor: pointer">Upload new foto</label>
                        <input type="file" name="foto" id="foto" style="display: none">
                    </div>
                </div>
                <div class="cm-form__wrapper">
                    <div class="row align-items-end">
                        <div class="col align-self-center">
                            <label class="cm-form__label" for="dateStart">Dates</label>
                        </div>
                        <div class="col">
                            <span>From </span>
                            <input class="form-control" type="date" name="dateStart" id="dateStart"
                                   title="Date of Start"
                                   v-model="tournament.dates.dateStart">
                        </div>
                        <div class="col">
                            <span>To </span>
                            <input class="form-control" type="date" name="dateEnd" id="dateEnd"
                                   title="Date of End"
                                   v-model="tournament.dates.dateEnd">
                        </div>
                    </div>
                </div>
                <div class="cm-form__wrapper popup__wrapper row">
                    <div class="col-2"><label for="quantityRings">Quantity Rings</label></div>
                    <div class="col-10">
                        <input class="form-control" type="text" id="quantityRings"
                               placeholder="Quantity Rings"
                               autocomplete="off"
                               v-model="tournament.quantityRings">
                    </div>
                </div>
                <div class="cm-form__wrapper popup__wrapper row">
                    <div class="col-2"><label for="location">Location</label></div>
                    <div class="col-10">
                        <input class="form-control" type="text" id="location"
                               placeholder="Location"
                               autocomplete="off"
                               v-model="tournament.location">
                    </div>
                </div>
                <div class="popup__title-wrapper row mt-3">
                    <h3 class="popup__title col-8 text-left">Categories</h3>
                    <div class="col-4 text-right">
                        <button class="btn btn-outline-success" @click.prevent="addNewCategory"
                        >New category</button>
                    </div>
                </div>
                <div class="popup__title-wrapper container" style="display: flex;">
                    <table class="cat">
                        <tr class="cat__row"
                            v-for="(category, key) in tournament.categories">
                            <td class="cat__name-label"><span style="margin-right: 5px">Category</span></td>
                            <td class="category__name">
                                <input class="form-control" type="text" id="catName"
                                       placeholder="Name"
                                       autocomplete="off"
                                       v-model="category.name">
                            </td>
                            <td class="cat__age-label"><span class="mr-1 ml-2">Age</span></td>
                            <td class="cat__age-label">
                                <label class="ml-3 mt-1" for="catAgeFrom">from</label>
                                <label class="ml-3" for="catAgeTo">to</label>
                            </td>
                            <td class="category__name">
                                <input class="form-control form-control-sm ml-2" id="catAgeFrom"
                                       type="text"
                                       placeholder="year"
                                       autocomplete="off"
                                       v-model="category.ageFrom">
                                <input class="form-control form-control-sm ml-2 mt-1" id="catAgeTo"
                                       type="text"
                                       placeholder="year"
                                       autocomplete="off"
                                       v-model="category.ageTo">
                            </td>
                            <td class="cat__gender text-left" width="110px">
                                <div class="col">
                                    <input type="radio" name="gender" id="male"
                                           checked
                                           v-model="category.gender"
                                           value="M">
                                    <label style="margin-left: 5px" for="male"> Male</label>
                                </div>
                                <div class="col">
                                    <input type="radio" name="gender" id="female"
                                           v-model="category.gender"
                                           value="F">
                                    <label style="margin-left: 5px" for="female"> Female</label>
                                </div>
                            </td>
                            <td class="cat__weight">
                                <span class="mr-1">Weight</span>
                            </td>
                            <td class="cat__WeightNum" width="80px">
                                <input class="form-control" type="text" id="weight"
                                       placeholder="weight"
                                       autocomplete="off"
                                       v-model="category.weight">
                            </td>
                            <td class="cat__add">
                                <button class="btn btn-outline-danger ml-2"
                                        @click.prevent="removeCategory(key)"><b>X</b></button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="popup__title-wrapper row mt-3">
                    <h3 class="popup__title col text-left">Referees</h3>
                    <multiselect
                            id="sportsman"
                            v-model="value"
                            :options="options"
                            :multiple="true"
                            :close-on-select="true"
                            :clear-on-select="false"
                            :hide-selected="true"
                            :preserve-search="true"
                            placeholder="Choose referee"
                            label="last_name"
                            track-by="id"
                            :preselect-first="true">
                        <template slot="tag" slot-scope="props">
                                <span class="custom__tag">
                                    <!-- option === coach -->
                                    <span>{{ props.option.first_name }} {{ props.option.last_name }}</span>
                                    <span class="custom__remove" @click="props.remove(props.option)">❌</span>
                                </span>
                        </template>
                    </multiselect>
                </div>
                <div class="row text-right">
                    <div class="col-12 text-right mb-5">
                        <button v-if="tournamentKey" class="popup__save btn btn-success mt-3"
                                style="margin-right: 10px;"
                                @click.prevent="saveTournament">Save tournament
                        </button>
                        <button v-else class="popup__save btn btn-success mt-3"
                                style="margin-right: 10px;"
                                @click.prevent="createTournament">Create tournament
                        </button>
                        <button class="popup__save btn btn-success mt-3"
                                v-on="$listeners">Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import * as firebase from 'firebase';
    import Multiselect from 'vue-multiselect';
    export default {
        name: 'tournament-create',
        components: {
            Multiselect
        },
        props: ['tournamentKey'],
        data: function() {
            return {
                federationId: `federation${this.$store.state.federationId}`,
                tournament: {
                    id: '',
                    name: '',
                    description: '',
                    banners: [],
                    dates: {
                        dateStart: '',
                        dateEnd: ''
                    },
                    quantityRings: '',
                    location: '',
                    categories: [
                        {
                            name: '',
                            ageFrom: '',
                            ageTo: '',
                            gender: '',
                            weight: ''
                        }
                    ],
                    referees: []
                },
                options : [],
                value: [],
            }
        },
        mounted() {
            if (this.tournamentKey) {
                this.tournament = this.$store.state.tournamentsList[this.tournamentKey];
                this.value = this.$store.state.tournamentsList[this.tournamentKey].referees;
            };
            axios.get('https://champion-api.herokuapp.com/api/sportsman/list')
                .then(response => {
                    if ( response.status === 200 ) {
                        this.options = response.data;
                    }
                })
                .catch(error => window.console.log(error));
        },
        methods: {
            addNewCategory() {
                this.tournament.categories.push({
                    name: '',
                    ageFrom: '',
                    ageTo: '',
                    gender: '',
                    weight: ''
                });
            },
            removeCategory(key) {
                this.tournament.categories.splice(key, 1);
            },
            async createTournament() {
                this.tournament.id = this.$store.state.federationId + this.tournament.name;
                this.tournament.referees = this.value;
                try {
                    await firebase.database().ref(this.federationId).push(this.tournament)
                        .then(console.log('success'));

                } catch (error) {
                    throw error;
                }
                this.$emit('clicked');
            },
            async saveTournament() {
                this.tournament.referees = this.value;
                try {
                    await firebase
                        .database()
                        .ref(this.federationId)
                        .child(this.tournamentKey)
                        .update(this.tournament);
                } catch (error) {
                    throw error;
                }
                this.$emit('clicked');
            }
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
    .popup {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        width: 100vw;
        height: 100vh;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .80);
        z-index: 2;
        overflow: hidden;
        transition: .64s ease-in-out;
        &__inner {
            position: relative;
            display: flex;
            align-items: center;
            max-width: 800px;
            max-height: 600px;
            width: 80%;
            height: 80%;
            background-color: #fff;
            transition: .64s ease-in-out;
            overflow-y: auto;
        }
        &__tournament {
            flex-direction: column;
            justify-content: center;
            width: 90%;
            height: 90%;
            padding: 1rem;
        }
    }

    .cat__row {
        border-bottom: 1px solid #dee2e6;
        height: 100px;
    }

    .custom__tag {
        display: inline-block;
        padding: 3px 12px;
        background: #d2d7ff;
        margin-right: 8px;
        margin-bottom: 8px;
        border-radius: 10px;
        cursor: pointer;
    }
    .custom__remove {
        padding: 0;
        font-size: 10px;
        margin-left: 5px;
    }
</style>
