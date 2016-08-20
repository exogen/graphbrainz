import { GraphQLObjectType } from 'graphql'
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
  URL,
  Work
} from '../types'
import { lookupQuery } from '../types/helpers'

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
    url: lookupQuery(URL),
    work: lookupQuery(Work)
  }
})
