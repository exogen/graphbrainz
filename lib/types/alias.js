'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = require('graphql/type');

var _scalars = require('./scalars');

var _helpers = require('./helpers');

exports.default = new _type.GraphQLObjectType({
  name: 'Alias',
  description: `[Aliases](https://musicbrainz.org/doc/Aliases) are variant names
that are mostly used as search help: if a search matches an entity’s alias, the
entity will be given as a result – even if the actual name wouldn’t be.`,
  fields: () => ({
    name: {
      ..._helpers.name,
      description: 'The aliased name of the entity.'
    },
    sortName: _helpers.sortName,
    locale: {
      type: _scalars.Locale,
      description: `The locale (language and/or country) in which the alias is
used.`
    },
    primary: {
      type: _type.GraphQLBoolean,
      description: `Whether this is the main alias for the entity in the
specified locale (this could mean the most recent or the most common).`
    },
    ...(0, _helpers.fieldWithID)('type', {
      description: `The type or purpose of the alias – whether it is a variant,
search hint, etc.`
    })
  })
});