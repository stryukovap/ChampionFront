<template>
        <div>
        <div class = 'bracket'
             v-for='bracket in tournament.categories[activeCategory][activeGenderCategory][activeWeightCategory].bracket'
             :key = 'bracket.index'
        >
            <div class='round'
                 v-for = 'round in bracket'
                 :key = 'round.index'
            >
                 <div class = 'game'
                      v-for = 'game in round'
                      :key = 'game.index'
                 >
                        <span class = 'player'>{{ game.fighter1.fullName }}</span>
                        :
                        <span class = 'player'>{{ game.fighter2.fullName }}</span>
                        <!--<result></result>-->
                 </div>
            </div>
        </div>
    </div>
</template>

<script>
    import result from './tournamentFightResult.vue';


    export default {
        name : 'TournamentBracket',
        props: [
            'tournamentKey',
            'activeCategory',
            'activeGenderCategory',
            'activeWeightCategory',
            'activeWeightMaleCategory',
            'activeWeightFemaleCategory'
                ],
        components : {
            result,
            // bracketModule
        },
        data : function() {
            return {
                // tournament: {}
            };
        },
        beforeMount() {
            this.tournament = this.$store.state.tournamentsList[this.tournamentKey];

        },
        mounted() {
            // window.console.log(this.brackets);
        }
    };
</script>

<style scoped>
    .bracket {
        display : flex;
        }

    .round {
        display         : flex;
        flex-direction  : column;
        justify-content : space-around;
        }

    .game {
        width       : 150px;
        height      : 2em;
        border      : 1px solid black;
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
        right            : -20px;
        top              : 15px;
        background-color : #5CB85C;
        width            : 20px;
        height           : 5px;
        transform-origin : 0 0;
        }

    .game:nth-child(odd)::after {
        transform : skewY(45deg);
        }

    .game:nth-child(even)::after {
        transform : skewY(-45deg);
        }

    .round:nth-child(2) .game:nth-child(odd)::after {
        transform : skewY(65deg)
        }

    .round:nth-child(2) .game:nth-child(even)::after {
        transform : skewY(-65deg)
        }

    .round:nth-child(3) .game:nth-child(odd)::after {
        transform : skewY(78deg)
        }

    .round:nth-child(3) .game:nth-child(even)::after {
        transform : skewY(-78deg)
        }

    .round:last-child .game::after {
        display : none;
        }
</style>