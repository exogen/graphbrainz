import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { forwardConnectionArgs } from 'graphql-relay'
import { resolveSearch } from '../resolvers'
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

function createSearchField(connectionType) {
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
    resolve: resolveSearch
  }
}

export const SearchQuery = new GraphQLObjectType({
  name: 'SearchQuery',
  description: 'A search for MusicBrainz entities using Lucene query syntax.',
  fields: {
    areas: createSearchField(AreaConnection),
    artists: createSearchField(ArtistConnection),
    events: createSearchField(EventConnection),
    instruments: createSearchField(InstrumentConnection),
    labels: createSearchField(LabelConnection),
    places: createSearchField(PlaceConnection),
    recordings: createSearchField(RecordingConnection),
    releases: createSearchField(ReleaseConnection),
    releaseGroups: createSearchField(ReleaseGroupConnection),
    series: createSearchField(SeriesConnection),
    works: createSearchField(WorkConnection)
  }
})

export const search = {
  type: SearchQuery,
  description: 'Search for MusicBrainz entities using Lucene query syntax.',
  // We only have work to do once we know what entity types are being requested,
  // so this can just resolve to an empty object.
  resolve: () => ({})
}

export default SearchQuery
