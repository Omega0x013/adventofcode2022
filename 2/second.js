let input = require('fs').readFileSync('input.txt').toString();
input = input.split("\n").map(line => line.split(" "));
const valueMap = {"A": 1, "B": 2, "C": 3, "X": 0, "Y": 1, "Z": 2}
const scoreMap = [[3, 6, 0], [0, 3, 6], [6, 0, 3]];
input = input.map(line => [valueMap[line[0]], valueMap[line[1]]]);

function makePlay(opp, play) {
    // 0 -> Lose
    // 1 -> Draw
    // 2 -> Win
    let result = opp + play - 1;
    if (result < 1) result = 3;
    else if (result > 3) result = 1;
    return result;
}

console.log(input);

input = input.map(([opp, play]) => [opp, makePlay(opp, play)])

console.log(input);

let outcome = 0;
for (const [opp, you] of input)
    outcome += you + scoreMap.at(opp-1).at(you-1);
console.log(outcome);