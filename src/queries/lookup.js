import { GraphQLObjectType } from 'graphql'
import { lookupResolver } from '../resolvers'
import { mbid, toWords } from '../types/helpers'
import {
  Area,
  Artist,
  Event,
  Instrument,
  Label,
  Place,
  Recording,
  Release,
  ReleaseGroup,
  Series,
  URL,
  Work
} from '../types'

function lookupQuery (entity) {
  const typeName = toWords(entity.name)
  return {
    type: entity,
    description: `Look up a specific ${typeName} by its MBID.`,
    args: { mbid },
    resolve: lookupResolver()
  }
}

export const LookupQuery = new GraphQLObjectType({
  name: 'LookupQuery',
  description: 'A lookup of an individual MusicBrainz entity by its MBID.',
  fields: {
    area: lookupQuery(Area),
    artist: lookupQuery(Artist),
    event: lookupQuery(Event),
    instrument: lookupQuery(Instrument),
    label: lookupQuery(Label),
    place: lookupQuery(Place),
    recording: lookupQuery(Recording),
    release: lookupQuery(Release),
    releaseGroup: lookupQuery(ReleaseGroup),
    series: lookupQuery(Series),
    url: lookupQuery(URL),
    work: lookupQuery(Work)
  }
})

export const lookupField = {
  type: LookupQuery,
  description: 'Perform a lookup of a MusicBrainz entity by its MBID.',
  // We only have work to do once we know what entity types are being requested,
  // so this can just resolve to an empty object.
  resolve: () => ({})
}

export default LookupQuery
