let input = require('fs').readFileSync('input.txt').toString();
input = input.split("\n").map(line => line.split(" "));
const valueMap = {"A": 1, "B": 2, "C": 3, "X": 1, "Y": 2, "Z": 3}
const scoreMap = [[3, 6, 0], [0, 3, 6], [6, 0, 3]];
input = input.map(line => [valueMap[line[0]], valueMap[line[1]]]);
let outcome = 0;
for (const [opp, you] of input)
    outcome += you + scoreMap.at(opp-1).at(you-1);
console.log(outcome);