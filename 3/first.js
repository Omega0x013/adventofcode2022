const input = require('fs').readFileSync('input.txt').toString();

// Split the input into backpacks
const backpacks = input.split('\n').map(line => line.split(''));

// Since we only care about item types, we convert them to sets to remove duplicates
const compartments = backpacks.map(line => [
    new Set(line.slice(0, line.length / 2)),
    new Set(line.slice(line.length / 2))
]);

// Find all the items held in both sets
const commonItems = compartments.map(([a, b]) => [...a].filter(item => b.has(item)));

// Convert the items into priorities
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const commonPriorities = commonItems.map(items => items.reduce((p, c) => p + alphabet.indexOf(c) + 1, 0));

const totalPriority = commonPriorities.reduce((p, c) => p + c);
console.log(totalPriority);