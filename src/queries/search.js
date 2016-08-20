import { GraphQLObjectType } from 'graphql'
import {
  AreaPage,
  ArtistPage,
  LabelPage,
  PlacePage,
  RecordingPage,
  ReleasePage,
  ReleaseGroupPage,
  WorkPage
} from '../types'
import { searchQuery } from '../types/helpers'

export default new GraphQLObjectType({
  name: 'SearchQuery',
  description:
    'Search queries provide a way to search for MusicBrainz entities using ' +
    'Lucene query syntax.',
  fields: {
    areas: searchQuery(AreaPage),
    artists: searchQuery(ArtistPage),
    labels: searchQuery(LabelPage),
    places: searchQuery(PlacePage),
    recordings: searchQuery(RecordingPage),
    releases: searchQuery(ReleasePage),
    releaseGroups: searchQuery(ReleaseGroupPage),
    works: searchQuery(WorkPage)
  }
})
