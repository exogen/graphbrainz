import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { forwardConnectionArgs } from 'graphql-relay'
import { searchResolver } from '../resolvers'
import {
  AreaConnection,
  ArtistConnection,
  EventConnection,
  InstrumentConnection,
  LabelConnection,
  PlaceConnection,
  RecordingConnection,
  ReleaseConnection,
  ReleaseGroupConnection,
  SeriesConnection,
  WorkConnection
} from '../types'
import { toWords } from '../types/helpers'

function searchQuery (connectionType) {
  const typeName = toWords(connectionType.name.slice(0, -10))
  return {
    type: connectionType,
    description: `Search for ${typeName} entities matching the given query.`,
    args: {
      query: {
        type: new GraphQLNonNull(GraphQLString),
        description: `The query terms, in Lucene search syntax. See [examples
and search fields](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search).`
      },
      ...forwardConnectionArgs
    },
    resolve: searchResolver()
  }
}

export const SearchQuery = new GraphQLObjectType({
  name: 'SearchQuery',
  description: 'A search for MusicBrainz entities using Lucene query syntax.',
  fields: {
    areas: searchQuery(AreaConnection),
    artists: searchQuery(ArtistConnection),
    events: searchQuery(EventConnection),
    instruments: searchQuery(InstrumentConnection),
    labels: searchQuery(LabelConnection),
    places: searchQuery(PlaceConnection),
    recordings: searchQuery(RecordingConnection),
    releases: searchQuery(ReleaseConnection),
    releaseGroups: searchQuery(ReleaseGroupConnection),
    series: searchQuery(SeriesConnection),
    works: searchQuery(WorkConnection)
  }
})

export const searchField = {
  type: SearchQuery,
  description: 'Search for MusicBrainz entities using Lucene query syntax.',
  // We only have work to do once we know what entity types are being requested,
  // so this can just resolve to an empty object.
  resolve: () => ({})
}

export default SearchQuery
