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
        <div class="row ml-2" v-if="activeGenderCategory in tournament.categories[activeCategory] &&
         'bracket' in tournament.categories[activeCategory][activeGenderCategory][activeWeightCategory]">
            <tour-bracket
                    v-bind:federation-id="federationId"
                    v-bind:tournament-key="tournamentKey"
                    v-bind:active-category="activeCategory"
                    v-bind:active-gender-category="activeGenderCategory"
                    v-bind:active-weight-category="activeWeightCategory">
            </tour-bracket>
        </div>
    </div>
</template>

<script>
    import * as firebase from 'firebase';
    import tourBracket from './tourBrack'
    export default {
        name: "tournament-brackets",
        components: {
            tourBracket
        },
        props: ['tournamentKey', 'federationId', 'tournament'],
        data: function () {
            return {
                activeCategory: 0,
                activeGenderCategory: 'male',
                activeWeightCategory: 0,
                activeWeightMaleCategory: 0,
                activeWeightFemaleCategory: '',
            }
        },
        beforeMount() {
            // this.tournament = this.$store.state.tournamentsList[this.tournamentKey];
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
