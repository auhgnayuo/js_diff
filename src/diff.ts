// Defines the Diff types and classes for representing and applying changes to data structures.

/**
 * DiffJSON is a type representing the JSON-serializable form of all supported diff operations.
 *
 * @typedef {Object} DiffJSON
 * @property {'update'|'addition'|'deletion'|'movement'} type - The type of diff operation.
 * @property {*} [key] - The key affected by the operation.
 * @property {*} [newValue] - The new value for update operations.
 * @property {*} [value] - The value for addition operations.
 * @property {*} [oldKey] - The original key for movement operations.
 * @property {*} [newKey] - The new key for movement operations.
 */
export type DiffJSON =
  | { type: 'update'; key: any; newValue: any }
  | { type: 'addition'; key: any; value: any }
  | { type: 'deletion'; key: any }
  | { type: 'movement'; oldKey: any; newKey: any };

/**
 * Abstract base class for all diff operations.
 * Provides serialization and deserialization logic.
 */
export abstract class Diff {
  /**
   * Creates a Diff instance from a JSON object.
   *
   * @param {DiffJSON} json - The JSON representation of a diff.
   * @returns {Diff} The corresponding Diff instance.
   * @throws {Error} If the JSON type is invalid.
   */
  static fromJSON(json: DiffJSON): Diff {
    switch (json.type) {
      case 'update':
        return new Update(json.key, json.newValue);
      case 'addition':
        return new Addition(json.key, json.value);
      case 'deletion':
        return new Deletion(json.key);
      case 'movement':
        return new Movement(json.oldKey, json.newKey);
      default:
        throw new Error('diff: invalid json ' + JSON.stringify(json));
    }
  }
  /**
   * Serializes the diff to a JSON object.
   * @returns {DiffJSON} The JSON representation of the diff.
   */
  abstract toJSON(): DiffJSON;
  /**
   * Returns a string representation of the diff.
   * @returns {string} The string representation.
   */
  abstract toString(): string;
}

/**
 * Represents an update operation in a diff.
 * @property {*} key - The key to update.
 * @property {*} newValue - The new value to set.
 */
export class Update extends Diff {
  /**
   * The key to update.
   * @type {*}
   */
  key: any;
  /**
   * The new value to set.
   * @type {*}
   */
  newValue: any;
  /**
   * Constructs an Update operation.
   * @param {*} key - The key to update.
   * @param {*} newValue - The new value to set.
   */
  constructor(key: any, newValue: any) {
    super();
    this.key = key;
    this.newValue = newValue;
  }
  /**
   * @inheritdoc
   */
  toJSON(): DiffJSON {
    return { type: 'update', key: this.key, newValue: this.newValue };
  }
  /**
   * @inheritdoc
   */
  toString(): string {
    return `Update(${String(this.key)}, ${this.newValue})`;
  }
}

/**
 * Represents an addition operation in a diff.
 * @property {*} key - The key where the value is added.
 * @property {*} value - The value being added.
 */
export class Addition extends Diff {
  /**
   * The key to add.
   * @type {*}
   */
  key: any;
  /**
   * The value to add.
   * @type {*}
   */
  value: any;
  /**
   * Constructs an Addition operation.
   * @param {*} key - The key where the value is added.
   * @param {*} value - The value being added.
   */
  constructor(key: any, value: any) {
    super();
    this.key = key;
    this.value = value;
  }
  /**
   * @inheritdoc
   */
  toJSON(): DiffJSON {
    return { type: 'addition', key: this.key, value: this.value };
  }
  /**
   * @inheritdoc
   */
  toString(): string {
    return `Addition(${String(this.key)}, ${this.value})`;
  }
}

/**
 * Represents a deletion operation in a diff.
 * @property {*} key - The key of the value being deleted.
 */
export class Deletion extends Diff {
  /**
   * The key to delete.
   * @type {*}
   */
  key: any;
  /**
   * Constructs a Deletion operation.
   * @param {*} key - The key of the value being deleted.
   */
  constructor(key: any) {
    super();
    this.key = key;
  }
  /**
   * @inheritdoc
   */
  toJSON(): DiffJSON {
    return { type: 'deletion', key: this.key };
  }
  /**
   * @inheritdoc
   */
  toString(): string {
    return `Deletion(${String(this.key)})`;
  }
}

/**
 * Represents a movement operation in a diff.
 * @property {*} oldKey - The original key or index.
 * @property {*} newKey - The new key or index.
 */
export class Movement extends Diff {
  /**
   * The original key.
   * @type {*}
   */
  oldKey: any;
  /**
   * The new key.
   * @type {*}
   */
  newKey: any;
  /**
   * Constructs a Movement operation.
   * @param {*} oldKey - The original key or index.
   * @param {*} newKey - The new key or index.
   */
  constructor(oldKey: any, newKey: any) {
    super();
    this.oldKey = oldKey;
    this.newKey = newKey;
  }
  /**
   * @inheritdoc
   */
  toJSON(): DiffJSON {
    return { type: 'movement', oldKey: this.oldKey, newKey: this.newKey };
  }
  /**
   * @inheritdoc
   */
  toString(): string {
    return `Movement(${String(this.oldKey)}, ${String(this.newKey)})`;
  }
}



