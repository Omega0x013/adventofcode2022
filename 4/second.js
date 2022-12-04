const input = require('fs').readFileSync('input.txt').toString();

// Lower-Upper,Lower-Upper
const pairs = input.split('\n').map(line => line.split(','));

// turn the text into range bounds
const bounds = pairs.map(pair => pair.map(elf => elf.split('-').map(x => +x)));

// returns true if either array contains any of the same elements as the other
const isContained = (a, b) => ((l, s) => s.some(el => l.includes(el)))(...[a, b].sort((x, y) => y.length - x.length));

// generate the range to be compared within the isContained function
const range = (start, end) => [...[...new Array(end+1).keys()].slice(start)];

// find all the bounds where on fully contains the other
const overlaps = bounds.filter(([a, b]) => isContained(range(...a), range(...b)));

console.log(overlaps.length);
