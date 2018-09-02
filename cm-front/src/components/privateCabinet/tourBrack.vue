<template>
    <div class='bracket' v-on:click="showPopUp">
        <div class = 'bracket-wrapper' >
            <div class='round'
                 v-for = '(round, index) in bracket'
                 :key = 'round.index'
                 v-bind:class='`round-${index}`'
                 v-bind:title="index">
                <p class='round-name'>Раунд {{ index+1 }}</p>
                <div class = 'game'
                     v-for = '(fight, index) in round'
                     :key = 'fight.index'
                >
                    <div class = 'player'>{{ fight.fighter1.fullname ? fight.fighter1.fullname : fight.fighter1 }}</div>
                    <div class='result'>
                        <form class='game-info'>
                            <div class="form-check form-check-inline">
                                <div class='user-avatar'>
                                    <img src='https://via.placeholder.com/100' alt='user-avatar' width='100' height='100'>
                                </div>
                                <input class="form-check-input" type="radio" v-bind:name="index" id="inlineRadio1" v-bind:value="fight.fighter1">
                                <label class="form-check-label" for="inlineRadio1">{{ fight.fighter1.fullname }}</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <div class='user-avatar'>
                                    <img src='https://via.placeholder.com/100' alt='user-avatar' width='100' height='100'>
                                </div>
                                <input class="form-check-input" type="radio" v-bind:name="index" id="inlineRadio2" v-bind:value="fight.fighter2">
                                <label class="form-check-label" for="inlineRadio2">{{ fight.fighter2.fullname }}</label>
                            </div>
                            <button v-on:click.prevent="submitWinner" type="submit" class="btn btn-primary">Choose winner</button>
                        </form>
                    </div>
                    <div class = 'player'>{{ fight.fighter2.fullname ? fight.fighter2.fullname : fight.fighter2 }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Result from './result';
    import bracketModule from './bracketModule'

    export default {
        name: 'tour-brack',
        components: {
            Result        
        },
        mixins: [bracketModule],
        props: ['bracket'],
        data: function () {
            return {
                // test: this.$store.state.tournamentsList["-LJroEHi_YHVui6Cq_L6"]["categories"][1]["male"][0]["bracket"]
                // test: this.$store.state.tournamentsList["-LKGMyTA7ZUvgxaIm8Xa"]["categories"][0]["male"][0]["bracket"]
                // test: this.$store.state.tournamentsList["-LKvvKJ5RrEKM3bF6jMk"]["categories"][0]["male"][0]["bracket"]
                test: this.$store.state.tournamentsList["-LKvvKJ5RrEKM3bF6jMk"]["categories"][0]["male"][0]["bracket"]
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
                e.target.parentNode[0].setAttribute('disabled', 'disabled');
                e.target.parentNode[1].setAttribute('disabled', 'disabled');
                e.target.setAttribute('disabled', 'disabled');
                this.test = this.isWinner(this.test, roundNumber, fightNumber, winner);
                window.console.log("after", this.test);
            },

            showPopUp(e) {
                // console.log(e.target.className);
                document.querySelectorAll('.result').forEach(function(el) {el.classList.remove("open");});
                if(e.target.className == "player") {
                    console.log(e.target.className);
                    e.target.parentNode.querySelector('.result').classList.add("open");
                }
            }
        }

    }
</script>

<style lang="scss">
.result {
    display : none;
    box-sizing: border-box;
    position : absolute;
    top : -2px;
    left : -2px;
    width : 400px;
    /*border: 2px solid #5CB85C;*/
    /*border-radius: 5px;*/
    background-color : #5CB85C;
    z-index : 10;
    }

/*.game:hover .result {*/
    /*display : block;*/
    /*}*/
.open {
display : block;
}


.game-info {
    display : flex;
    flex-wrap: wrap;
    width : 100%;
    height : 200px;
    }

.game-info button {
    width : 100%;
    border-radius: 0;
    }

.user-avatar {
    margin : 10px auto;
    width : 100px;
    height : 100px;
    border-radius: 50%;
    background-color : blue;
    }

.form-check {
    display : flex;
    flex-direction : column;
    width : 50%;
    margin : 0;
    }

.bracket {
    display    : flex;
    overflow-x : auto;
    overflow-y: visible;
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

.player:nth-of-type(1) {
    border-bottom: 1px solid #5CB85C;
    }

.fighter1,
.fighter2 {
    background-color : #5CB85C;
    }
</style>
