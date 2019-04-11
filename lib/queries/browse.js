'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browse = exports.BrowseQuery = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _resolvers = require('../resolvers');

var _types = require('../types');

var _helpers = require('../types/helpers');

const area = {
  type: _types.MBID,
  description: 'The MBID of an area to which the entity is linked.'
};
const artist = {
  type: _types.MBID,
  description: 'The MBID of an artist to which the entity is linked.'
};
const collection = {
  type: _types.MBID,
  description: 'The MBID of a collection in which the entity is found.'
};
const event = {
  type: _types.MBID,
  description: 'The MBID of an event to which the entity is linked.'
};
const label = {
  type: _types.MBID,
  description: 'The MBID of a label to which the entity is linked.'
};
const place = {
  type: _types.MBID,
  description: 'The MBID of a place to which the entity is linked.'
};
const recording = {
  type: _types.MBID,
  description: 'The MBID of a recording to which the entity is linked.'
};
const release = {
  type: _types.MBID,
  description: 'The MBID of a release to which the entity is linked.'
};
const releaseGroup = {
  type: _types.MBID,
  description: 'The MBID of a release group to which the entity is linked.'
};
const work = {
  type: _types.MBID,
  description: 'The MBID of a work to which the entity is linked.'
};

function createBrowseField(connectionType, args) {
  const typeName = (0, _helpers.toWords)(connectionType.name.slice(0, -10));
  return {
    type: connectionType,
    description: `Browse ${typeName} entities linked to the given arguments.`,
    args: {
      ...args,
      ..._graphqlRelay.forwardConnectionArgs
    },
    resolve: _resolvers.resolveBrowse
  };
}

const BrowseQuery = exports.BrowseQuery = new _graphql.GraphQLObjectType({
  name: 'BrowseQuery',
  description: `A query for all MusicBrainz entities directly linked to another
entity.`,
  fields: {
    areas: createBrowseField(_types.AreaConnection, {
      collection
    }),
    artists: createBrowseField(_types.ArtistConnection, {
      area,
      collection,
      recording,
      release,
      releaseGroup,
      work
    }),
    collections: createBrowseField(_types.CollectionConnection, {
      area,
      artist,
      editor: {
        type: _graphql.GraphQLString,
        description: 'The username of the editor who created the collection.'
      },
      event,
      label,
      place,
      recording,
      release,
      releaseGroup,
      work
    }),
    events: createBrowseField(_types.EventConnection, {
      area,
      artist,
      collection,
      place
    }),
    labels: createBrowseField(_types.LabelConnection, {
      area,
      collection,
      release
    }),
    places: createBrowseField(_types.PlaceConnection, {
      area,
      collection
    }),
    recordings: createBrowseField(_types.RecordingConnection, {
      artist,
      collection,
      isrc: {
        type: _types.ISRC,
        description: `The [International Standard Recording Code](https://musicbrainz.org/doc/ISRC)
(ISRC) of the recording.`
      },
      release
    }),
    releases: createBrowseField(_types.ReleaseConnection, {
      area,
      artist,
      collection,
      discID: {
        type: _types.DiscID,
        description: `A [disc ID](https://musicbrainz.org/doc/Disc_ID)
associated with the release.`
      },
      label,
      recording,
      releaseGroup,
      track: {
        type: _types.MBID,
        description: 'The MBID of a track that is included in the release.'
      },
      trackArtist: {
        type: _types.MBID,
        description: `The MBID of an artist that appears on a track in the
release, but is not included in the credits for the release itself.`
      },
      type: _helpers.releaseGroupType,
      status: _helpers.releaseStatus
    }),
    releaseGroups: createBrowseField(_types.ReleaseGroupConnection, {
      artist,
      collection,
      release,
      type: _helpers.releaseGroupType
    }),
    works: createBrowseField(_types.WorkConnection, {
      artist,
      collection,
      iswc: {
        type: _types.ISWC,
        description: `The [International Standard Musical Work Code](https://musicbrainz.org/doc/ISWC)
(ISWC) of the work.`
      }
    })
  }
});

const browse = exports.browse = {
  type: BrowseQuery,
  description: 'Browse all MusicBrainz entities directly linked to another entity.',
  // We only have work to do once we know what entity types are being requested,
  // so this can just resolve to an empty object.
  resolve: () => ({})
};

exports.default = BrowseQuery;