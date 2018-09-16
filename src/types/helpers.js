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
import { AreaConnection } from './area'
import { ArtistConnection } from './artist'
import { CollectionConnection } from './collection'
import { EventConnection } from './event'
import { InstrumentConnection } from './instrument'
import { LabelConnection } from './label'
import LifeSpan from './life-span'
import { PlaceConnection } from './place'
import Rating from './rating'
import { RecordingConnection } from './recording'
import { RelationshipConnection } from './relationship'
import { ReleaseConnection } from './release'
import { ReleaseGroupConnection } from './release-group'
import { SeriesConnection } from './series'
import { TagConnection } from './tag'
import { WorkConnection } from './work'
import {
  resolveLinked,
  resolveRelationship,
  createSubqueryResolver,
  includeRelationships
} from '../resolvers'

export const toPascal = pascalCase
export const toDashed = dashify

export function toPlural(name) {
  return name.endsWith('s') ? name : name + 's'
}

export function toSingular(name) {
  return name.endsWith('s') && !/series/i.test(name) ? name.slice(0, -1) : name
}

export function toWords(name) {
  return toPascal(name).replace(/([^A-Z])?([A-Z]+)/g, (match, tail, head) => {
    tail = tail ? tail + ' ' : ''
    head = head.length > 1 ? head : head.toLowerCase()
    return `${tail}${head}`
  })
}

export function resolveHyphenated(obj, args, context, info) {
  const name = toDashed(info.fieldName)
  return obj[name]
}

export function resolveWithFallback(keys) {
  return obj => {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (key in obj) {
        return obj[key]
      }
    }
  }
}

export function fieldWithID(name, config = {}) {
  config = {
    type: GraphQLString,
    resolve: resolveHyphenated,
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
    resolve: (entity, args, { loaders }) => {
      const fieldName = toDashed(idName)
      if (fieldName in entity) {
        return entity[fieldName]
      }
      return loaders.lookup
        .load([entity._type, entity.id])
        .then(data => data[fieldName])
    }
  }
  return {
    [name]: config,
    [idName]: idConfig
  }
}

export function createCollectionField(config) {
  const typeName = toPlural(toWords(config.type.name.slice(0, -10)))
  return {
    ...config,
    description: `The list of ${typeName} found in this collection.`
  }
}

export const id = globalIdField()
export const mbid = {
  type: new GraphQLNonNull(MBID),
  description: 'The MBID of the entity.',
  resolve: entity => entity.id
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
  resolve: resolveHyphenated
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
  resolve: resolveHyphenated
}

function linkedQuery(connectionType, { args, ...config } = {}) {
  const typeName = toPlural(toWords(connectionType.name.slice(0, -10)))
  return {
    type: connectionType,
    description: `A list of ${typeName} linked to this entity.`,
    args: {
      ...args,
      ...forwardConnectionArgs
    },
    resolve: resolveLinked,
    ...config
  }
}

export const relationship = {
  type: RelationshipConnection,
  description: 'A list of relationships between these two entity types.',
  args: {
    direction: {
      type: GraphQLString,
      description: 'Filter by the relationship direction.'
    },
    ...fieldWithID('type', {
      description: 'Filter by the relationship type.'
    }),
    ...connectionArgs
  },
  resolve: resolveRelationship
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
  resolve: (entity, args, { loaders }, info) => {
    let promise
    if (entity.relations != null) {
      promise = Promise.resolve(entity)
    } else {
      const entityType = toDashed(info.parentType.name)
      const id = entity.id
      const params = includeRelationships({}, info)
      promise = loaders.lookup.load([entityType, id, params])
    }
    return promise.then(entity => entity.relations)
  }
}

export const aliases = {
  type: new GraphQLList(Alias),
  description: `[Aliases](https://musicbrainz.org/doc/Aliases) are used to store
alternate names or misspellings.`,
  resolve: createSubqueryResolver()
}

export const artistCredits = {
  type: new GraphQLList(ArtistCredit),
  description: 'The main credited artist(s).',
  resolve: createSubqueryResolver({
    inc: 'artist-credits',
    key: 'artist-credit'
  })
}

export const artistCredit = {
  ...artistCredits,
  deprecationReason: `The \`artistCredit\` field has been renamed to
\`artistCredits\`, since it is a list of credits and is referred to in the
plural form throughout the MusicBrainz documentation. This field is deprecated
and will be removed in a major release in the future. Use the equivalent
\`artistCredits\` field.`
}

export const rating = {
  type: Rating,
  description: 'The rating users have given to this entity.',
  resolve: createSubqueryResolver({ inc: 'ratings' })
}

export const releaseGroupType = {
  type: new GraphQLList(ReleaseGroupType),
  description: 'Filter by one or more release group types.'
}

export const releaseStatus = {
  type: new GraphQLList(ReleaseStatus),
  description: 'Filter by one or more release statuses.'
}

export const areas = linkedQuery(AreaConnection)
export const artists = linkedQuery(ArtistConnection)
export const collections = linkedQuery(CollectionConnection, {
  description: 'A list of collections containing this entity.'
})
export const events = linkedQuery(EventConnection)
export const instruments = linkedQuery(InstrumentConnection)
export const labels = linkedQuery(LabelConnection)
export const places = linkedQuery(PlaceConnection)
export const recordings = linkedQuery(RecordingConnection)
export const releases = linkedQuery(ReleaseConnection, {
  args: {
    type: releaseGroupType,
    status: releaseStatus
  }
})
export const releaseGroups = linkedQuery(ReleaseGroupConnection, {
  args: {
    type: releaseGroupType
  }
})
export const series = linkedQuery(SeriesConnection)
export const tags = linkedQuery(TagConnection, {
  resolve: createSubqueryResolver({}, (value = [], args) => {
    const connection = connectionFromArray(value, args)
    return {
      nodes: connection.edges.map(edge => edge.node),
      totalCount: value.length,
      ...connection
    }
  })
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

export function connectionWithExtras(nodeType) {
  return connectionDefinitions({
    nodeType,
    connectionFields: () => ({
      nodes: {
        type: new GraphQLList(nodeType),
        description: `A list of nodes in the connection (without going through the
\`edges\` field).`
      },
      totalCount
    }),
    edgeFields: () => ({ score })
  }).connectionType
}
