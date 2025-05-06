# Diff (JavaScript)

A cross-language library for calculating and applying diffs (changes) between collections (arrays, maps, objects). It provides a unified interface to generate minimal change sets (additions, deletions, updates, movements) and efficiently transform collections.

## Features
- Compute minimal diffs between two collections (arrays, maps, objects)
- Apply diffs (patch) to collections
- Supports additions, deletions, updates, and movements
- Simple, extensible, and consistent API

## Installation

```bash
yarn add diff
# or
npm install diff
```

## Usage

### Diff and Patch Arrays
```ts
import { diffArray, applyArrayDiffs } from 'diff';

const left = [1, 2, 3];
const right = [2, 3, 4];
const diffs = diffArray(left, right);
// diffs: [Movement(1, 0), Movement(2, 1), Addition(2, 4)]
const patched = applyArrayDiffs(left, diffs);
// patched: [2, 3, 4]
```

### Diff and Patch Objects
```ts
import { diffRecord, applyRecordDiffs } from 'diff';

const left = { a: 1, b: 2 };
const right = { b: 3, c: 4 };
const diffs = diffRecord(left, right);
// diffs: [Deletion('a'), Update('b', 3), Addition('c', 4)]
const patched = applyRecordDiffs(left, diffs);
// patched: { b: 3, c: 4 }
```

### Diff and Patch Maps
```ts
import { diffMap, applyMapDiffs } from 'diff';

const left = new Map([['a', 1], ['b', 2]]);
const right = new Map([['b', 3], ['c', 4]]);
const diffs = diffMap(left, right);
// diffs: [Deletion('a'), Update('b', 3), Addition('c', 4)]
const patched = applyMapDiffs(left, diffs);
// patched: Map { 'b' => 3, 'c' => 4 }
```

## API

- `Diff`: Abstract base type for all diff operations.
- `Update`: Represents an update operation.
- `Addition`: Represents an addition operation.
- `Deletion`: Represents a deletion operation.
- `Movement`: Represents a movement operation.

## Running Tests

```sh
yarn test
# or
npm test
```

## Dependency
- [deep-equal](https://www.npmjs.com/package/deep-equal)

## License
MIT
