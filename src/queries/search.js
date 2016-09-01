import { GraphQLObjectType } from 'graphql'
import {
  AreaConnection,
  ArtistConnection,
  LabelConnection,
  PlaceConnection,
  RecordingConnection,
  ReleaseConnection,
  ReleaseGroupConnection,
  WorkConnection
} from '../types'
import { searchQuery } from '../types/helpers'

export default new GraphQLObjectType({
  name: 'SearchQuery',
  description:
    'Search queries provide a way to search for MusicBrainz entities using ' +
    'Lucene query syntax.',
  fields: {
    areas: searchQuery(AreaConnection),
    artists: searchQuery(ArtistConnection),
    labels: searchQuery(LabelConnection),
    places: searchQuery(PlaceConnection),
    recordings: searchQuery(RecordingConnection),
    releases: searchQuery(ReleaseConnection),
    releaseGroups: searchQuery(ReleaseGroupConnection),
    works: searchQuery(WorkConnection)
  }
})
