import deepEqual from 'deep-equal';
import { diffArray, applyArrayDiffs } from '../src';
import { diffRecord, applyRecordDiffs } from '../src';  
import { diffMap, applyMapDiffs } from '../src';
import assert from 'assert';
function generateRandomArray(base = 100) {
  const length = Math.floor(Math.random() * base);
  return Array.from({ length }, () => Math.floor(Math.random() * base));
}

describe('blah', () => {
 
  it('list', () => {
    const length = 1000;
    const lefts = Array.from({ length }, () => generateRandomArray(4));
    const rights = Array.from({ length }, () => generateRandomArray(4));

    for (let i = 0; i < length; i++) {
      const left = lefts[i];
      const right = rights[i];
      const start = Date.now();
      const d = diffArray(left, right);
      const t = Date.now() - start;
      const newRight = applyArrayDiffs(left, d);
      assert(deepEqual(newRight, right));
      console.log(`list l: ${JSON.stringify(left)}\tr: ${JSON.stringify(right)}\td: ${d.map(x => x.toString()).join(', ')}\t t: ${t}`);
    }
  });

  it('object', () => {
    const length = 1000;
    const lefts = Array.from({ length }, () => generateRandomArray(4));
    const rights = Array.from({ length }, () => generateRandomArray(4));

    for (let i = 0; i < length; i++) {
      const left = Object.assign({}, ...lefts[i].map((v, idx) => ({ [idx]: v })));
      const right = Object.assign({}, ...rights[i].map((v, idx) => ({ [idx]: v })));
      const start = Date.now();
      const d = diffRecord(left, right);
      const t = Date.now() - start;
      const newRight = applyRecordDiffs(left, d);
      assert(deepEqual(newRight, right));
      console.log(`object l: ${JSON.stringify(left)}\tr: ${JSON.stringify(right)}\td: ${d.map(x => x.toString()).join(', ')}\t t: ${t}`);
    }
  });


  test('map', () => {
    const length = 1000;
    const lefts = Array.from({ length }, () => generateRandomArray(4));
    const rights = Array.from({ length }, () => generateRandomArray(4));

    for (let i = 0; i < length; i++) {
      const left = new Map(lefts[i].map((v, idx) => [`${idx}`, v]));
      const right = new Map(rights[i].map((v, idx) => [`${idx}`, v]));
      const start = Date.now();
      const d = diffMap(left, right);
      const t = Date.now() - start;
      const newRight = applyMapDiffs(left, d);
      assert(deepEqual(newRight, right));
      console.log(`map l: ${JSON.stringify(Object.fromEntries(left.entries()))}\tr: ${JSON.stringify(Object.fromEntries(right.entries()))}\td: ${d.map(x => x.toString()).join(', ')}\t t: ${t}`);
    }
  });
});



