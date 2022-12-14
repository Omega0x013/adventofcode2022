const input = require('fs').readFileSync('input.txt').toString();

const [rawCrates, rawMoves] = input.split('\n\n');

const cratesSource = rawCrates.split('\n').slice(0,-1).map(row => [...new Array(9).keys()].map(c => row[1+c*4]));
const crates = Array.from({length: 9}, () => new Array());

for (const row of cratesSource.reverse())
    for (const i in row)
        if (row[i] !== ' ')
            crates[i].push(row[i]);

class Move {
    constructor(s) {
        const [, size, , source, , destination] = s.split(' ');
        [this.size, this.source, this.destination] = [+size, +source-1, +destination-1];
    }
}

const moves = rawMoves.split('\n').map(line => new Move(line));

for (const move of moves)
    crates[move.destination] = crates[move.destination].concat(crates[move.source].splice(-move.size, move.size));

const message = crates.map(stack => stack.pop()).join('');
console.log(message);