import { Addition, Deletion, Update, Diff } from './diff';
import { isMap, defaultEquals } from './util';

// Provides functions to compute and apply differences (diffs) between two Map objects.

/**
 * Computes the differences required to transform the left Map into the right Map.
 * Supports additions, deletions, and updates.
 *
 * @template K The type of the map keys.
 * @template V The type of the map values.
 * @param {Map<K, V>} left - The original Map.
 * @param {Map<K, V>} right - The target Map.
 * @param {(a: V, b: V) => boolean} [equals=defaultEquals] - Optional equality function for comparing values.
 * @returns {Diff[]} An array of Diff objects representing the changes needed to transform left into right.
 * @throws {Error} If either input is not a Map.
 */
export function diffMap<K, V>(left: Map<K, V>, right: Map<K, V>, equals: Function = defaultEquals): Diff[] {
  if (!isMap(left) || !isMap(right)) {
    throw new Error(`Unsupported type: ${left}, ${right}`);
  }
  const diffs = [];
  const allKeys = new Set([...Array.from(left.keys()), ...Array.from(right.keys())]);
  for (const key of Array.from(allKeys)) {
    if (left.has(key) && !right.has(key)) {
      diffs.push(new Deletion(key));
    } else if (!left.has(key) && right.has(key)) {
      diffs.push(new Addition(key, right.get(key)));
    } else if (left.has(key) && right.has(key) && !equals(left.get(key), right.get(key))) {
      diffs.push(new Update(key, right.get(key)));
    }
  }
  return diffs;
}

/**
 * Applies a sequence of diffs to a Map, producing a new Map.
 *
 * @template K The type of the map keys.
 * @template V The type of the map values.
 * @param {Map<K, V>} left - The original Map.
 * @param {Diff[]} diffs - The list of diffs to apply.
 * @returns {Map<K, V>} The resulting Map after applying the diffs.
 * @throws {Error} If the input is not a Map.
 */
export function applyMapDiffs<K, V>(left: Map<K, V>, diffs: Diff[]): Map<K, V> {
  if (!isMap(left)) {
    throw new Error(`Unsupported type: ${left}`);
  }
  const result = new Map(left);
  for (const diff of diffs) {
    if (diff instanceof Addition) {
      result.set(diff.key, diff.value);
    } else if (diff instanceof Deletion) {
      result.delete(diff.key);
    } else if (diff instanceof Update) {
      result.set(diff.key, diff.newValue);
    }
  }
  return result;
}