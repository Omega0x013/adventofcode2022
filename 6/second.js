const input = require('fs').readFileSync('input.txt').toString();

// const marker = input.split('').reduceRight((p, c, i, a) => [...new Set(a.slice(i-3,i+1))].length === 4 ? i : p, -1);

// const markers = input.split('').filter((v, i, a) => new Set(a.slice(i-3,i+1)).length === 4);

// Adds an element to the end of an array and removes the first one, returning it.
// If the array is empty then the new item is added and undefined it returned.
Array.prototype.cycle = function cycle (el) {
    const item = this.shift();
    this.push(el);
    return item;
}

const CHUNK = 14

// Initialise the array with 4 values
const prev = new Array(CHUNK).fill(0);

for (const i in input) {
    prev.cycle(input[i]);
    if ([...new Set(prev)].length === CHUNK)
        console.log(i+1, prev)
}