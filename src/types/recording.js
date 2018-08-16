import { GraphQLObjectType, GraphQLList, GraphQLBoolean } from 'graphql/type'
import Node from './node'
import Entity from './entity'
import { Duration, ISRC } from './scalars'
import {
  id,
  mbid,
  title,
  disambiguation,
  aliases,
  artistCredit,
  artistCredits,
  artists,
  releases,
  relationships,
  collections,
  rating,
  tags,
  connectionWithExtras
} from './helpers'

const Recording = new GraphQLObjectType({
  name: 'Recording',
  description: `A [recording](https://musicbrainz.org/doc/Recording) is an
entity in MusicBrainz which can be linked to tracks on releases. Each track must
always be associated with a single recording, but a recording can be linked to
any number of tracks.

A recording represents distinct audio that has been used to produce at least one
released track through copying or mastering. A recording itself is never
produced solely through copying or mastering.

Generally, the audio represented by a recording corresponds to the audio at a
stage in the production process before any final mastering but after any editing
or mixing.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    title,
    disambiguation,
    aliases,
    artistCredit,
    artistCredits,
    isrcs: {
      type: new GraphQLList(ISRC),
      description: `A list of [International Standard Recording Codes](https://musicbrainz.org/doc/ISRC)
(ISRCs) for this recording.`,
      resolve: (source, args, context) => {
        if (source.isrcs) {
          return source.isrcs
        }
        // TODO: Add support for parent entities knowing to include this `inc`
        // parameter in their own calls by inspecting what fields are requested
        // or batching things at the loader level.
        return context.loaders.lookup
          .load(['recording', source.id, { inc: 'isrcs' }])
          .then(recording => recording.isrcs)
      }
    },
    length: {
      type: Duration,
      description: `An approximation to the length of the recording, calculated
from the lengths of the tracks using it.`
    },
    video: {
      type: GraphQLBoolean,
      description: 'Whether this is a video recording.'
    },
    artists,
    releases,
    relationships,
    collections,
    rating,
    tags
  })
})

export const RecordingConnection = connectionWithExtras(Recording)
export default Recording
