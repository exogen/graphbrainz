import dashify from 'dashify'
import pascalCase from 'pascalcase'
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'
import {
  globalIdField,
  connectionArgs,
  forwardConnectionArgs
} from 'graphql-relay'
import { MBID } from './scalars'
import { ReleaseGroupType, ReleaseStatus } from './enums'
import ArtistCredit from './artist-credit'
import { ArtistConnection } from './artist'
import { EventConnection } from './event'
import { LabelConnection } from './label'
import LifeSpan from './life-span'
import { PlaceConnection } from './place'
import { RecordingConnection } from './recording'
import Relation from './relation'
import { ReleaseConnection } from './release'
import { ReleaseGroupConnection } from './release-group'
import { WorkConnection } from './work'
import {
  linkedResolver,
  relationResolver,
  includeRelations
} from '../resolvers'

export const toNodeType = pascalCase
export const toEntityType = dashify

export function fieldWithID (name, config = {}) {
  config = {
    type: GraphQLString,
    resolve: getHyphenated,
    ...config
  }
  const isPlural = config.type instanceof GraphQLList
  const singularName = isPlural && name.endsWith('s') ? name.slice(0, -1) : name
  const idName = isPlural ? `${singularName}IDs` : `${name}ID`
  const idConfig = {
    type: isPlural ? new GraphQLList(MBID) : MBID,
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
export const name = { type: GraphQLString }
export const sortName = { type: GraphQLString, resolve: getHyphenated }
export const title = { type: GraphQLString }
export const disambiguation = { type: GraphQLString }
export const lifeSpan = { type: LifeSpan, resolve: getHyphenated }

function linkedQuery (connectionType, args) {
  return {
    type: connectionType,
    args: {
      ...forwardConnectionArgs,
      ...args
    },
    resolve: linkedResolver()
  }
}

export const relation = {
  type: new GraphQLList(Relation),
  args: {
    ...connectionArgs,
    direction: { type: GraphQLString },
    type: { type: GraphQLString },
    typeID: { type: MBID }
  },
  resolve: relationResolver()
}

export const relations = {
  type: new GraphQLObjectType({
    name: 'Relations',
    fields: () => ({
      area: relation,
      artist: relation,
      event: relation,
      instrument: relation,
      label: relation,
      place: relation,
      recording: relation,
      release: relation,
      releaseGroup: relation,
      series: relation,
      url: relation,
      work: relation
    })
  }),
  resolve: (source, args, { lookupLoader }, info) => {
    if (source.relations != null) {
      return source.relations
    }
    const entityType = toEntityType(info.parentType.name)
    const id = source.id
    const params = includeRelations({}, info)
    return lookupLoader.load([entityType, id, params]).then(entity => {
      return entity.relations
    })
  }
}

export const artistCredit = {
  type: new GraphQLList(ArtistCredit),
  resolve: (source, args, { lookupLoader }, info) => {
    const key = 'artist-credit'
    if (key in source) {
      return source[key]
    } else {
      const { entityType, id } = source
      const params = { inc: ['artists'] }
      return lookupLoader.load([entityType, id, params]).then(entity => {
        return entity[key]
      })
    }
  }
}

export const artists = linkedQuery(ArtistConnection)
export const events = linkedQuery(EventConnection)
export const labels = linkedQuery(LabelConnection)
export const places = linkedQuery(PlaceConnection)
export const recordings = linkedQuery(RecordingConnection)

export const releases = linkedQuery(ReleaseConnection, {
  type: { type: ReleaseGroupType },
  types: { type: new GraphQLList(ReleaseGroupType) },
  status: { type: ReleaseStatus },
  statuses: { type: new GraphQLList(ReleaseStatus) }
})

export const releaseGroups = linkedQuery(ReleaseGroupConnection, {
  type: { type: ReleaseGroupType },
  types: { type: new GraphQLList(ReleaseGroupType) }
})

export const works = linkedQuery(WorkConnection)
