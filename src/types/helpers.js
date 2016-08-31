import dashify from 'dashify'
import pascalCase from 'pascalcase'
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'
import { globalIdField } from 'graphql-relay'
import { MBID } from './scalars'
import { ReleaseGroupType, ReleaseStatus } from './enums'
import ArtistCredit from './artist-credit'
import Artist from './artist'
import Event from './event'
import Label from './label'
import LifeSpan from './life-span'
import Place from './place'
import Recording from './recording'
import Relation from './relation'
import Release from './release'
import ReleaseGroup from './release-group'
import Work from './work'
import {
  lookupResolver,
  linkedResolver,
  relationResolver,
  searchResolver,
  includeRelations
} from '../resolvers'

export const toNodeType = pascalCase
export const toEntityType = dashify

export function getByline (data) {
  const credit = data['artist-credit']
  if (credit && credit.length) {
    return credit.reduce((byline, credit) => {
      return byline + credit.name + credit.joinphrase
    }, '')
  }
}

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

export function lookupQuery (entity, params) {
  return {
    type: entity,
    description: `Look up a specific ${entity.name} by its MBID.`,
    args: { id },
    resolve: lookupResolver(dashify(entity.name), params)
  }
}

export function searchQuery (entityPage) {
  const entity = entityPage.getFields().results.type.ofType.ofType
  return {
    type: entityPage,
    description: `Search for ${entity.name} entities.`,
    args: {
      query: { type: new GraphQLNonNull(GraphQLString) },
      limit: { type: GraphQLInt },
      offset: { type: GraphQLInt }
    },
    resolve: searchResolver()
  }
}

export const id = globalIdField()
export const mbid = { type: new GraphQLNonNull(MBID) }
export const name = { type: GraphQLString }
export const sortName = { type: GraphQLString, resolve: getHyphenated }
export const title = { type: GraphQLString }
export const disambiguation = { type: GraphQLString }
export const lifeSpan = { type: LifeSpan, resolve: getHyphenated }

export const relation = {
  type: new GraphQLList(Relation),
  args: {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt },
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
    const entityType = dashify(info.parentType.name)
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

export const artists = {
  type: new GraphQLList(Artist),
  args: {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt }
  },
  resolve: linkedResolver()
}

export const events = {
  type: new GraphQLList(Event),
  args: {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt }
  },
  resolve: linkedResolver()
}

export const labels = {
  type: new GraphQLList(Label),
  args: {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt }
  },
  resolve: linkedResolver()
}

export const places = {
  type: new GraphQLList(Place),
  args: {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt }
  },
  resolve: linkedResolver()
}

export const recordings = {
  type: new GraphQLList(Recording),
  args: {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt }
  },
  resolve: linkedResolver()
}

export const releases = {
  type: new GraphQLList(Release),
  args: {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt },
    type: { type: ReleaseGroupType },
    types: { type: new GraphQLList(ReleaseGroupType) },
    status: { type: ReleaseStatus },
    statuses: { type: new GraphQLList(ReleaseStatus) }
  },
  resolve: linkedResolver()
}

export const releaseGroups = {
  type: new GraphQLList(ReleaseGroup),
  args: {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt },
    type: { type: ReleaseGroupType },
    types: { type: new GraphQLList(ReleaseGroupType) }
  },
  resolve: linkedResolver()
}

export const works = {
  type: new GraphQLList(Work),
  args: {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt }
  },
  resolve: linkedResolver()
}
