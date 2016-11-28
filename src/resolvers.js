import { toDashed, toSingular } from './types/helpers'
import {
  getOffsetWithDefault,
  connectionFromArray,
  connectionFromArraySlice
} from 'graphql-relay'
import { getFields, extendIncludes } from './util'

export function includeRelationships (params, info) {
  let fields = getFields(info)
  if (info.fieldName !== 'relationships') {
    if (fields.relationships) {
      fields = getFields(fields.relationships)
    } else {
      if (fields.edges) {
        fields = getFields(fields.edges)
        if (fields.node) {
          return includeRelationships(params, fields.node)
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

export function includeSubqueries (params, info) {
  const subqueryIncludes = {
    aliases: 'aliases',
    artistCredit: 'artist-credits',
    tags: 'tags'
  }
  let fields = getFields(info)
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
    fields = getFields(fields.edges)
    if (fields.node) {
      params = includeSubqueries(params, fields.node)
    }
  }
  return params
}

export function lookupResolver () {
  return (root, { mbid }, { loaders }, info) => {
    const entityType = toDashed(info.fieldName)
    let params = includeSubqueries({}, info)
    params = includeRelationships(params, info)
    return loaders.lookup.load([entityType, mbid, params])
  }
}

export function browseResolver () {
  return (source, { first = 25, after, type = [], status = [], ...args }, { loaders }, info) => {
    const pluralName = toDashed(info.fieldName)
    const singularName = toSingular(pluralName)
    let params = {
      ...args,
      type,
      status,
      limit: first,
      offset: getOffsetWithDefault(after, -1) + 1
    }
    params = includeSubqueries(params, info)
    params = includeRelationships(params, info)
    const formatValue = value => value.toLowerCase().replace(/ /g, '')
    params.type = params.type.map(formatValue)
    params.status = params.status.map(formatValue)
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
}

export function searchResolver () {
  return (source, { first = 25, after, query, ...args }, { loaders }, info) => {
    const pluralName = toDashed(info.fieldName)
    const singularName = toSingular(pluralName)
    let params = {
      ...args,
      limit: first,
      offset: getOffsetWithDefault(after, -1) + 1
    }
    params = includeSubqueries(params, info)
    return loaders.search.load([singularName, query, params]).then(list => {
      const {
        [pluralName]: arraySlice,
        offset: sliceStart,
        count: arrayLength
      } = list
      const meta = { sliceStart, arrayLength }
      return {
        totalCount: arrayLength,
        ...connectionFromArraySlice(arraySlice, { first, after }, meta)
      }
    })
  }
}

export function relationshipResolver () {
  return (source, args, context, info) => {
    const targetType = toDashed(toSingular(info.fieldName)).replace('-', '_')
    // There's no way to filter these at the API level, so do it here.
    const relationships = source.filter(rel => {
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
      totalCount: relationships.length,
      ...connectionFromArray(relationships, args)
    }
  }
}

export function linkedResolver () {
  return (source, args, context, info) => {
    const parentEntity = toDashed(info.parentType.name)
    args = { ...args, [parentEntity]: source.id }
    return browseResolver()(source, args, context, info)
  }
}

const noop = value => value

/**
 * If we weren't smart enough or weren't able to include the `inc` parameter
 * for a particular field that's being requested, make another request to grab
 * it (after making sure it isn't already available).
 */
export function subqueryResolver (includeValue, handler = noop) {
  return (source, args, { loaders }, info) => {
    const key = toDashed(info.fieldName)
    if (key in source || (source._inc && source._inc.indexOf(key) !== -1)) {
      return handler(source[key], args)
    } else {
      const { _type: entityType, id } = source
      const params = { inc: [includeValue || key] }
      return loaders.lookup.load([entityType, id, params]).then(entity => {
        return handler(entity[key], args)
      })
    }
  }
}
