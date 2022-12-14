const input = require('fs').readFileSync('input.txt').toString();

// Since we only care about directory sizes, we will ignore files entirely, and create a directory tree.
class Directory {
    constructor() {
        this.size = 0;
        this.children = {}
    }

    // Add an entry either to this dir or add a child
    addEntry(path, size) {
        if (path.length === 1)
            this.size += size;
        else {
            const [next, ...rest] = path;
            if (!(next in this.children))
                this.children[next] = new Directory();
            this.children[next].addEntry(rest, size);
        }
    }

    // Adds the childrens' sizes, modifies the dir in place and returns the result
    sumSize() {
        for (const child in this.children)
            this.size += this.children[child].sumSize();
        return this.size;
    }

    findSized(arr, size) {
        if (this.size >= size)
            arr.push(this.size);
        for (const child in this.children)
            this.children[child].findSized(arr, size);
    }

    showTree(layer) {
        console.log(" ".repeat(layer), this.size);
        for (const child in this.children)
            this.children[child].showTree(layer + 1);
    }
}

// First we slim down the input, since we only care about cds and file listings
const data = input.split('\n')
    .map(line => line.split(' '))
    .filter(line => !isNaN(+line[0]) || line[1] === 'cd');

// Then we initialise the filesystem
const root = new Directory();
let path = [];

// And work through the file entries and cds we have
for (const line of data) {
    if (line[0] === '$')
        switch (line.at(-1)) {
            case "/":
                path = [];
                break;
            case "..":
                path.pop();
                break;
            default:
                path.push(line.at(-1));
                break;
        }
    else
        root.addEntry(path.concat(line.slice(1)), +line[0]);
}

root.sumSize();

const results = [];

const neededSize = 30_000_000 - (70_000_000 - root.size);

root.findSized(results, neededSize);

console.log(Math.min(...results));
