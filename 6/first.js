const input = require('fs').readFileSync('input.txt').toString();

// Adds an element to the end of an array and removes the first one, returning it.
// If the array is empty then the new item is added and undefined it returned.
Array.prototype.cycle = function cycle (el) {
    const item = this.shift();
    this.push(el);
    return item;
}

// Initialise the array with 4 values
const prev = new Array(4).fill(0);

for (const i in input) {
    prev.cycle(input[i]);
    if ([...new Set(prev)].length === 4)
        console.log(i+1, prev)
}
