import { GraphQLObjectType } from 'graphql'
import { lookupResolver } from '../resolvers'
import { mbid } from '../types/helpers'
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
  return {
    type: entity,
    description: `Look up a specific ${entity.name} by its MBID.`,
    args: { mbid },
    resolve: lookupResolver()
  }
}

export default new GraphQLObjectType({
  name: 'LookupQuery',
  description:
    'You can perform a lookup of an entity when you have the MBID for that ' +
    'entity.',
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
