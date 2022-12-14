const input = require('fs').readFileSync('input.txt').toString();

// convert the input into a 2d array of numbers [y][x]
const grid = input.split('\n').map(row => row.split('').map(tree => +tree));

Object.defineProperty(Array.prototype, 'divide', {
    value: function(index) { return [this.slice(0, index).reverse(), this.slice(++index)]; }
});

Object.defineProperty(Array.prototype, 'product', {
    value: function() { return this.reduce((p, c) => p * c, 1) }
});

function makeDimensions(y, x) {
    return [].concat([].concat(grid[y].divide(x)), [].concat(grid.map(r => r[x]).divide(y)));
}

function findSightline(v, d) {
    let i = 1;
    for (const t of d) {
        if (t >= v)
            return i;
        i++;
    }
    return i;
}

const scores = []
for (const y in grid) {
    for (const x in grid) {
        const v = grid[y][x];
        const dimensions = makeDimensions(y, x);
        scores.push(dimensions.map(d => findSightline(v, d)).product());
    }
}

console.log(...scores)