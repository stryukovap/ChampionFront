<template>
    <div>
        <div class="row" style="margin-top: -30px;">
            <div v-for="(category, key) in tournament.categories"
                 @click="activateCategory(key)"
                 class="card border-success mb-3 ml-4"
                 v-bind:class="{ 'text-white': activeCategory === key, 'bg-success': activeCategory === key }"
                 style="cursor: pointer; height: 100px;">
                <div class="card-header bg-transparent"
                     v-bind:class="{ 'border-success': activeCategory !== key }"
                     style="padding: 0.5rem 0.7rem;">
                    {{category.ageFrom}} - {{category.ageTo}}</div>
                <div class="card-body"
                     v-bind:class="{ 'text-success': activeCategory !== key }">
                    <h5 class="card-title">{{category.name}}</h5>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div v-if="tournament.categories[activeCategory].hasOwnProperty('male')" class="col-12 text-center">
                <h3>Male</h3>
            </div>
            <div v-for="(weightCategory, weightKey) in tournament.categories[activeCategory].male"
                 @click="activateWeightMaleCategory(weightKey)"
                 class="card border-success mb-3 ml-4"
                 v-bind:class="{ 'text-white': activeWeightMaleCategory === weightKey,
                                         'bg-success': activeWeightMaleCategory === weightKey }"
                 style="cursor: pointer; height: 90px;">
                <div class="card-header bg-transparent"
                     v-bind:class="{ 'border-success': activeWeightMaleCategory !== weightKey,
                                            'text-success': activeWeightMaleCategory !== weightKey}"
                     style="padding: 0.5rem 0.7rem;">
                    <h3 v-if="'sportsmen' in weightCategory">{{weightCategory.sportsmen.length}}</h3>
                    <h3 v-else>0</h3>
                </div>
                <div class="card-body" style="padding: 0.5rem 1rem;">
                    <p class="card-title">-{{weightCategory.weight}}</p>
                </div>
            </div>
            <div v-if="tournament.categories[activeCategory].hasOwnProperty('female')" class="col-12 text-center">
                <h3>Female</h3>
            </div>
            <div v-for="(weightCategory, weightKey) in tournament.categories[activeCategory].female"
                 @click="activateWeightFemaleCategory(weightKey)"
                 class="card border-success mb-3 ml-4"
                 v-bind:class="{ 'text-white': activeWeightFemaleCategory === weightKey,
                                         'bg-success': activeWeightFemaleCategory === weightKey }"
                 style="cursor: pointer; height: 90px;">
                <div class="card-header bg-transparent"
                     v-bind:class="{ 'border-success': activeWeightFemaleCategory !== weightKey,
                                            'text-success': activeWeightFemaleCategory !== weightKey}"
                     style="padding: 0.5rem 0.7rem;">
                    <h3 v-if="'sportsmen' in weightCategory">{{weightCategory.sportsmen.length}}</h3>
                    <h3 v-else>0</h3>
                </div>
                <div class="card-body" style="padding: 0.5rem 1rem;">
                    <p class="card-title">-{{weightCategory.weight}}</p>
                </div>
            </div>
        </div>
        <hr>
        <div v-if="activeGenderCategory in tournament.categories[activeCategory] &&
                   activeWeightCategory in tournament.categories[activeCategory][activeGenderCategory]"
             class="row mt-4">
            <div class="col-sm-8 col-md-10 col-lg-11">
                <nav class="navbar navbar-light">
                    <form class="form-inline">
                        <input
                                class="form-control mr-sm-2"
                                type="search"
                                placeholder="Search participant"
                                aria-label="Search">
                    </form>
                </nav>
            </div>
            <div class="col-1">
                <button type="button"
                        @click.prevent="addSportsmen"
                        :disabled="tournament.isStarted == 1"
                        class="btn btn-success">Add</button>
            </div>
        </div>

        <div class="row ml-2" v-if="activeGenderCategory in tournament.categories[activeCategory] &&
         'sportsmen' in tournament.categories[activeCategory][activeGenderCategory][activeWeightCategory]">
            <table class="table table-hover table-sm">
                <tbody>
                <tr class="row"
                    v-for="(item, key) in tournament.categories[activeCategory][activeGenderCategory][activeWeightCategory].sportsmen"
                >
                    <td class="col-2 text-left">{{item.sportsman.first_name}} {{item.sportsman.last_name}}</td>
                    <td class="col-1 text-left">{{item.sportsman.gender}}</td>
                    <td class="col-2 text-left">{{item.sportsman.date_of_birth}}</td>
                    <td class="col-2 text-left">
                        <input class="form-control form-control-sm" v-model="item.sportsman.weight">
                    </td>
                    <td class="col-sm-3 col-md-3 col-lg-4 text-right">
                        <button type="button"
                                v-if="item.isPermit === false"
                                class="btn btn-outline-success btn-sm"
                                @click.prevent="permitParticipation(item, key)"
                                :disabled="tournament.isStarted == 1">Submit</button>
                    </td>
                    <td class="col-1 text-left">
                        <button type="button"
                                class="btn btn-outline-success btn-sm"
                                @click.prevent="removeSportsman(key)"
                                :disabled="tournament.isStarted == 1">Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <add-sportsmen-popup
                v-if="sportsmenAddListShow"
                v-bind:tournament-key="tournamentKey"
                v-bind:federation-id="federationId"
                v-bind:active-category="activeCategory"
                v-bind:active-gender-category="activeGenderCategory"
                v-bind:active-weight-category="activeWeightCategory"
                @click.prevent="closeModal"
                @clicked="closeAndUpdate">
        </add-sportsmen-popup>
    </div>
