import GraphQL from 'graphql';
import { Entity } from './entity.js';
import { Duration } from './scalars.js';
import { Recording } from './recording.js';
import { mbid, title } from './helpers.js';

const { GraphQLObjectType, GraphQLInt, GraphQLString } = GraphQL;

export const Track = new GraphQLObjectType({
  name: 'Track',
  description: `A track is the way a recording is represented on a particular
  release (or, more exactly, on a particular medium). Every track has a title
  (see the guidelines for titles) and is credited to one or more artists.`,
  interfaces: () => [Entity],
  fields: () => ({
    mbid,
    title,
    position: {
      type: GraphQLInt,
      description: `The track’s position on the overall release (including all
tracks from all discs).`,
    },
    number: {
      type: GraphQLString,
      description: `The track number, which may include information about the
disc or side it appears on, e.g. “A1” or “B3”.`,
    },
    length: {
      type: Duration,
      description: 'The length of the track.',
    },
    recording: {
      type: Recording,
      description: 'The recording that appears on the track.',
      resolve: (source) => {
        const { recording } = source;
        if (recording) {
          recording._type = 'recording';
        }
        return recording;
      },
    },
  }),
});
