<template>
    <div class='bracket'>
        <div class = 'bracket-wrapper'>
            <div class='round'
                 v-for = '(round, index) in bracket'
                 :key = 'round.index'
                 v-bind:class='`round-${index}`'
                 v-bind:title="index">
                <p class='round-name'>Раунд {{ index+1 }}</p>
                <div class = 'game'
                     v-for = '(fight, index) in round'
                     :key = 'fight.index'>
                    <div class = 'player'>{{ fight.fighter1.fullname ? fight.fighter1.fullname : fight.fighter1 }}</div>
                    <div>
                        <form>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" v-bind:name="index" id="inlineRadio1" v-bind:value="fight.fighter1">
                                <label class="form-check-label" for="inlineRadio1">1</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" v-bind:name="index" id="inlineRadio2" v-bind:value="fight.fighter2">
                                <label class="form-check-label" for="inlineRadio2">2</label>
                            </div>
                            <button v-on:click.prevent="submitWinner" type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div class = 'player'>{{ fight.fighter2.fullname ? fight.fighter2.fullname : fight.fighter2 }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as firebase from 'firebase';
    import Result from './result';
    import bracketModule from './bracketModule'

    export default {
        name: 'tour-brack',
        components: {
            Result        
        },
        data() {
            return {
                bracketNew: []
            }
        },
        mixins: [bracketModule],
        props: ['federationId', 'tournamentKey', 'activeCategory', 'activeGenderCategory', 'activeWeightCategory'],
        computed: {
            bracket: {
                get: function () {
                    return this.$store.state.tournamentsList[this.tournamentKey]
                        .categories[this.activeCategory][this.activeGenderCategory][this.activeWeightCategory].bracket;
                    },
                set: function () {
                    return this.bracketNew;
                }
            }
        },
        methods: {
            submitWinner(e) {
                let winner = {};
                let fightNumber = 0;
                let roundNumber = 0;
                if(e.target.parentNode[0].checked) {
                    winner = e.target.parentNode[0]["_value"];
                    roundNumber = Number(e.target.parentNode.parentNode.parentNode.parentNode.title);
                    fightNumber = Number(e.target.parentElement[0].name);
                } else if(e.target.parentNode[1].checked) {
                    winner = e.target.parentNode[1]["_value"];
                    roundNumber =  Number(e.target.parentNode.parentNode.parentNode.parentNode.title);
                    fightNumber = Number(e.target.parentElement[1].name);
                } else {
                    return;
                }

                this.bracketNew = this.isWinner(this.bracket, roundNumber, fightNumber, winner);
                this.updateBracket();
                window.console.log("after", this.bracket);
            },
            async updateBracket() {
                try{
                    await firebase
                        .database()
                        .ref(this.federationId)
                        .child(this.tournamentKey)
                        .child("categories")
                        .child(this.activeCategory)
                        .child(this.activeGenderCategory)
                        .child(this.activeWeightCategory)
                        .update({ bracket: this.bracket});
                } catch (error) {
                    throw error;
                }
                this.updateTournaments();
            },
            async updateTournaments() {
                try {
                    const fbObj = await firebase
                        .database()
                        .ref(this.federationId)
                        .once('value');
                    this.$store.commit('setTournamentsList', fbObj.val());
                    console.log(fbObj.val());
                } catch (error) {
                    throw error;
                }
            }

        }

    }
</script>

<style lang="scss">
.bracket {
    display    : flex;
    overflow-x : auto;
}

.bracket-wrapper {
    position : relative;
    display    : flex;

    }

.round {
    display         : flex;
    flex-direction  : column;
    justify-content : space-around;
    margin-top : 30px;
    margin-right : 30px;
    }

.last-round {
    justify-content: center;
    }

.round-name {
    position : absolute;
    top : 0;
    text-align: center;
    width : 200px;
    margin-left : 10px;
    background-color : #ccc;
    border-radius: 5px;
    }

.third-place,
.final {
    position : static;
    margin-top : 50px;
    }

.game {
    width       : 200px;
    border      : 2px solid #5CB85C;
    border-radius: 10px ;
    line-height : 2em;
    text-align  : center;
    padding     : 0 10px;
    margin      : 10px;
    position    : relative;
    }

.game::after {
    display          : block;
    content          : '';
    position         : absolute;
    right            : -52px;
    top              : 50%;
    background-color : #5CB85C;
    width            : 51px;
    height           : 3px;
    transform-origin : 0 0;
    }

.game:nth-of-type(odd)::after {
    transform : skewY(38deg);
    }

.game:nth-of-type(even)::after {
    transform : skewY(-38deg);
    }

.round:nth-child(2) .game:nth-of-type(odd)::after {
    transform : skewY(59deg)
    }

.round:nth-child(2) .game:nth-of-type(even)::after {
    transform : skewY(-59deg)
    }

.round:nth-child(3) .game:nth-of-type(odd)::after {
    transform : skewY(73.5deg)
    }

.round:nth-child(3) .game:nth-of-type(even)::after {
    transform : skewY(-73.5deg)
    }

.round:nth-child(4) .game:nth-of-type(odd)::after {
    transform : skewY(81.8deg)
    }

.round:nth-child(4) .game:nth-of-type(even)::after {
    transform : skewY(-81.8deg)
    }

.round:nth-child(5) .game:nth-of-type(odd)::after {
    transform : skewY(85.8deg)
    }

.round:nth-child(5) .game:nth-of-type(even)::after {
    transform : skewY(-85.8deg)
    }

.round:nth-last-child(1) .game::after,
.round:nth-last-child(2) .game::after{
display : none;
    }

.player {
    height : 2em;
    overflow: hidden;
    }

.player:nth-of-type(odd) {
    border-bottom: 1px solid #5CB85C;
    }

.fighter1,
.fighter2 {
    background-color : #5CB85C;
    }
</style>
