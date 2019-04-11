'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = exports.SearchQuery = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _resolvers = require('../resolvers');

var _types = require('../types');

var _helpers = require('../types/helpers');

function createSearchField(connectionType) {
  const typeName = (0, _helpers.toWords)(connectionType.name.slice(0, -10));
  return {
    type: connectionType,
    description: `Search for ${typeName} entities matching the given query.`,
    args: {
      query: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: `The query terms, in Lucene search syntax. See [examples
and search fields](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search).`
      },
      ..._graphqlRelay.forwardConnectionArgs
    },
    resolve: _resolvers.resolveSearch
  };
}

const SearchQuery = exports.SearchQuery = new _graphql.GraphQLObjectType({
  name: 'SearchQuery',
  description: 'A search for MusicBrainz entities using Lucene query syntax.',
  fields: {
    areas: createSearchField(_types.AreaConnection),
    artists: createSearchField(_types.ArtistConnection),
    events: createSearchField(_types.EventConnection),
    instruments: createSearchField(_types.InstrumentConnection),
    labels: createSearchField(_types.LabelConnection),
    places: createSearchField(_types.PlaceConnection),
    recordings: createSearchField(_types.RecordingConnection),
    releases: createSearchField(_types.ReleaseConnection),
    releaseGroups: createSearchField(_types.ReleaseGroupConnection),
    series: createSearchField(_types.SeriesConnection),
    works: createSearchField(_types.WorkConnection)
  }
});

const search = exports.search = {
  type: SearchQuery,
  description: 'Search for MusicBrainz entities using Lucene query syntax.',
  // We only have work to do once we know what entity types are being requested,
  // so this can just resolve to an empty object.
  resolve: () => ({})
};

exports.default = SearchQuery;