'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ONE_DAY = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.getFields = getFields;
exports.prettyPrint = prettyPrint;
exports.toFilteredArray = toFilteredArray;
exports.extendIncludes = extendIncludes;

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ONE_DAY = exports.ONE_DAY = 24 * 60 * 60 * 1000;

function getFields(info, fragments = info.fragments, depth = 0, prefix = '') {
  if (info.kind !== 'Field') {
    info = info.fieldNodes[0];
  }
  const selections = info.selectionSet.selections;
  const reducer = (fields, selection) => {
    if (selection.kind === 'FragmentSpread') {
      const name = selection.name.value;
      const fragment = fragments[name];
      if (!fragment) {
        throw new Error(`Fragment '${name}' was not passed to getFields()`);
      }
      fragment.selectionSet.selections.reduce(reducer, fields);
    } else if (selection.kind === 'InlineFragment') {
      selection.selectionSet.selections.reduce(reducer, fields);
    } else {
      const prefixedName = prefix + selection.name.value;
      fields[prefixedName] = selection;
      if (depth > 0 && selection.selectionSet) {
        const subFields = getFields(selection, fragments, depth - 1, `${prefixedName}.`);
        (0, _assign2.default)(fields, subFields);
      }
    }
    return fields;
  };
  return selections.reduce(reducer, {});
}

function prettyPrint(obj, { depth = 5, colors = true, breakLength = 120 } = {}) {
  console.log(_util2.default.inspect(obj, { depth, colors, breakLength }));
}

function toFilteredArray(obj) {
  return (Array.isArray(obj) ? obj : [obj]).filter(x => x);
}

function extendIncludes(includes, moreIncludes) {
  includes = toFilteredArray(includes);
  moreIncludes = toFilteredArray(moreIncludes);
  const seen = {};
  return includes.concat(moreIncludes).filter(x => {
    if (seen[x]) {
      return false;
    }
    seen[x] = true;
    return true;
  });
}