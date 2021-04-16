import GraphQL from 'graphql';
import { DateType } from './scalars.js';
import { resolveHyphenated } from './helpers.js';

const { GraphQLObjectType, GraphQLBoolean } = GraphQL;

export const LifeSpan = new GraphQLObjectType({
  name: 'LifeSpan',
  description: `Fields indicating the begin and end date of an entity’s
lifetime, including whether it has ended (even if the date is unknown).`,
  fields: () => ({
    begin: {
      type: DateType,
      description: 'The start date of the entity’s life span.',
    },
    end: {
      type: DateType,
      description: 'The end date of the entity’s life span.',
    },
    ended: {
      type: GraphQLBoolean,
      description: 'Whether or not the entity’s life span has ended.',
    },
  }),
});

export const lifeSpan = {
  type: LifeSpan,
  description: `The begin and end dates of the entity’s existence. Its exact
meaning depends on the type of entity.`,
  resolve: resolveHyphenated,
};
