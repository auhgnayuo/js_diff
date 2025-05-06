// Entry point for the diff library, exporting all main diffing and patching functions and types.
import { diffArray, applyArrayDiffs } from './diffArray';
import { diffMap, applyMapDiffs } from './diffMap';
import { diffRecord, applyRecordDiffs } from './diffRecord';
import { Diff, Update, Addition, Deletion, Movement } from './diff';

export { Diff, Update, Addition, Deletion, Movement, diffArray, applyArrayDiffs, diffMap, applyMapDiffs,diffRecord, applyRecordDiffs};