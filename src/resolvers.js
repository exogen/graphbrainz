import { toDashed, toSingular } from './types/helpers'
import {
  getOffsetWithDefault,
  connectionFromArray,
  connectionFromArraySlice
} from 'graphql-relay'
import { getFields, extendIncludes } from './util'

export function includeRelationships (params, info, fragments = info.fragments) {
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

export function includeSubqueries (params, info, fragments = info.fragments) {
  const subqueryIncludes = {
    aliases: 'aliases',
    artistCredit: 'artist-credits',
    artistCredits: 'artist-credits',
    tags: 'tags'
  }
  let fields = getFields(info, fragments)
  const include = []
  for (const key in subqueryIncludes) {
    if (fields[key]) {
      const value = subqueryIncludes[key]
      include.push(value)
    }
  }
  params = {
    ...params,
    inc: extendIncludes(params.inc, include)
  }
  if (fields.edges) {
    fields = getFields(fields.edges, fragments)
    if (fields.node) {
      params = includeSubqueries(params, fields.node, fragments)
    }
  }
  return params
}

export function resolveLookup (root, { mbid, ...params }, { loaders }, info) {
  if (!mbid && !params.resource) {
    throw new Error('Lookups by a field other than MBID must provide: resource')
  }
  const entityType = toDashed(info.fieldName)
  params = includeSubqueries(params, info)
  params = includeRelationships(params, info)
  return loaders.lookup.load([entityType, mbid, params])
}

export function resolveBrowse (root, {
  first,
  after,
  type = [],
  status = [],
  ...args
}, { loaders }, info) {
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
  return loaders.browse.load([singularName, params]).then(list => {
    // Grab the list, offet, and count from the response and use them to build
    // a Relay connection object.
    const {
      [pluralName]: arraySlice,
      [`${singularName}-offset`]: sliceStart,
      [`${singularName}-count`]: arrayLength
    } = list
    const meta = { sliceStart, arrayLength }
    return {
      totalCount: arrayLength,
      ...connectionFromArraySlice(arraySlice, { first, after }, meta)
    }
  })
}

export function resolveSearch (root, {
  after,
  first,
  query,
  ...args
}, { loaders }, info) {
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
    const connection = {
      totalCount: arrayLength,
      ...connectionFromArraySlice(arraySlice, { first, after }, meta)
    }
    // Move the `score` field up to the edge object and make sure it's a
    // number (MusicBrainz returns a string).
    connection.edges.forEach(edge => { edge.score = +edge.node.score })
    return connection
  })
}

export function resolveRelationship (rels, args, context, info) {
  const targetType = toDashed(toSingular(info.fieldName)).replace('-', '_')
  // There's no way to filter these at the API level, so do it here.
  const matches = rels.filter(rel => {
    if (rel['target-type'] !== targetType) {
      return false
    }
    if (args.direction != null && rel.direction !== args.direction) {
      return false
    }
    if (args.type != null && rel.type !== args.type) {
      return false
    }
    if (args.typeID != null && rel['type-id'] !== args.typeID) {
      return false
    }
    return true
  })
  return {
    totalCount: matches.length,
    ...connectionFromArray(matches, args)
  }
}

export function resolveLinked (entity, args, context, info) {
  const parentEntity = toDashed(info.parentType.name)
  args = { ...args, [parentEntity]: entity.id }
  return resolveBrowse(entity, args, context, info)
}

/**
 * If we weren't smart enough or weren't able to include the `inc` parameter
 * for a particular field that's being requested, make another request to grab
 * it (after making sure it isn't already available).
 */
export function createSubqueryResolver ({ inc, key } = {}, handler = value => value) {
  return (entity, args, { loaders }, info) => {
    key = key || toDashed(info.fieldName)
    let promise
    if (key in entity || (entity._inc && entity._inc.indexOf(key) >= 0)) {
      promise = Promise.resolve(entity)
    } else {
      const { _type: entityType, id } = entity
      const params = { inc: [inc || key] }
      promise = loaders.lookup.load([entityType, id, params])
    }
    return promise.then(entity => handler(entity[key], args))
  }
}
