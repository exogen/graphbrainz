'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeField = exports.nodeInterface = undefined;

var _graphqlRelay = require('graphql-relay');

var _helpers = require('./helpers');

const debug = require('debug')('graphbrainz:types/node');

const TYPE_MODULES = {
  discid: 'disc'
};

const { nodeInterface, nodeField } = (0, _graphqlRelay.nodeDefinitions)((globalID, { loaders }) => {
  const { type, id } = (0, _graphqlRelay.fromGlobalId)(globalID);
  const entityType = (0, _helpers.toDashed)(type);
  return loaders.lookup.load([entityType, id]);
}, (obj, context, info) => {
  const type = TYPE_MODULES[obj._type] || obj._type;
  if (type) {
    let originalType;
    try {
      originalType = require(`./${type}`).default;
    } catch (err) {
      debug(`Failed to load type: ${type}`);
      return;
    }
    // Don't use `originalType`! The schema may have been extended in which
    // case the types have all been replaced. Instead, find the current type
    // of the same name.
    const typeMap = info.schema.getTypeMap();
    return typeMap[originalType.name];
  }
});

exports.default = nodeInterface;
exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;