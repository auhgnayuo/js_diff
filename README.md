# diff

A Javascript library for calculating and applying diffs (changes) between arrays and maps and object. It provides a unified interface to generate minimal change sets (additions, deletions, updates, movements) and apply them to transform collections efficiently.

## Features
- Compute minimal diffs between two arrays or maps or objects
- Apply diffs (patch) to arrays or maps or objects
- Supports additions, deletions, updates, and movements
- Simple API and extensible design

## Installation

```bash
yarn add diff
# or
npm install diff
```

## Usage

### 1. Array diff/patch
```ts
import { diffArray, applyArrayDiffs } from 'diff';

const left = [1, 2, 3];
const right = [2, 3, 4];
const diffs = diffArray(left, right);
// diffs: [Movement(1, 0), Movement(2, 1), Addition(2, 4)]
const patched = applyArrayDiffs(left, diffs);
// patched: [2, 3, 4]
```

### 2. Object diff/patch
```ts
import { diffRecord, applyRecordDiffs } from 'diff';

const left = { a: 1, b: 2 };
const right = { b: 3, c: 4 };
const diffs = diffRecord(left, right);
// diffs: [Deletion('a'), Update('b', 3), Addition('c', 4)]
const patched = applyRecordDiffs(left, diffs);
// patched: { b: 3, c: 4 }
```

### 3. Map diff/patch
```ts
import { diffMap, applyMapDiffs } from 'diff';

const left = new Map([['a', 1], ['b', 2]]);
const right = new Map([['b', 3], ['c', 4]]);
const diffs = diffMap(left, right);
// diffs: [Deletion('a'), Update('b', 3), Addition('c', 4)]
const patched = applyMapDiffs(left, diffs);
// patched: Map { 'b' => 3, 'c' => 4 }
```

## Dependency
- [deep-equal](https://www.npmjs.com/package/deep-equal)

## License

MIT
