# diff

A lightweight, type-safe, and universal diff/patch library for Arrays, Objects (Record), and Maps. Ideal for data synchronization, state management, collaborative editing, and more.

## Features

- 🚀 Supports diffing and patching for Array, Object, and Map data structures
- 🧩 Provides standard diff operations: addition, deletion, update, and movement
- 🔒 Fully type-safe with TypeScript, intuitive API
- ⚡ Deep comparison for complex nested structures
- 🪶 Small footprint, zero dependencies (except deep-equal)
- 📦 Works in Node.js and modern frontend projects

## Installation

```bash
yarn add diff
# or
npm install diff
```

## Quick Start

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

## API Reference

### diffArray(left, right, equals?)
- Computes the difference between two arrays, returns an array of Diff instances
- `equals` (optional): custom equality function, defaults to deep equality

### applyArrayDiffs(left, diffs)
- Applies diffs to an array, returns a new array

### diffRecord(left, right, equals?)
- Computes the difference between two objects, returns an array of Diff instances
- `equals` (optional): custom value equality function, defaults to deep equality

### applyRecordDiffs(left, diffs)
- Applies diffs to an object, returns a new object

### diffMap(left, right, equals?)
- Computes the difference between two Maps, returns an array of Diff instances
- `equals` (optional): custom value equality function, defaults to deep equality

### applyMapDiffs(left, diffs)
- Applies diffs to a Map, returns a new Map

### Diff Types
- `Addition(key, value)` Addition
- `Deletion(key)` Deletion
- `Update(key, newValue)` Update
- `Movement(oldKey, newKey)` Movement (Array only)

## Dependency
- [deep-equal](https://www.npmjs.com/package/deep-equal)

## License

MIT License © 2025 auhgnayuo
