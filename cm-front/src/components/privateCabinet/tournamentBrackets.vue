<template>
    <div>
        <div class='row' v-if="tournamentIsFinished">
           <div class='winners-wrapper'>
                <h3>Winners</h3>
                <div class='winners'>
                    <div class='awardee' v-if="winners.first">
                       <h4>1st place</h4>
                        <img src='../../assets/345x345_26.jpg' alt='first place' class='user-avatar'>
                        <p class='awardee-fullname'>{{ winners.first }}</p>
                    </div>
                    <div class='awardee' v-if="winners.second">
                       <h4>2nd place</h4>
                        <img src='../../assets/345x345_26.jpg' alt='second place' class='user-avatar'>
                        <p class='awardee-fullname'>{{ winners.second }}</p>
                    </div>
                    <div class='awardee' v-if="winners.third">
                        <h4>3rd place</h4>
                        <img src='../../assets/345x345_26.jpg' alt='third place' class='user-avatar'>
                        <p class='awardee-fullname'>{{ winners.third }}</p>
                    </div>
                </div>
           </div>
        </div>

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
                    <p class="card-title"><{{weightCategory.weight}}</p>
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
                    <p class="card-title"><{{weightCategory.weight}}</p>
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
                    v-bind:active-weight-category="activeWeightCategory"
                    v-bind:tournament-is-finished="tournamentIsFinished">
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
        props: ['tournamentKey', 'federationId', 'tournament', 'tournamentIsFinished'],
        data: function () {
            return {
                winners: {first: "", second: "", third: ""},
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
        mounted() {
            
            this.updateWinners();
        },
        methods: {
            activateCategory(key) {
                this.activeCategory = key;
                this.activeGenderCategory = 'male';
                this.activeWeightCategory = 0;
                this.activeWeightMaleCategory = 0;
                this.activeWeightFemaleCategory = '';
                this.updateWinners();
            },
            activateWeightMaleCategory(key) {
                this.activeWeightMaleCategory = key;
                this.activeWeightFemaleCategory = '';
                this.activeWeightCategory = this.activeWeightMaleCategory;
                this.activeGenderCategory = 'male';
                this.updateWinners();
            },
            activateWeightFemaleCategory(key) {
                this.activeWeightFemaleCategory = key;
                this.activeWeightMaleCategory = '';
                this.activeGenderCategory = 'female';
                this.activeWeightCategory = this.activeWeightFemaleCategory;
                this.updateWinners();
            },
            updateWinners() {
                this.winners.first = "";
                this.winners.second = "";
                this.winners.third = "";
                let maleOrFemale = (this.activeGenderCategory == 'male') ? this.activeWeightMaleCategory : this.activeWeightFemaleCategory;
                let presentBracket = this.$store.state.tournamentsList[this.tournamentKey].categories[this.activeCategory][this.activeGenderCategory][maleOrFemale].bracket;
                if (presentBracket) {
                    this.winners.first = presentBracket[presentBracket.length - 1][0].winner.fullname;
                    if (presentBracket[presentBracket.length - 1][0].winner.fullname) {
                        this.winners.second = presentBracket[presentBracket.length - 1][0].winner.fullname ===  presentBracket[presentBracket.length - 1][0].fighter1.fullname ?
                            presentBracket[presentBracket.length - 1][0].fighter2.fullname : presentBracket[presentBracket.length - 1][0].fighter1.fullname;
                    }
                    
                    if (presentBracket.length > 1) { this.winners.third = presentBracket[presentBracket.length - 2][0].winner.fullname; }     
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
