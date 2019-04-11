'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelConnection = undefined;

var _type = require('graphql/type');

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _scalars = require('./scalars');

var _area = require('./area');

var _area2 = _interopRequireDefault(_area);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Label = new _type.GraphQLObjectType({
  name: 'Label',
  description: `[Labels](https://musicbrainz.org/doc/Label) represent mostly
(but not only) imprints. To a lesser extent, a label entity may be created to
represent a record company.`,
  interfaces: () => [_node2.default, _entity2.default],
  fields: () => ({
    id: _helpers.id,
    mbid: _helpers.mbid,
    name: _helpers.name,
    sortName: _helpers.sortName,
    disambiguation: _helpers.disambiguation,
    aliases: _helpers.aliases,
    country: {
      type: _type.GraphQLString,
      description: 'The country of origin for the label.'
    },
    area: {
      type: _area2.default,
      description: 'The area in which the label is based.'
    },
    lifeSpan: _helpers.lifeSpan,
    labelCode: {
      type: _type.GraphQLInt,
      description: `The [“LC” code](https://musicbrainz.org/doc/Label/Label_Code)
of the label.`
    },
    ipis: {
      type: new _type.GraphQLList(_scalars.IPI),
      description: `List of [Interested Parties Information](https://musicbrainz.org/doc/IPI)
codes for the label.`
    },
    ...(0, _helpers.fieldWithID)('type', {
      description: `A type describing the main activity of the label, e.g.
imprint, production, distributor, rights society, etc.`
    }),
    releases: _helpers.releases,
    relationships: _helpers.relationships,
    collections: _helpers.collections,
    rating: _helpers.rating,
    tags: _helpers.tags
  })
});

const LabelConnection = exports.LabelConnection = (0, _helpers.connectionWithExtras)(Label);
exports.default = Label;