'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = require('graphql/type');

var _scalars = require('./scalars');

exports.default = new _type.GraphQLObjectType({
  name: 'LifeSpan',
  description: `Fields indicating the begin and end date of an entity’s
lifetime, including whether it has ended (even if the date is unknown).`,
  fields: () => ({
    begin: {
      type: _scalars.DateType,
      description: 'The start date of the entity’s life span.'
    },
    end: {
      type: _scalars.DateType,
      description: 'The end date of the entity’s life span.'
    },
    ended: {
      type: _type.GraphQLBoolean,
      description: 'Whether or not the entity’s life span has ended.'
    }
  })
});