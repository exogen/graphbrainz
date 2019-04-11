'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelationshipConnection = undefined;

var _type = require('graphql/type');

var _scalars = require('./scalars');

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Relationship = new _type.GraphQLObjectType({
  name: 'Relationship',
  description: `[Relationships](https://musicbrainz.org/doc/Relationships) are a
way to represent all the different ways in which entities are connected to each
other and to URLs outside MusicBrainz.`,
  fields: () => ({
    target: {
      type: new _type.GraphQLNonNull(_entity2.default),
      description: 'The target entity.',
      resolve: source => {
        const targetType = source['target-type'];
        const target = source[targetType];
        target._type = targetType.replace('_', '-');
        return target;
      }
    },
    direction: {
      type: new _type.GraphQLNonNull(_type.GraphQLString),
      description: 'The direction of the relationship.'
    },
    targetType: {
      type: new _type.GraphQLNonNull(_type.GraphQLString),
      description: 'The type of entity on the receiving end of the relationship.',
      resolve: _helpers.resolveHyphenated
    },
    sourceCredit: {
      type: _type.GraphQLString,
      description: `How the source entity was actually credited, if different
from its main (performance) name.`,
      resolve: _helpers.resolveHyphenated
    },
    targetCredit: {
      type: _type.GraphQLString,
      description: `How the target entity was actually credited, if different
from its main (performance) name.`,
      resolve: _helpers.resolveHyphenated
    },
    begin: {
      type: _scalars.DateType,
      description: 'The date on which the relationship became applicable.'
    },
    end: {
      type: _scalars.DateType,
      description: 'The date on which the relationship became no longer applicable.'
    },
    ended: {
      type: _type.GraphQLBoolean,
      description: 'Whether the relationship still applies.'
    },
    attributes: {
      type: new _type.GraphQLList(_type.GraphQLString),
      description: `Attributes which modify the relationship. There is a [list
of all attributes](https://musicbrainz.org/relationship-attributes), but the
attributes which are available, and how they should be used, depends on the
relationship type.`
    },
    // There doesn't seem to be any documentation for the `attribute-values`
    // field.
    // attributeValues: {},
    ...(0, _helpers.fieldWithID)('type', {
      description: 'The type of relationship.'
    })
  })
});

const RelationshipConnection = exports.RelationshipConnection = (0, _helpers.connectionWithExtras)(Relationship);
exports.default = Relationship;