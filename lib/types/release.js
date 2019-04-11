'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReleaseConnection = undefined;

var _type = require('graphql/type');

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _scalars = require('./scalars');

var _media = require('./media');

var _media2 = _interopRequireDefault(_media);

var _enums = require('./enums');

var _releaseEvent = require('./release-event');

var _releaseEvent2 = _interopRequireDefault(_releaseEvent);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Release = new _type.GraphQLObjectType({
  name: 'Release',
  description: `A [release](https://musicbrainz.org/doc/Release) represents the
unique release (i.e. issuing) of a product on a specific date with specific
release information such as the country, label, barcode, packaging, etc. If you
walk into a store and purchase an album or single, they’re each represented in
MusicBrainz as one release.`,
  interfaces: () => [_node2.default, _entity2.default],
  fields: () => ({
    id: _helpers.id,
    mbid: _helpers.mbid,
    title: _helpers.title,
    disambiguation: _helpers.disambiguation,
    aliases: _helpers.aliases,
    artistCredit: _helpers.artistCredit,
    artistCredits: _helpers.artistCredits,
    releaseEvents: {
      type: new _type.GraphQLList(_releaseEvent2.default),
      description: 'The release events for this release.',
      resolve: _helpers.resolveHyphenated
    },
    date: {
      type: _scalars.DateType,
      description: `The [release date](https://musicbrainz.org/doc/Release/Date)
is the date in which a release was made available through some sort of
distribution mechanism.`
    },
    country: {
      type: _type.GraphQLString,
      description: 'The country in which the release was issued.'
    },
    asin: {
      type: _scalars.ASIN,
      description: `The [Amazon Standard Identification Number](https://musicbrainz.org/doc/ASIN)
of the release.`
    },
    barcode: {
      type: _type.GraphQLString,
      description: `The [barcode](https://en.wikipedia.org/wiki/Barcode), if the
release has one. The most common types found on releases are 12-digit
[UPCs](https://en.wikipedia.org/wiki/Universal_Product_Code) and 13-digit
[EANs](https://en.wikipedia.org/wiki/International_Article_Number).`
    },
    ...(0, _helpers.fieldWithID)('status', {
      type: _enums.ReleaseStatus,
      description: 'The status describes how “official” a release is.'
    }),
    ...(0, _helpers.fieldWithID)('packaging', {
      description: `The physical packaging that accompanies the release. See
the [list of packaging](https://musicbrainz.org/doc/Release/Packaging) for more
information.`
    }),
    quality: {
      type: _type.GraphQLString,
      description: `Data quality indicates how good the data for a release is.
It is not a mark of how good or bad the music itself is – for that, use
[ratings](https://musicbrainz.org/doc/Rating_System).`
    },
    media: {
      type: new _type.GraphQLList(_media2.default),
      description: 'The media on which the release was distributed.'
    },
    artists: _helpers.artists,
    labels: _helpers.labels,
    recordings: _helpers.recordings,
    releaseGroups: _helpers.releaseGroups,
    relationships: _helpers.relationships,
    collections: _helpers.collections,
    tags: _helpers.tags
  })
});

const ReleaseConnection = exports.ReleaseConnection = (0, _helpers.connectionWithExtras)(Release);
exports.default = Release;