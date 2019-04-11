'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReleaseGroupConnection = undefined;

var _type = require('graphql/type');

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _scalars = require('./scalars');

var _enums = require('./enums');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ReleaseGroup = new _type.GraphQLObjectType({
  name: 'ReleaseGroup',
  description: `A [release group](https://musicbrainz.org/doc/Release_Group) is
used to group several different releases into a single logical entity. Every
release belongs to one, and only one release group.

Both release groups and releases are “albums” in a general sense, but with an
important difference: a release is something you can buy as media such as a CD
or a vinyl record, while a release group embraces the overall concept of an
album – it doesn’t matter how many CDs or editions/versions it had.`,
  interfaces: () => [_node2.default, _entity2.default],
  fields: () => ({
    id: _helpers.id,
    mbid: _helpers.mbid,
    title: _helpers.title,
    disambiguation: _helpers.disambiguation,
    aliases: _helpers.aliases,
    artistCredit: _helpers.artistCredit,
    artistCredits: _helpers.artistCredits,
    firstReleaseDate: {
      type: _scalars.DateType,
      description: 'The date of the earliest release in the group.',
      resolve: _helpers.resolveHyphenated
    },
    ...(0, _helpers.fieldWithID)('primaryType', {
      type: _enums.ReleaseGroupType,
      description: `The [type](https://musicbrainz.org/doc/Release_Group/Type)
of a release group describes what kind of releases the release group represents,
e.g. album, single, soundtrack, compilation, etc. A release group can have a
“main” type and an unspecified number of additional types.`
    }),
    ...(0, _helpers.fieldWithID)('secondaryTypes', {
      type: new _type.GraphQLList(_enums.ReleaseGroupType),
      description: `Additional [types](https://musicbrainz.org/doc/Release_Group/Type)
that apply to this release group.`
    }),
    artists: _helpers.artists,
    releases: _helpers.releases,
    relationships: _helpers.relationships,
    collections: _helpers.collections,
    rating: _helpers.rating,
    tags: _helpers.tags
  })
});

const ReleaseGroupConnection = exports.ReleaseGroupConnection = (0, _helpers.connectionWithExtras)(ReleaseGroup);
exports.default = ReleaseGroup;