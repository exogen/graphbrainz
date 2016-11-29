import dashify from 'dashify'
import pascalCase from 'pascalcase'
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'
import {
  globalIdField,
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  forwardConnectionArgs
} from 'graphql-relay'
import { MBID } from './scalars'
import { ReleaseGroupType, ReleaseStatus } from './enums'
import Alias from './alias'
import ArtistCredit from './artist-credit'
import { ArtistConnection } from './artist'
import { EventConnection } from './event'
import { LabelConnection } from './label'
import LifeSpan from './life-span'
import { PlaceConnection } from './place'
import { RecordingConnection } from './recording'
import { RelationshipConnection } from './relationship'
import { ReleaseConnection } from './release'
import { ReleaseGroupConnection } from './release-group'
import { TagConnection } from './tag'
import { WorkConnection } from './work'
import {
  linkedResolver,
  relationshipResolver,
  subqueryResolver,
  includeRelationships
} from '../resolvers'

export const toPascal = pascalCase
export const toDashed = dashify

export function toPlural (name) {
  return name.endsWith('s') ? name : name + 's'
}

export function toSingular (name) {
  return name.endsWith('s') && !/series/i.test(name) ? name.slice(0, -1) : name
}

export function toWords (name) {
  return toPascal(name).replace(/([^A-Z])?([A-Z]+)/g, (match, tail, head) => {
    tail = tail ? tail + ' ' : ''
    head = head.length > 1 ? head : head.toLowerCase()
    return `${tail}${head}`
  })
}

export function fieldWithID (name, config = {}) {
  config = {
    type: GraphQLString,
    resolve: getHyphenated,
    ...config
  }
  const isPlural = config.type instanceof GraphQLList
  const singularName = isPlural ? toSingular(name) : name
  const idName = isPlural ? `${singularName}IDs` : `${name}ID`
  const s = isPlural ? 's' : ''
  const idConfig = {
    type: isPlural ? new GraphQLList(MBID) : MBID,
    description: `The MBID${s} associated with the value${s} of the \`${name}\`
field.`,
    resolve: getHyphenated
  }
  return {
    [name]: config,
    [idName]: idConfig
  }
}

export function getHyphenated (source, args, context, info) {
  const name = dashify(info.fieldName)
  return source[name]
}

export function getFallback (keys) {
  return (source) => {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (key in source) {
        return source[key]
      }
    }
  }
}

export const id = globalIdField()
export const mbid = {
  type: new GraphQLNonNull(MBID),
  description: 'The MBID of the entity.',
  resolve: source => source.id
}
export const name = {
  type: GraphQLString,
  description: 'The official name of the entity.'
}
export const sortName = {
  type: GraphQLString,
  description: `The string to use for the purpose of ordering by name (for
example, by moving articles like ‘the’ to the end or a person’s last name to
the front).`,
  resolve: getHyphenated
}
export const title = {
  type: GraphQLString,
  description: 'The official title of the entity.'
}
export const disambiguation = {
  type: GraphQLString,
  description: 'A comment used to help distinguish identically named entitites.'
}
export const lifeSpan = {
  type: LifeSpan,
  description: `The begin and end dates of the entity’s existence. Its exact
meaning depends on the type of entity.`,
  resolve: getHyphenated
}

function linkedQuery (connectionType, { args, ...config } = {}) {
  const typeName = toPlural(toWords(connectionType.name.slice(0, -10)))
  return {
    type: connectionType,
    description: `A list of ${typeName} linked to this entity.`,
    args: {
      ...forwardConnectionArgs,
      ...args
    },
    resolve: linkedResolver(),
    ...config
  }
}

export const relationship = {
  type: RelationshipConnection,
  description: 'A list of relationships between these two entity types.',
  args: {
    ...connectionArgs,
    direction: {
      type: GraphQLString,
      description: 'Filter by the relationship direction.'
    },
    ...fieldWithID('type', {
      description: 'Filter by the relationship type.'
    })
  },
  resolve: relationshipResolver()
}

export const relationships = {
  type: new GraphQLObjectType({
    name: 'Relationships',
    description: 'Lists of entity relationships for each entity type.',
    fields: () => ({
      areas: relationship,
      artists: relationship,
      events: relationship,
      instruments: relationship,
      labels: relationship,
      places: relationship,
      recordings: relationship,
      releases: relationship,
      releaseGroups: relationship,
      series: relationship,
      urls: relationship,
      works: relationship
    })
  }),
  description: 'Relationships between this entity and other entitites.',
  resolve: (source, args, { loaders }, info) => {
    if (source.relations != null) {
      return source.relations
    }
    const entityType = toDashed(info.parentType.name)
    const id = source.id
    const params = includeRelationships({}, info)
    return loaders.lookup.load([entityType, id, params]).then(entity => {
      return entity.relations
    })
  }
}

export const aliases = {
  type: new GraphQLList(Alias),
  description: `[Aliases](https://musicbrainz.org/doc/Aliases) are used to store
alternate names or misspellings.`,
  resolve: subqueryResolver()
}

export const artistCredit = {
  type: new GraphQLList(ArtistCredit),
  description: 'The main credited artist(s).',
  resolve: subqueryResolver()
}

export const artists = linkedQuery(ArtistConnection)
export const events = linkedQuery(EventConnection)
export const labels = linkedQuery(LabelConnection)
export const places = linkedQuery(PlaceConnection)
export const recordings = linkedQuery(RecordingConnection)
export const releases = linkedQuery(ReleaseConnection, {
  args: {
    type: {
      type: new GraphQLList(ReleaseGroupType),
      description: 'Filter by one or more release group types.'
    },
    status: {
      type: new GraphQLList(ReleaseStatus),
      description: 'Filter by one or more release statuses.'
    }
  }
})
export const releaseGroups = linkedQuery(ReleaseGroupConnection, {
  args: {
    type: {
      type: new GraphQLList(ReleaseGroupType),
      description: 'Filter by one or more release group types.'
    }
  }
})
export const tags = linkedQuery(TagConnection, {
  resolve: subqueryResolver('tags', (value = [], args) => ({
    totalCount: value.length,
    ...connectionFromArray(value, args)
  }))
})
export const works = linkedQuery(WorkConnection)

export const totalCount = {
  type: GraphQLInt,
  description: `A count of the total number of items in this connection,
ignoring pagination.`
}

export const score = {
  type: GraphQLInt,
  description: `The relevancy score (0–100) assigned by the search engine, if
these results were found through a search.`
}

export function connectionWithExtras (nodeType) {
  return connectionDefinitions({
    nodeType,
    connectionFields: () => ({ totalCount }),
    edgeFields: () => ({ score })
  }).connectionType
}
