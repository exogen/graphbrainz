import { GraphQLObjectType, GraphQLInt } from 'graphql/type'
import Entity from './entity'
import { Duration } from './scalars'
import Recording from './recording'
import { mbid, title } from './helpers'

export default new GraphQLObjectType({
  name: 'Track',
  description: `A track is the way a recording is represented on a particular
  release (or, more exactly, on a particular medium). Every track has a title
  (see the guidelines for titles) and is credited to one or more artists.`,
  interfaces: () => [Entity],
  fields: () => ({
    mbid,
    title,
    position: {
      type: GraphQLInt
    },
    number: {
      type: GraphQLInt
    },
    length: {
      type: Duration,
      description: 'The length of the track.'
    },
    recording: {
      type: Recording,
      description: 'The recording that appears on the track.',
      resolve: source => {
        const { recording } = source
        if (recording) {
          recording._type = 'recording'
        }
        return recording
      }
    }
  })
})
