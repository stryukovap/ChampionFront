export default {
    methods: {
        createBracket(receivedListOfPlayers) {
            if(receivedListOfPlayers.length === 1) {
                return [[{fighter1: receivedListOfPlayers[0], fighter2: null, winner: receivedListOfPlayers[0]}]]
            }
            var listOfPlayers = this.processListOfPlayer(receivedListOfPlayers);
            var bracket = [];
            var numberOfRounds = Math.log2(listOfPlayers.length) + ((listOfPlayers.length === 2) ? 0 : 1);
            for(var i = 0; i < numberOfRounds; i++) {
                var round = [];
                var numberOfFightsInRound = Math.ceil(listOfPlayers.length / Math.pow(2, i + 1));
                for(var j = 0; j < numberOfFightsInRound; j++) {
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
                if( i % 2 === 0 ) {
                    listOfPlayers.splice(i, 0, "empty");
                } else {
                    listOfPlayers.splice(listOfPlayers.length - i, 0, "empty");
                }
            }
            return listOfPlayers;
        }

    }
}