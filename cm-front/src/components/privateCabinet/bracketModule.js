export default {

    methods: {
        createBracket(listOfPlayers) {
            listOfPlayers = this.processListOfPlayer(listOfPlayers);
            // var bracket = [];

            var numberOfRounds = Math.log2(listOfPlayers.length) + (
                ( listOfPlayers.length === 2 )
                    ? 0
                    : 1
            );
            for ( var i = 0; i < numberOfRounds; i++ ) {
                var round = [];
                var numberOfFightsInRound = Math.ceil(listOfPlayers.length / Math.pow(2, i + 1));
                for ( var j = 0; j < numberOfFightsInRound; j++ ) {
                    if ( i === 0 ) {
                        var f1 = listOfPlayers[ j * 2 ];
                        var f2 = listOfPlayers[ j * 2 + 1 ];
                    }
                    else {
                        var f1 = null;
                        var f2 = null;
                    }
                    var fight = {
                        fighter1 : f1,
                        fighter2 : f2,
                        winner : null
                    };
                    round.push(fight);
                }
                this.$store.state.bracket.push(round);
            }
            // return bracket;
        },
        processListOfPlayer(listOfPlayers) {
            // listOfPlayers = _.shuffle(listOfPlayers);   // uncomment to shuffle
            var neededLength = Math.pow(2, Math.ceil(Math.log2(listOfPlayers.length)));
            var numberOfDummies = neededLength - listOfPlayers.length;
            for ( var i = 0; i < numberOfDummies; i++ ) {
                if ( i % 2 === 0 ) {
                    listOfPlayers.splice(i, 0, null);
                }
                else {
                    listOfPlayers.splice(listOfPlayers.length - i, 0, null);
                }
            }
            return listOfPlayers;
        },
        isWinner(roundNumber, fightNumber, winner) {
            var curFight = ourBracket[ roundNumber ][ fightNumber ];
            curFight.winner = winner;
            if ( roundNumber >= ourBracket.length - 2 )
                return;
            var nextRound = this.getNextFight(roundNumber, fightNumber, 1);
            if ( roundNumber !== ourBracket.length - 3 ) {
                this.forwardFighterToNextRound(nextRound, winner, curFight);
            }
            else {
                var presentFight = ourBracket[ roundNumber ][ fightNumber ];
                var looser = this.getLooser(presentFight);
                var afterNextRound = this.getNextFight(roundNumber, fightNumber, 2);
                this.forwardFighterToNextRound(nextRound, looser, curFight);
                this.forwardFighterToNextRound(afterNextRound, winner, curFight);
            }
        },

        forwardFighterToNextRound(nextFight, fighter, curFight) {
            if ( !nextFight.fighter1 ) {
                nextFight.fighter1 = fighter;
                nextFight.prevFight1 = curFight;
            }
            else {
                nextFight.fighter2 = fighter;
                nextFight.prevFight2 = curFight;
            }
            curFight.nextFight = nextFight;
        },

        getNextFight(roundNumber, fightNumber, step) {
            var nextFightNumber = Math.ceil(( fightNumber + 1 ) / 2) - 1;
            return ourBracket[ roundNumber + step ][ nextFightNumber ];
        },

        getLooser(figth) {
            return ( figth.fighter1 === figth.winner ) ? figth.fighter2 : figth.fighter1;
        }

    }
}