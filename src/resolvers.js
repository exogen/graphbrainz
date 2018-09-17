import { toDashed, toSingular } from './types/helpers'
import {
  getOffsetWithDefault,
  connectionFromArray,
  connectionFromArraySlice
} from 'graphql-relay'
import { getFields, extendIncludes } from './util'

export function includeRelationships(params, info, fragments = info.fragments) {
  let fields = getFields(info, fragments)
  if (info.fieldName !== 'relationships') {
    if (fields.relationships) {
      fields = getFields(fields.relationships, fragments)
    } else {
      if (fields.edges) {
        fields = getFields(fields.edges, fragments)
        if (fields.node) {
          return includeRelationships(params, fields.node, fragments)
        }
      }
      return params
    }
  }
  if (fields) {
    const relationships = Object.keys(fields)
    const includeRels = relationships.map(field => {
      return `${toDashed(toSingular(field))}-rels`
    })
    if (includeRels.length) {
      params = {
        ...params,
        inc: extendIncludes(params.inc, includeRels)
      }
    }
  }
  return params
}

export function includeSubqueries(params, info, fragments = info.fragments) {
  const subqueryIncludes = {
    aliases: ['aliases'],
    artistCredit: ['artist-credits'],
    artistCredits: ['artist-credits'],
    isrcs: ['isrcs'],
    media: ['media'],
    'media.discs': ['discids'],
    'media.tracks': ['recordings'],
    rating: ['ratings'],
    tags: ['tags']
  }
  let fields = getFields(info, fragments, 1)
  const include = []
  for (const key in subqueryIncludes) {
    const field = fields[key]
    if (field) {
      const value = subqueryIncludes[key]
      include.push(...value)
    }
  }
  params = {
    ...params,
    inc: extendIncludes(params.inc, include)
  }
  if (fields['edges.node']) {
    params = includeSubqueries(params, fields['edges.node'], fragments)
  }
  return params
}

export function resolveLookup(root, { mbid, ...params }, { loaders }, info) {
  if (!mbid && !params.resource) {
    throw new Error('Lookups by a field other than MBID must provide: resource')
  }
  const entityType = toDashed(info.fieldName)
  params = includeSubqueries(params, info)
  params = includeRelationships(params, info)
  return loaders.lookup.load([entityType, mbid, params])
}

export function resolveBrowse(
  root,
  { first, after, type = [], status = [], discID, isrc, iswc, ...args },
  { loaders },
  info
) {
  const pluralName = toDashed(info.fieldName)
  const singularName = toSingular(pluralName)
  let params = {
    ...args,
    type,
    status,
    limit: first,
    offset: getOffsetWithDefault(after, -1) + 1 || undefined
  }
  params = includeSubqueries(params, info)
  params = includeRelationships(params, info, info.fragments)
  const formatParam = value => value.toLowerCase().replace(/ /g, '')
  params.type = params.type.map(formatParam)
  params.status = params.status.map(formatParam)
  let request
  if (discID) {
    request = loaders.lookup.load(['discid', discID, params])
    // If fetching releases by disc ID, they will already include the `media`
    // and `discids` subqueries, and it is invalid to specify them.
    if (params.inc) {
      params.inc = params.inc.filter(value => {
        return value !== 'media' && value !== 'discids'
      })
    }
  } else if (isrc) {
    request = loaders.lookup.load(['isrc', isrc, params]).then(result => {
      result[pluralName].forEach(entity => {
        entity._type = singularName
      })
      return result
    })
  } else if (iswc) {
    request = loaders.lookup.load(['iswc', iswc, params])
  } else {
    request = loaders.browse.load([singularName, params])
  }
  return request.then(list => {
    // Grab the list, offet, and count from the response and use them to build
    // a Relay connection object.
    const {
      [pluralName]: arraySlice,
      [`${singularName}-offset`]: sliceStart = 0,
      [`${singularName}-count`]: arrayLength = arraySlice.length
    } = list
    const meta = { sliceStart, arrayLength }
    const connection = connectionFromArraySlice(
      arraySlice,
      { first, after },
      meta
    )
    return {
      nodes: connection.edges.map(edge => edge.node),
      totalCount: arrayLength,
      ...connection
    }
  })
}

export function resolveSearch(
  root,
  { after, first, query, ...args },
  { loaders },
  info
) {
  const pluralName = toDashed(info.fieldName)
  const singularName = toSingular(pluralName)
  let params = {
    ...args,
    limit: first,
    offset: getOffsetWithDefault(after, -1) + 1 || undefined
  }
  params = includeSubqueries(params, info)
  return loaders.search.load([singularName, query, params]).then(list => {
    const {
      [pluralName]: arraySlice,
      offset: sliceStart,
      count: arrayLength
    } = list
    const meta = { sliceStart, arrayLength }
    const connection = connectionFromArraySlice(
      arraySlice,
      { first, after },
      meta
    )
    // Move the `score` field up to the edge object and make sure it's a
    // number (MusicBrainz returns a string).
    const edges = connection.edges.map(edge => ({
      ...edge,
      score: +edge.node.score
    }))
    const connectionWithExtras = {
      nodes: edges.map(edge => edge.node),
      totalCount: arrayLength,
      ...connection,
      edges
    }
    return connectionWithExtras
  })
}

export function resolveRelationship(rels, args, context, info) {
  const targetType = toDashed(toSingular(info.fieldName)).replace('-', '_')
  let matches = rels.filter(rel => rel['target-type'] === targetType)
  // There's no way to filter these at the API level, so do it here.
  if (args.direction != null) {
    matches = matches.filter(rel => rel.direction === args.direction)
  }
  if (args.type != null) {
    matches = matches.filter(rel => rel.type === args.type)
  }
  if (args.typeID != null) {
    matches = matches.filter(rel => rel['type-id'] === args.typeID)
  }
  const connection = connectionFromArray(matches, args)
  return {
    nodes: connection.edges.map(edge => edge.node),
    totalCount: matches.length,
    ...connection
  }
}

export function resolveLinked(entity, args, context, info) {
  const parentEntity = toDashed(info.parentType.name)
  args = { ...args, [parentEntity]: entity.id }
  return resolveBrowse(entity, args, context, info)
}

/**
 * If we weren't smart enough or weren't able to include the `inc` parameter
 * for a particular field that's being requested, make another request to grab
 * it (after making sure it isn't already available).
 */
export function createSubqueryResolver(
  { inc, key } = {},
  handler = value => value
) {
  return (entity, args, { loaders }, info) => {
    key = key || toDashed(info.fieldName)
    let promise
    if (key in entity) {
      promise = Promise.resolve(entity)
    } else {
      const { _type: entityType, id } = entity
      const params = { inc: [inc || key] }
      promise = loaders.lookup.load([entityType, id, params])
    }
    return promise.then(entity => handler(entity[key], args))
  }
}

export function resolveDiscReleases(disc, args, context, info) {
  const { releases } = disc
  if (releases != null) {
    const connection = connectionFromArray(releases, args)
    return {
      nodes: connection.edges.map(edge => edge.node),
      totalCount: releases.length,
      ...connection
    }
  }
  args = { ...args, discID: disc.id }
  return resolveBrowse(disc, args, context, info)
}
