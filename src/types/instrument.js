import GraphQL from 'graphql';
import { Node } from './node.js';
import { Entity } from './entity.js';
import {
  fieldWithID,
  id,
  mbid,
  name,
  disambiguation,
  connectionWithExtras,
  linkedQuery,
} from './helpers.js';
import { aliases } from './alias.js';
import { collections } from './collection.js';
import { relationships } from './relationship.js';
import { tags } from './tag.js';

const { GraphQLObjectType, GraphQLString } = GraphQL;

export const Instrument = new GraphQLObjectType({
  name: 'Instrument',
  description: `[Instruments](https://musicbrainz.org/doc/Instrument) are
devices created or adapted to make musical sounds. Instruments are primarily
used in relationships between two other entities.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    name,
    disambiguation,
    aliases,
    description: {
      type: GraphQLString,
      description: `A brief description of the main characteristics of the
instrument.`,
    },
    ...fieldWithID('type', {
      description: `The type categorises the instrument by the way the sound is
created, similar to the [Hornbostel-Sachs](https://en.wikipedia.org/wiki/Hornbostel%E2%80%93Sachs)
classification.`,
    }),
    relationships,
    collections,
    tags,
  }),
});

export const InstrumentConnection = connectionWithExtras(Instrument);

export const instruments = linkedQuery(InstrumentConnection);
