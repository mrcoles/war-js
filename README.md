
War.js
======

A JavaScript simulator of the card game war.

It runs a bunch of deterministic games of war from a random shuffling of cards and counts how many times cards have to be flipped before the game is won by either player. For easier understanding, the number of flips are then divided by 26, to represent the number of flips required for each player to cycle through their entire first set of cards, which symbolizes going through the entire deck.

An example output of the script running on 10,000 trials:

    mean: 10.349926923076936
    median: 7.788461538461538
    mode: 3.9615384615384617
    variance: 68.77459123726301
    standard deviation: 8.293044750709054
    min: 1.0384615384615385
    max: 85.73076923076923
    1st percentile: 1.6923076923076923
    2nd percentile: 1.9230769230769231
    95th percentile: 26.846153846153847
    99th percentile: 40.63461538461539
