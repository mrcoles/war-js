var _ = require('underscore');
var stats = require("stats-lite");

var suitIdToName = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
var numberIdToName = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'];

function Card(index) {
    var suitId = Math.floor(index / 13),
        numberId = index % 13;

    this.suitId = suitId;
    this.numberId = numberId;
}
Card.prototype.suit = function() { return suitIdToName[this.suitId]; };
Card.prototype.number = function() { return numberIdToName[this.numberId]; };
Card.prototype.name = function() { return this.number() + ' of ' + this.suit(); };

function getDeck(doShuffle) {
    var deck = [];
    for (var i=0; i<52; i++) {
        deck.push(new Card(i));
    }
    if (doShuffle) {
        deck = _.shuffle(deck);
    }
    return deck;
}

function deal(numPlayers) {
    var deck = getDeck(true),
        players = [];

    for (var p=0; p<numPlayers; p++) {
        players.push([]);
    }

    for (var i=0, len=deck.length-1; i<len; i++) {
        players[i%numPlayers].push(deck[i]);
    }

    return players;
}

function playWar(verbose) {
    var players = deal(2),
        turns = 0;

    function hasCardsCount() {
        var i = 0,
            len = players.length,
            count = 0;
        for (; i<len; i++) {
            if (players[i].length) {
                count++;
            }
        }
        return count;
    }

    function playTurn(piles, isWar, totalTries) {
        piles = piles || _.map(players, function() { return []; });
        totalTries = totalTries || 0;

        var tries = isWar ? 4 : 1;
        totalTries += tries;
        while (tries--) {
            _.each(players, function(cards, i) {
                cards.length && piles[i].push(cards.shift());
            });
        }

        var lastCards = _.map(piles, function(x) { return x[x.length-1]; });

        if (lastCards[0].numberId == lastCards[1].numberId) {
            verbose && console.log('WAR!');
            return playTurn(piles, true, totalTries);
        } else {
            var winner = (lastCards[0].numberId > lastCards[1].numberId ? 0 : 1);
            verbose && console.log(turns + ':\t' + lastCards[0].name() + ' vs ' + lastCards[1].name() + ' => player ' + winner);
            Array.prototype.push.apply(players[winner], _.flatten(piles));
            return totalTries;
        }
    }

    while (hasCardsCount() > 1) {
        turns += playTurn();
    }

    verbose && console.log('GAME OVER! ' + players[0].length + ' to ' + players[1].length);
    return turns;
}


var results = [];
for (var i=0, turns; i<10000; i++) {
    turns = playWar() / 26;
    results.push(turns);
}

console.log("mean: %s", stats.mean(results));
console.log("median: %s", stats.median(results));
console.log("mode: %s", stats.mode(results));
console.log("variance: %s", stats.variance(results));
console.log("standard deviation: %s", stats.stdev(results));
console.log("min: %s", Math.min.apply(null, results));
console.log("max: %s", Math.max.apply(null, results));
console.log("1st percentile: %s", stats.percentile(results, 0.01));
console.log("2nd percentile: %s", stats.percentile(results, 0.02));
console.log("95th percentile: %s", stats.percentile(results, 0.95));
console.log("99th percentile: %s", stats.percentile(results, 0.99));
