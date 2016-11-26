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

export default new GraphQLObjectType({
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
