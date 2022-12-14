const input = require('fs').readFileSync('input.txt').toString();

// convert the input into a 2d array of numbers [y][x]
const grid = input.split('\n').map(row => row.split('').map(tree => +tree));

Object.defineProperty(Array.prototype, 'divide', {
    value: function(index) { return [this.slice(0, index), this.slice(++index)]; }
});

function makeDimensions(y, x) {
    return [].concat([].concat(grid[y].divide(x)), [].concat(grid.map(r => r[x]).divide(y)));
}

let visibleCount = 0;
for (const y in grid) {
    for (const x in grid) {
        const v = grid[y][x];
        const dimensions = makeDimensions(y, x);
        const visible = dimensions.some(d => d.every(tree => tree < v));
        if (visible)
            visibleCount++;
    }
}

console.log(visibleCount)