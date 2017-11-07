import { GraphQLObjectType, GraphQLNonNull } from 'graphql'
import { resolveLookup } from '../resolvers'
import { mbid, toWords } from '../types/helpers'
import {
  Area,
  Artist,
  Collection,
  Disc,
  DiscID,
  Event,
  Instrument,
  Label,
  MBID,
  Place,
  Recording,
  Release,
  ReleaseGroup,
  Series,
  URL,
  URLString,
  Work
} from '../types'

function createLookupField(entity, args) {
  const typeName = toWords(entity.name)
  return {
    type: entity,
    description: `Look up a specific ${typeName} by its MBID.`,
    args: { mbid, ...args },
    resolve: resolveLookup
  }
}

export const LookupQuery = new GraphQLObjectType({
  name: 'LookupQuery',
  description: 'A lookup of an individual MusicBrainz entity by its MBID.',
  fields: {
    area: createLookupField(Area),
    artist: createLookupField(Artist),
    collection: createLookupField(Collection),
    disc: {
      type: Disc,
      description: 'Look up a specific physical disc by its disc ID.',
      args: {
        discID: {
          type: new GraphQLNonNull(DiscID),
          description: `The [disc ID](https://musicbrainz.org/doc/Disc_ID)
of the disc.`
        }
      },
      resolve: (root, { discID }, { loaders }, info) => {
        return loaders.lookup.load(['discid', discID])
      }
    },
    event: createLookupField(Event),
    instrument: createLookupField(Instrument),
    label: createLookupField(Label),
    place: createLookupField(Place),
    recording: createLookupField(Recording),
    release: createLookupField(Release),
    releaseGroup: createLookupField(ReleaseGroup),
    series: createLookupField(Series),
    url: createLookupField(URL, {
      mbid: {
        ...mbid,
        // Remove the non-null requirement that is usually on the `mbid` field
        // so that URLs can be looked up by `resource`.
        type: MBID
      },
      resource: {
        type: URLString,
        description: 'The web address of the URL entity to look up.'
      }
    }),
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
