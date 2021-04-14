import GraphQL from 'graphql';
import { Node } from './node.js';
import { Entity } from './entity.js';
import {
  id,
  mbid,
  title,
  disambiguation,
  fieldWithID,
  connectionWithExtras,
  linkedQuery,
} from './helpers.js';
import { aliases } from './alias.js';
import { artists } from './artist.js';
import { collections } from './collection.js';
import { rating } from './rating.js';
import { relationships } from './relationship.js';
import { tags } from './tag.js';

const { GraphQLObjectType, GraphQLString, GraphQLList } = GraphQL;

export const Work = new GraphQLObjectType({
  name: 'Work',
  description: `A [work](https://musicbrainz.org/doc/Work) is a distinct
intellectual or artistic creation, which can be expressed in the form of one or
more audio recordings.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    title,
    disambiguation,
    aliases,
    iswcs: {
      type: new GraphQLList(GraphQLString),
      description: `A list of [ISWCs](https://musicbrainz.org/doc/ISWC) assigned
to the work by copyright collecting agencies.`,
    },
    language: {
      type: GraphQLString,
      description: 'The language in which the work was originally written.',
    },
    ...fieldWithID('type', {
      description: 'The type of work.',
    }),
    artists,
    relationships,
    collections,
    rating,
    tags,
  }),
});

export const WorkConnection = connectionWithExtras(Work);

export const works = linkedQuery(WorkConnection);
