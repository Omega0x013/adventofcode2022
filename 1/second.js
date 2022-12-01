const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split("\n\n");
const elves = input.map(x => 
        x.split('\n')
        .map(x => +x)
        .filter(x => x)
    ).map(x =>
        x.reduce((p, c) => p + c)
    ).sort();
console.log(elves.slice(-4, -1).reduce((p, c) => p + c));