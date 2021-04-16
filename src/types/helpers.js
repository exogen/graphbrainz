import GraphQL from 'graphql';
import GraphQLRelay from 'graphql-relay';
import { MBID } from './scalars.js';
import { ReleaseGroupType, ReleaseStatus } from './enums.js';
import { resolveLinked } from '../resolvers.js';
import { toDashed, toPascal, toSingular, toPlural, toWords } from '../util.js';

const { GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = GraphQL;
const {
  globalIdField,
  connectionDefinitions,
  forwardConnectionArgs,
} = GraphQLRelay;

const TYPE_NAMES = {
  discid: 'Disc',
  url: 'URL',
};

export function resolveType(value, context, info) {
  const typeName = TYPE_NAMES[value._type] || toPascal(value._type);
  const typeMap = info.schema.getTypeMap();
  return typeMap[typeName];
}

export function resolveHyphenated(obj, args, context, info) {
  const name = toDashed(info.fieldName);
  return obj[name];
}

export function resolveWithFallback(keys) {
  return (obj) => {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key in obj) {
        return obj[key];
      }
    }
  };
}

export function fieldWithID(name, config = {}) {
  config = {
    type: GraphQLString,
    resolve: resolveHyphenated,
    ...config,
  };
  const isPlural = config.type instanceof GraphQLList;
  const singularName = isPlural ? toSingular(name) : name;
  const idName = isPlural ? `${singularName}IDs` : `${name}ID`;
  const s = isPlural ? 's' : '';
  const idConfig = {
    type: isPlural ? new GraphQLList(MBID) : MBID,
    description: `The MBID${s} associated with the value${s} of the \`${name}\`
field.`,
    resolve: (entity, args, { loaders }) => {
      const fieldName = toDashed(idName);
      if (fieldName in entity) {
        return entity[fieldName];
      }
      return loaders.lookup
        .load([entity._type, entity.id])
        .then((data) => data[fieldName]);
    },
  };
  return {
    [name]: config,
    [idName]: idConfig,
  };
}

export function createCollectionField(config) {
  const typeName = toPlural(toWords(config.type.name.slice(0, -10)));
  return {
    ...config,
    description: `The list of ${typeName} found in this collection.`,
  };
}

export const id = globalIdField();
export const mbid = {
  type: new GraphQLNonNull(MBID),
  description: 'The MBID of the entity.',
  resolve: (entity) => entity.id,
};
export const name = {
  type: GraphQLString,
  description: 'The official name of the entity.',
};
export const sortName = {
  type: GraphQLString,
  description: `The string to use for the purpose of ordering by name (for
example, by moving articles like ‘the’ to the end or a person’s last name to
the front).`,
  resolve: resolveHyphenated,
};
export const title = {
  type: GraphQLString,
  description: 'The official title of the entity.',
};
export const disambiguation = {
  type: GraphQLString,
  description:
    'A comment used to help distinguish identically named entitites.',
};

export function linkedQuery(connectionType, { args, ...config } = {}) {
  const typeName = toPlural(toWords(connectionType.name.slice(0, -10)));
  return {
    type: connectionType,
    description: `A list of ${typeName} linked to this entity.`,
    args: {
      ...args,
      ...forwardConnectionArgs,
    },
    resolve: resolveLinked,
    ...config,
  };
}

export const totalCount = {
  type: GraphQLInt,
  description: `A count of the total number of items in this connection,
ignoring pagination.`,
};

export const score = {
  type: GraphQLInt,
  description: `The relevancy score (0–100) assigned by the search engine, if
these results were found through a search.`,
};

export function connectionWithExtras(nodeType) {
  return connectionDefinitions({
    nodeType,
    connectionFields: () => ({
      nodes: {
        type: new GraphQLList(nodeType),
        description: `A list of nodes in the connection (without going through the
\`edges\` field).`,
      },
      totalCount,
    }),
    edgeFields: () => ({ score }),
  }).connectionType;
}

export const releaseGroupType = {
  type: new GraphQLList(ReleaseGroupType),
  description: 'Filter by one or more release group types.',
};

export const releaseStatus = {
  type: new GraphQLList(ReleaseStatus),
  description: 'Filter by one or more release statuses.',
};
