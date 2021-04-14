import GraphQL from 'graphql';
import { Node } from './node.js';
import { Entity } from './entity.js';
import { URLString } from './scalars.js';
import { id, mbid, connectionWithExtras } from './helpers.js';
import { relationships } from './relationship.js';

const { GraphQLObjectType, GraphQLNonNull } = GraphQL;

export const URL = new GraphQLObjectType({
  name: 'URL',
  description: `A [URL](https://musicbrainz.org/doc/URL) pointing to a resource
external to MusicBrainz, i.e. an official homepage, a site where music can be
acquired, an entry in another database, etc.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    resource: {
      type: new GraphQLNonNull(URLString),
      description: 'The actual URL string.',
    },
    relationships,
  }),
});

export const URLConnection = connectionWithExtras(URL);
