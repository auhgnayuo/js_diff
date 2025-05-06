import deepEqual from 'deep-equal';

// Utility functions for type checking and deep equality used in diff operations.

/**
 * Checks if the given value is a plain object (not an array or map).
 *
 * @param {*} obj - The value to check.
 * @returns {boolean} True if the value is a plain object, false otherwise.
 */
export function isObject(obj: any): boolean {
    return !!obj && typeof obj === 'object' && !isArray(obj) && !isMap(obj);
}

/**
 * Checks if the given value is a Map.
 *
 * @param {*} obj - The value to check.
 * @returns {boolean} True if the value is a Map, false otherwise.
 */
export function isMap(obj: any): boolean {
    return obj instanceof Map;
}

/**
 * Checks if the given value is an Array.
 *
 * @param {*} obj - The value to check.
 * @returns {boolean} True if the value is an Array, false otherwise.
 */
export function isArray(obj: any): boolean {
    return Array.isArray(obj);
}

/**
 * Default deep equality function using deep-equal package.
 *
 * @param {*} a - First value.
 * @param {*} b - Second value.
 * @returns {boolean} True if values are deeply equal, false otherwise.
 */
export function defaultEquals(a: any, b: any): boolean {
  return deepEqual(a, b);
} 