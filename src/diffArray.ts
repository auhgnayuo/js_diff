import { Addition, Deletion, Movement, Diff } from './diff';
import { isArray, defaultEquals } from './util';

// Provides functions to compute and apply differences (diffs) between two arrays.

/**
 * Computes the differences required to transform the left array into the right array.
 * Supports additions, deletions, and movements.
 *
 * @template T The type of array elements.
 * @param {Array<T>} left - The original array.
 * @param {Array<T>} right - The target array.
 * @param {(a: T, b: T) => boolean} [equals=defaultEquals] - Optional equality function for comparing elements.
 * @returns {Array<Diff>} An array of Diff objects representing the changes needed to transform left into right.
 * @throws {Error} If either input is not an array.
 */
export function diffArray<T>(left: Array<T>, right: Array<T>, equals = defaultEquals): Array<Diff> {
  if (!isArray(left) || !isArray(right)) {
      throw new Error(`Unsupported type: ${left}, ${right}`);
  }
  const diffs = [];
  const tmpLeft = left.slice();
  for (let j = 0; j < right.length; j++) {
    let ii = null;
    for (let i = j; i < tmpLeft.length; i++) {
      if (equals(right[j], tmpLeft[i])) {
        ii = i;
        break;
      }
    }
    if (ii === null) {
      tmpLeft.splice(j, 0, right[j]);
      diffs.push(new Addition(j, right[j]));
    } else {
      if (ii === j) continue;
      tmpLeft.splice(j, 0, tmpLeft.splice(ii, 1)[0]);
      diffs.push(new Movement(ii, j));
    }
  }
  for (let j = tmpLeft.length - 1; j >= right.length; j--) {
    diffs.push(new Deletion(j));
  }
  return diffs;
}

/**
 * Applies a sequence of diffs to an array, producing a new array.
 *
 * @template T The type of array elements.
 * @param {Array<T>} left - The original array.
 * @param {Array<Diff>} diffs - The list of diffs to apply.
 * @returns {Array<T>} The resulting array after applying the diffs.
 * @throws {Error} If the input is not an array.
 */
export function applyArrayDiffs<T>(left: Array<T>, diffs: Array<Diff>): Array<T> {
  if (!isArray(left)) {
    throw new Error(`Unsupported type: ${left}`);
  }
  const right = left.slice();
  for (const diff of diffs) {
    if (diff instanceof Addition) {
      right.splice(diff.key, 0, diff.value);
    } else if (diff instanceof Deletion) {
      right.splice(diff.key, 1);
    } else if (diff instanceof Movement) {
      right.splice(diff.newKey, 0, right.splice(diff.oldKey, 1)[0]);
    }
  }
  return right;
}