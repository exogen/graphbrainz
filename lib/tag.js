'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gql;

var _graphql = require('graphql');

function gql(literals, ...interpolations) {
  if (literals.length !== 1 || interpolations.length) {
    throw new Error('The gql template tag does not support interpolation.');
  }
  return (0, _graphql.parse)(literals[0]);
} /**
   * This module only exists because as of this writing, `graphql-tag` doesn't
   * support type, field, or argument descriptions. That's a bummer, so this
   * simple tag is provided instead. It doesn't support any type of interpolation
   * whatsoever, but will parse the GraphQL document, allow syntax highlighting,
   * and enable Prettier formatting.
   */