</template>

<script>
    import axios from "axios";
    import * as firebase from 'firebase';
    import AddSportsmenPopup from './tournamentAddSportsmanPopup';

    export default {
        name: "tournament-participants",
        components: {
            AddSportsmenPopup
        },
        props: ['tournamentKey', 'federationId'],
        data: function () {
            return {
                sportsmenAddListShow: false,
                activeCategory: 0,
                activeGenderCategory: 'male',
                activeWeightCategory: 0,
                activeWeightMaleCategory: 0,
                activeWeightFemaleCategory: '',
                http: axios.create({
                    headers: { Authorization: "Bearer " + this.$store.state.authUser.auth_token}
                })
            }
        },
        beforeMount() {
            this.tournament = this.$store.state.tournamentsList[this.tournamentKey];
        },
        methods: {
            activateCategory(key) {
                this.activeCategory = key;
                this.activeGenderCategory = 'male';
                this.activeWeightCategory = 0;
                this.activeWeightMaleCategory = 0;
                this.activeWeightFemaleCategory = '';

            },
            activateWeightMaleCategory(key) {
                this.activeWeightMaleCategory = key;
                this.activeWeightFemaleCategory = '';
                this.activeWeightCategory = this.activeWeightMaleCategory;
                this.activeGenderCategory = 'male';
            },
            activateWeightFemaleCategory(key) {
                this.activeWeightFemaleCategory = key;
                this.activeWeightMaleCategory = '';
                this.activeGenderCategory = 'female';
                this.activeWeightCategory = this.activeWeightFemaleCategory;
            },
            addSportsmen() {
                this.sportsmenAddListShow = true;
            },
            closeModal() {
                this.sportsmenAddListShow = false;
            },
            async closeAndUpdate() {
                this.sportsmenAddListShow = false;
                try {
                    const fbObj = await firebase.database().ref(this.federationId).once('value');
                    this.$store.commit('setTournamentsList', fbObj.val());
                } catch (error) {
                    throw error;
                }
                this.tournament = this.$store.state.tournamentsList[this.tournamentKey];
            },
            async permitParticipation(item, key) {
                item.isPermit = true;
                try {
                    await firebase
                        .database()
                        .ref(this.federationId)
                        .child(this.tournamentKey)
                        .child('categories')
                        .child(this.activeCategory)
                        .child(this.activeGenderCategory)
                        .child(this.activeWeightCategory)
                        .child('sportsmen')
                        .child(key)
                        .update(item);
                } catch (error) {
                    throw error;
                }
                item.sportsman._method = "put";
                this.http.post(`https://champion-api.herokuapp.com/api/sportsman/${item.sportsman.id}`,
                    item.sportsman)
                    .catch(error => console.log(error.message));
            },
            async removeSportsman(key) {
                this.tournament.categories[this.activeCategory][this.activeGenderCategory][this.activeWeightCategory].sportsmen.splice(key, 1);
                try {
                    await firebase
                        .database()
                        .ref(this.federationId)
                        .child(this.tournamentKey)
                        .child('categories')
                        .child(this.activeCategory)
                        .child(this.activeGenderCategory)
                        .child(this.activeWeightCategory)
                        .update({sportsmen: this.tournament.categories[this.activeCategory][this.activeGenderCategory][this.activeWeightCategory].sportsmen});
                } catch (error) {
                    throw error;
                }
                try {
                    const fbObj = await firebase.database().ref(this.federationId).once('value');
                    this.$store.commit('setTournamentsList', fbObj.val());
                } catch (error) {
                    throw error;
                }
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