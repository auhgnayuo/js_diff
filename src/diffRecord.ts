import { Diff, Deletion, Addition, Update } from "./diff";
import { isObject, defaultEquals } from "./util";

// Provides functions to compute and apply differences (diffs) between two Record (object) types.

/**
 * Computes the differences required to transform the left Record into the right Record.
 * Supports additions, deletions, and updates.
 *
 * @template K The type of the record keys (string or symbol).
 * @template V The type of the record values.
 * @param {Record<K, V>} left - The original Record object.
 * @param {Record<K, V>} right - The target Record object.
 * @param {(a: V, b: V) => boolean} [equals=defaultEquals] - Optional equality function for comparing values.
 * @returns {Diff[]} An array of Diff objects representing the changes needed to transform left into right.
 * @throws {Error} If either input is not an object.
 */
export function diffRecord<K extends string | symbol, V>(left: Record<K, V>, right: Record<K, V>, equals: Function = defaultEquals): Diff[] {
    if (!isObject(left) || !isObject(right)) {
      throw new Error(`Unsupported type: ${left}, ${right}`);
    }
    const allKeys = new Set([
      ...Reflect.ownKeys(left),
      ...Reflect.ownKeys(right)
    ]);
    const diffs = [];
    for (const key of Array.from(allKeys)) {
      const leftHas = Object.prototype.hasOwnProperty.call(left, key);
      const rightHas = Object.prototype.hasOwnProperty.call(right, key);
      if (leftHas && !rightHas) {
        diffs.push(new Deletion(key));
      } else if (!leftHas && rightHas) {
        diffs.push(new Addition(key, right[key as K]));
      } else if (leftHas && rightHas && !equals(left[key as K], right[key as K])) {
        diffs.push(new Update(key, right[key as K]));
      }
    }
    return diffs;
  }
  
  
  // Applies a sequence of diffs to a Record, producing a new Record.

  /**
   * Applies a sequence of diffs to a Record, producing a new Record.
   *
   * @template K The type of the record keys (string, number, or symbol).
   * @template V The type of the record values.
   * @param {Record<K, V>} left - The original Record object.
   * @param {Diff[]} diffs - The list of diffs to apply.
   * @returns {Record<K, V>} The resulting Record after applying the diffs.
   * @throws {Error} If the input is not an object.
   */
  export function applyRecordDiffs<K extends PropertyKey, V>(left: Record<K, V>, diffs: Diff[]): Record<K, V> {
    if (!isObject(left)) {
      throw new Error(`Unsupported type: ${left}`);
    }
    const result = { ...left };
    for (const diff of diffs) {
      if (diff instanceof Addition) {
        result[diff.key as K] = diff.value;
      } else if (diff instanceof Deletion) {
        delete result[diff.key  as K];
      } else if (diff instanceof Update) {
        result[diff.key as K] = diff.newValue;
      }
    }
    return result;
  }
  