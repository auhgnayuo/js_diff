import deepEqual from 'deep-equal';
import { diffArray, applyArrayDiffs } from '../src';
import { diffRecord, applyRecordDiffs } from '../src';
import { diffMap, applyMapDiffs } from '../src';
import assert from 'assert';

function generateRandomJSON(depth = 2): any {
  if (depth <= 0) {
    const primitives = [
      () => Math.floor(Math.random() * 2000) - 1000,
      () => Math.random() * 2000 - 1000,
      () => Math.random() < 0.5,
      () => Math.random().toString(36).substring(2),
      () => null
    ];
    return primitives[Math.floor(Math.random() * primitives.length)]();
  }
  const type = Math.floor(Math.random() * 6);
  switch (type) {
    case 0:
      return Math.floor(Math.random() * 2000) - 1000;
    case 1:
      return Math.random() * 2000 - 1000;
    case 2:
      return Math.random() < 0.5;
    case 3:
      return Math.random().toString(36).substring(2);
    case 4: {
      const count = Math.floor(Math.random() * 5);
      return Array.from({ length: count }, () => generateRandomJSON(depth - 1));
    }
    case 5: {
      const count = Math.floor(Math.random() * 5);
      const obj: Record<string, any> = {};
      for (let i = 0; i < count; i++) {
        obj[Math.random().toString(36).substring(2)] = generateRandomJSON(depth - 1);
      }
      return obj;
    }
    default:
      return null;
  }
}

describe('Diff Library - Random JSON', () => {
  it('random JSON array diff/patch', () => {
    for (let i = 0; i < 1000; i++) {
      const left = Array.from({ length: Math.floor(Math.random() * 5) }, () => generateRandomJSON(2));
      const right = Array.from({ length: Math.floor(Math.random() * 5) }, () => generateRandomJSON(2));
      const diffs = diffArray(left, right, deepEqual);
      const patched = applyArrayDiffs(left, diffs);
      console.log(`Array left: ${JSON.stringify(left)}\nArray right: ${JSON.stringify(right)}\nDiffs: ${JSON.stringify(diffs)}\n`);
      assert(deepEqual(patched, right));
    }
  });

  it('random JSON object diff/patch', () => {
    for (let i = 0; i < 1000; i++) {
      const left: Record<string, any> = {};
      const right: Record<string, any> = {};
      for (let j = 0; j < Math.floor(Math.random() * 5); j++) {
        left[Math.random().toString(36).substring(2)] = generateRandomJSON(2);
      }
      for (let j = 0; j < Math.floor(Math.random() * 5); j++) {
        right[Math.random().toString(36).substring(2)] = generateRandomJSON(2);
      }
      const diffs = diffRecord(left, right, deepEqual);
      const patched = applyRecordDiffs(left, diffs);
      console.log(`Object left: ${JSON.stringify(left)}\nObject right: ${JSON.stringify(right)}\nDiffs: ${JSON.stringify(diffs)}\n`);
      assert(deepEqual(patched, right));
    }
  });

  it('random JSON map diff/patch', () => {
    for (let i = 0; i < 1000; i++) {
      const left = new Map();
      const right = new Map();
      for (let j = 0; j < Math.floor(Math.random() * 5); j++) {
        left.set(Math.random().toString(36).substring(2), generateRandomJSON(2));
      }
      for (let j = 0; j < Math.floor(Math.random() * 5); j++) {
        right.set(Math.random().toString(36).substring(2), generateRandomJSON(2));
      }
      const diffs = diffMap(left, right, deepEqual);
      const patched = applyMapDiffs(left, diffs);
      console.log(`Map left: ${JSON.stringify(Object.fromEntries(left.entries()))}\nMap right: ${JSON.stringify(Object.fromEntries(right.entries()))}\nDiffs: ${JSON.stringify(diffs)}\n`);
      assert(deepEqual(patched, right));
    }
  });
}); 