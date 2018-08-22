/*
 createBracket - main function; use before competition:
 => gets Array[] of player's IDs, length from 1 to Infinity
 returns => bracket - Array[of rounds]
 round - Array[of fights]
 fight - Object{fighter1: ..., fighter2: ..., winner: ...}
 */
function createBracket(listOfPlayers) {
    listOfPlayers = processListOfPlayer(listOfPlayers);
    var bracket = [];
    var numberOfRounds = Math.log2(listOfPlayers.length) + (
        (listOfPlayers.length === 2)
            ? 0
            : 1
    );
    for(var i = 0; i < numberOfRounds; i++) {
        var round = [];
        var numberOfFightsInRound = Math.ceil(listOfPlayers.length / Math.pow(2, i + 1));
        for(var j = 0; j < numberOfFightsInRound; j++) {
            if (i === 0) {
                var f1 = listOfPlayers[j * 2];
                var f2 = listOfPlayers[j * 2 + 1];
            } else {
                var f1 = null;
                var f2 = null;
            }
            var fight = {
                fighter1: f1,
                fighter2: f2,
                winner: null
            };
            round.push(fight);
        }
        bracket.push(round);
    }
    return bracket;
}

/*
 processListOfPlayer - utility function; used as 1st step by createBracket:
 shuffles the list & adds dummies=null if necessary,
 to compensate not perfect number of players
 <script src=
 https://cdnjs.cloudflare.com/ajax/libs/lodash-fp/0.10.4/lodash-fp.min.js
 to connect lodash for shuffle function
 */
function processListOfPlayer(listOfPlayers) {
    // listOfPlayers = _.shuffle(listOfPlayers);   // uncomment to shuffle
    var length = listOfPlayers.length;
    var neededLength = Math.pow(2, Math.ceil(Math.log2(length)));
    var numberOfDummies = neededLength - length;
    for (var i = 0; i < numberOfDummies; i++) {
        if( i % 2 === 0 ) {
            listOfPlayers.splice(i, 0, null);
        } else {
            listOfPlayers.splice(listOfPlayers.length - i, 0, null);
        }
    }
    return listOfPlayers;
}

/*
 isWinner - management function; used during competition:
 => gets (1. number of the round in the bracket
 2. number of the fight in the round
 3. the winner - id of fighter1 or fighter2)
 adds winner to bracket.round.fight.winner
 calls forwardFighterToNextRound to move the fighter to next round
 returns => void
 */
function isWinner(roundNumber, fightNumber, winner) {
    var curFight = ourBracket[roundNumber][fightNumber];
    curFight.winner = winner;
    if (roundNumber >= ourBracket.length - 2) return;
    var nextRound = getNextFight(roundNumber, fightNumber, 1);
    if (roundNumber !== ourBracket.length - 3) {
        forwardFighterToNextRound (nextRound, winner, curFight);
    } else {
        var presentFight = ourBracket[roundNumber][fightNumber];
        var looser = getLooser(presentFight);
        var afterNextRound = getNextFight(roundNumber, fightNumber, 2);
        forwardFighterToNextRound (nextRound, looser, curFight);
        forwardFighterToNextRound (afterNextRound, winner, curFight);
    }
}

/*
 forwardFighterToNextRound - utility function; used as last step by isWinner:
 => gets (1. the next fight of the fighter
 2. fighter's ID)
 adds fighter to bracket.nextRound.hisNextFight.fighter(1 or 2, depends if 1 is occupied)
 returns => void
 */
function forwardFighterToNextRound (nextFight, fighter, curFight) {
    if (!nextFight.fighter1) {
        nextFight.fighter1 = fighter;
        nextFight.prevFight1 = curFight;
    } else {
        nextFight.fighter2 = fighter;
        nextFight.prevFight2 = curFight;
    };
    curFight.nextFight = nextFight;
}

/*
 getNextFight - utility function; used by isWinner:
 => gets (1. present round number
 2. present fight number
 3. 1 or 2 - next round or the one after)
 returns => next fight for the fighter in the next round or the one after
 */
function getNextFight(roundNumber, fightNumber, step) {
    var nextFightNumber = Math.ceil((fightNumber + 1) / 2) - 1;
    return ourBracket[roundNumber + step][nextFightNumber];
}

/*
 getLooser - utility function; used by isWinner:
 => gets present fight
 returns => the looser of the present fight
 */
function getLooser(figth) {
    return (figth.fighter1 === figth.winner) ? figth.fighter2 : figth.fighter1;
}

/* TEST 7 */
// 9 players

var players = [25, 65, 35, 94, 18, 57, 45, 13, 33];

var ourBracket = createBracket(players);

isWinner(0, 0, 25);
isWinner(0, 1, 65);
isWinner(0, 2, 35);
isWinner(0, 3, 94);
isWinner(0, 4, 57);
isWinner(0, 5, 45);
isWinner(0, 6, 13);
isWinner(0, 7, 33);

isWinner(1, 0, 25);
isWinner(1, 1, 94);
isWinner(1, 2, 57);
isWinner(1, 3, 13);

isWinner(2, 0, 94);
isWinner(2, 1, 57);

isWinner(3, 0, 13);

isWinner(4, 0, 94);

console.log(ourBracket);
console.log("Third place:", ourBracket[ourBracket.length - 2][0].winner);
console.log("Second place:", getLooser(ourBracket[ourBracket.length - 1][0]));
console.log("First place:", ourBracket[ourBracket.length - 1][0].winner);
