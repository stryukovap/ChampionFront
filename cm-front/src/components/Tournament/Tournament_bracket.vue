<template>
<div class='bracket'
     v-for='(round) in ourBracket'
     :key='round.index'>
     <div class='round'
          v-for='(game) in round.index'
          :key='game.index'>
          <div class='game'>
            <span class = 'player'>{{ game.fighter1 }}</span>
            :
            <span class = 'player'>{{ game.fighter2 }}</span>
            <result></result>
          </div>
     </div>
></div>
</template>

<script>
    import ourBracket from "./createBracket.js";
    import result from "./result.vue";

    export default {
    name: 'Tournament_bracket',
    components : {
        result
    },
    data: function () {
        return {
            ourBracket: ourBracket
            }
        },
    }
</script>

<style scoped>
    .bracket {
        display: flex;
        }

    .round {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        }

    .game {
        width: 150px;
        height: 2em;
        border: 1px solid black;
        line-height: 2em;
        text-align: center;
        padding: 0 10px;
        margin: 10px;
        position: relative;
        }

    .game::after {
        display: block;
        content: '';
        position: absolute;
        right: -20px;
        top: 15px;
        background-color: #5cb85c;
        width: 20px;
        height: 5px;
        transform-origin: 0 0;
        }

    .game:nth-child(odd)::after {
        transform: skewY(45deg);
        }

    .game:nth-child(even)::after {
        transform: skewY(-45deg);
        }

    .round:nth-child(2) .game:nth-child(odd)::after {
        transform: skewY(65deg)
        }

    .round:nth-child(2) .game:nth-child(even)::after {
        transform: skewY(-65deg)
        }

    .round:nth-child(3) .game:nth-child(odd)::after {
        transform: skewY(78deg)
        }

    .round:nth-child(3) .game:nth-child(even)::after {
        transform: skewY(-78deg)
        }

    .round:last-child .game::after {
        display: none;
        }
</style>