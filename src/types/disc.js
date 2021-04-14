import GraphQL from 'graphql';
import GraphQLRelay from 'graphql-relay';
import { Node } from './node.js';
import { DiscID } from './scalars.js';
import { ReleaseConnection } from './release.js';
import { resolveDiscReleases } from '../resolvers.js';
import { id, resolveHyphenated } from './helpers.js';

const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLInt } = GraphQL;
const { forwardConnectionArgs } = GraphQLRelay;

export const Disc = new GraphQLObjectType({
  name: 'Disc',
  description: `Information about the physical CD and releases associated with a
particular [disc ID](https://musicbrainz.org/doc/Disc_ID).`,
  interfaces: () => [Node],
  fields: () => ({
    id,
    discID: {
      type: new GraphQLNonNull(DiscID),
      description: `The [disc ID](https://musicbrainz.org/doc/Disc_ID) of this disc.`,
      resolve: (disc) => disc.id,
    },
    offsetCount: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The number of offsets (tracks) on the disc.',
      resolve: resolveHyphenated,
    },
    offsets: {
      type: new GraphQLList(GraphQLInt),
      description: 'The sector offset of each track on the disc.',
    },
    sectors: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The sector offset of the lead-out (the end of the disc).',
    },
    releases: {
      type: ReleaseConnection,
      description: 'The list of releases linked to this disc ID.',
      args: forwardConnectionArgs,
      resolve: resolveDiscReleases,
    },
  }),
});
