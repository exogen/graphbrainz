'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lookup = exports.LookupQuery = undefined;

var _graphql = require('graphql');

var _resolvers = require('../resolvers');

var _helpers = require('../types/helpers');

var _types = require('../types');

function createLookupField(entity, args) {
  const typeName = (0, _helpers.toWords)(entity.name);
  return {
    type: entity,
    description: `Look up a specific ${typeName} by its MBID.`,
    args: { mbid: _helpers.mbid, ...args },
    resolve: _resolvers.resolveLookup
  };
}

const LookupQuery = exports.LookupQuery = new _graphql.GraphQLObjectType({
  name: 'LookupQuery',
  description: 'A lookup of an individual MusicBrainz entity by its MBID.',
  fields: {
    area: createLookupField(_types.Area),
    artist: createLookupField(_types.Artist),
    collection: createLookupField(_types.Collection),
    disc: {
      type: _types.Disc,
      description: 'Look up a specific physical disc by its disc ID.',
      args: {
        discID: {
          type: new _graphql.GraphQLNonNull(_types.DiscID),
          description: `The [disc ID](https://musicbrainz.org/doc/Disc_ID)
of the disc.`
        }
      },
      resolve: (root, { discID }, { loaders }, info) => {
        return loaders.lookup.load(['discid', discID]);
      }
    },
    event: createLookupField(_types.Event),
    instrument: createLookupField(_types.Instrument),
    label: createLookupField(_types.Label),
    place: createLookupField(_types.Place),
    recording: createLookupField(_types.Recording),
    release: createLookupField(_types.Release),
    releaseGroup: createLookupField(_types.ReleaseGroup),
    series: createLookupField(_types.Series),
    url: createLookupField(_types.URL, {
      mbid: {
        ..._helpers.mbid,
        // Remove the non-null requirement that is usually on the `mbid` field
        // so that URLs can be looked up by `resource`.
        type: _types.MBID
      },
      resource: {
        type: _types.URLString,
        description: 'The web address of the URL entity to look up.'
      }
    }),
    work: createLookupField(_types.Work)
  }
});

const lookup = exports.lookup = {
  type: LookupQuery,
  description: 'Perform a lookup of a MusicBrainz entity by its MBID.',
  // We only have work to do once we know what entity types are being requested,
  // so this can just resolve to an empty object.
  resolve: () => ({})
};

exports.default = LookupQuery;