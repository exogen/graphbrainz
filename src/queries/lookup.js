import { GraphQLObjectType } from 'graphql'
import { resolveLookup } from '../resolvers'
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

function createLookupField (entity) {
  const typeName = toWords(entity.name)
  return {
    type: entity,
    description: `Look up a specific ${typeName} by its MBID.`,
    args: { mbid },
    resolve: resolveLookup
  }
}

export const LookupQuery = new GraphQLObjectType({
  name: 'LookupQuery',
  description: 'A lookup of an individual MusicBrainz entity by its MBID.',
  fields: {
    area: createLookupField(Area),
    artist: createLookupField(Artist),
    event: createLookupField(Event),
    instrument: createLookupField(Instrument),
    label: createLookupField(Label),
    place: createLookupField(Place),
    recording: createLookupField(Recording),
    release: createLookupField(Release),
    releaseGroup: createLookupField(ReleaseGroup),
    series: createLookupField(Series),
    url: createLookupField(URL),
    work: createLookupField(Work)
  }
})

export const lookup = {
  type: LookupQuery,
  description: 'Perform a lookup of a MusicBrainz entity by its MBID.',
  // We only have work to do once we know what entity types are being requested,
  // so this can just resolve to an empty object.
  resolve: () => ({})
}

export default LookupQuery
