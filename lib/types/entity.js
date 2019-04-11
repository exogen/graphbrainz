'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityConnection = undefined;

var _graphql = require('graphql');

var _helpers = require('./helpers');

const debug = require('debug')('graphbrainz:types/entity');

const Entity = new _graphql.GraphQLInterfaceType({
  name: 'Entity',
  description: 'An entity in the MusicBrainz schema.',
  resolveType(value, context, info) {
    if (value._type) {
      let originalType;
      try {
        originalType = require(`./${value._type}`).default;
      } catch (err) {
        debug(`Failed to load type: ${value._type}`);
        return;
      }
      // Don't use `originalType`! The schema may have been extended in which
      // case the types have all been replaced. Instead, find the current type
      // of the same name.
      const typeMap = info.schema.getTypeMap();
      return typeMap[originalType.name];
    }
  },
  fields: () => ({ mbid: _helpers.mbid })
});

const EntityConnection = exports.EntityConnection = (0, _helpers.connectionWithExtras)(Entity);
exports.default = Entity;