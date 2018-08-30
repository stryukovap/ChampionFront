export default {
  methods: {
    createBracket(receivedListOfPlayers) {
      if (receivedListOfPlayers.length === 1) {
        return [
          [
            {
              fighter1: receivedListOfPlayers[0],
              fighter2: null,
              winner: receivedListOfPlayers[0]
            }
          ]
        ];
      }
      var listOfPlayers = this.processListOfPlayer(receivedListOfPlayers);
      var bracket = [];
      var numberOfRounds =
        Math.log2(listOfPlayers.length) + (listOfPlayers.length === 2 ? 0 : 1);
      for (var i = 0; i < numberOfRounds; i++) {
        var round = [];
        var numberOfFightsInRound = Math.ceil(
          listOfPlayers.length / Math.pow(2, i + 1)
        );
        for (var j = 0; j < numberOfFightsInRound; j++) {
          if (i === 0) {
            var f1 = listOfPlayers[j * 2];
            var f2 = listOfPlayers[j * 2 + 1];
          } else {
            var f1 = "empty";
            var f2 = "empty";
          }
          var fight = {
            fighter1: f1,
            fighter2: f2,
            winner: "empty"
          };
          round.push(fight);
        }
        bracket.push(round);
      }
      return bracket;
    },

    processListOfPlayer(receivedListOfPlayers) {
      var listOfPlayers = receivedListOfPlayers.slice();
      var length = listOfPlayers.length;
      var neededLength = Math.pow(2, Math.ceil(Math.log2(length)));
      var numberOfDummies = neededLength - length;
      for (var i = 0; i < numberOfDummies; i++) {
        if (i % 2 === 0) {
          listOfPlayers.splice(i, 0, "empty");
        } else {
          listOfPlayers.splice(listOfPlayers.length - i, 0, "empty");
        }
      }
      return listOfPlayers;
    },

    isWinner(bracket, roundNumber, fightNumber, winner) {
      var ourBracket = bracket.slice();
      ourBracket[roundNumber][fightNumber].winner = winner;
      if (roundNumber >= ourBracket.length - 2) return;
      var nextRound = this.getNextFight(
        ourBracket,
        roundNumber,
        fightNumber,
        1
      );
      if (roundNumber !== ourBracket.length - 3) {
        this.forwardFighterToNextRound(nextRound, winner);
      } else {
        var presentFight = ourBracket[roundNumber][fightNumber];
        var looser = this.getLooser(presentFight);
        var afterNextRound = this.getNextFight(
          ourBracket,
          roundNumber,
          fightNumber,
          2
        );
        this.forwardFighterToNextRound(nextRound, looser);
        this.forwardFighterToNextRound(afterNextRound, winner);
      }
      return ourBracket;
    },

    forwardFighterToNextRound(nextFight, fighter) {
      if (nextFight.fighter1 === "empty") {
        nextFight.fighter1 = fighter;
      } else {
        nextFight.fighter2 = fighter;
      }
    },

    getNextFight(ourBracket, roundNumber, fightNumber, step) {
      var nextFightNumber = Math.ceil((fightNumber + 1) / 2) - 1;
      return ourBracket[roundNumber + step][nextFightNumber];
    },

    getLooser(figth) {
      return figth.fighter1 === figth.winner ? figth.fighter2 : figth.fighter1;
    }
  }
};
