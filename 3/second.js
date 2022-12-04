const input = require('fs').readFileSync('input.txt').toString();

// Split the input into backpacks
const backpacks = input.split('\n').map(line => new Set(line));

// Group the elves into threes (stolen from SO)
const groups = backpacks.reduce((r, e, i) => (i % 3 ? r[r.length - 1].push(e) : r.push([e])) && r, []);

// Intersect N sets (from SO)
function intersect(...sets) {
    if (!sets.length) return new Set();
    const i = sets.reduce((m, s, i) => s.size < sets[m].size ? i : m, 0);
    const [smallest] = sets.splice(i, 1);
    const res = new Set();
    for (let val of smallest)
        if (sets.every(s => s.has(val)))
             res.add(val);
    return res;
}

// Intersect each group
const groupItems = groups.map(group => [...intersect(...group)]);

// Convert the new sets into priorities
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const groupPriorities = groupItems.map(items => items.reduce((p, c) => p + alphabet.indexOf(c) + 1, 0));

// Sum the priorities to get the answer
const totalPriority = groupPriorities.reduce((p, c) => p + c);

console.log(totalPriority);