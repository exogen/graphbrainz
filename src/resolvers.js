import { toEntityType } from './types/helpers'
import { getOffsetWithDefault, connectionFromArraySlice } from 'graphql-relay'
import { getFields, extendIncludes } from './util'

export function includeRelations (params, info) {
  let fields = getFields(info)
  if (info.fieldName !== 'relations') {
    if (fields.relations) {
      fields = getFields(fields.relations)
    } else {
      return params
    }
  }
  if (fields) {
    const relations = Object.keys(fields)
    const includeRels = relations.map(key => `${toEntityType(key)}-rels`)
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
  const fields = getFields(info)
  if (fields.artistCredit) {
    params = {
      ...params,
      inc: extendIncludes(params.inc, ['artist-credits'])
    }
  }
  return params
}

export function lookupResolver (entityType, extraParams = {}) {
  return (root, { id }, { lookupLoader }, info) => {
    const params = includeRelations(extraParams, info)
    entityType = entityType || toEntityType(info.fieldName)
    return lookupLoader.load([entityType, id, params])
  }
}

export function browseResolver () {
  return (source, args, { browseLoader }, info) => {
    const pluralName = toEntityType(info.fieldName)
    let singularName = pluralName
    if (pluralName.endsWith('s')) {
      singularName = pluralName.slice(0, -1)
    }
    const params = args
    return browseLoader.load([singularName, params])
  }
}

export function searchResolver () {
  return (source, args, { searchLoader }, info) => {
    const pluralName = toEntityType(info.fieldName)
    let singularName = pluralName
    if (pluralName.endsWith('s')) {
      singularName = pluralName.slice(0, -1)
    }
    const { query, first, after, ...params } = args
    params.limit = first
    params.offset = getOffsetWithDefault(after, 0)
    return searchLoader.load([singularName, query, params]).then(list => {
      const {
        [pluralName]: arraySlice,
        offset: sliceStart,
        count: arrayLength
      } = list
      const meta = { sliceStart, arrayLength }
      return connectionFromArraySlice(arraySlice, { first, after }, meta)
    })
  }
}

export function relationResolver () {
  return (source, { offset = 0,
                    limit,
                    direction,
                    type,
                    typeID }, { lookupLoader }, info) => {
    const targetType = toEntityType(info.fieldName).replace('-', '_')
    return source.filter(relation => {
      if (relation['target-type'] !== targetType) {
        return false
      }
      if (direction != null && relation.direction !== direction) {
        return false
      }
      if (type != null && relation.type !== type) {
        return false
      }
      if (typeID != null && relation['type-id'] !== typeID) {
        return false
      }
      return true
    }).slice(offset, limit == null ? undefined : offset + limit)
  }
}

export function linkedResolver () {
  return (source, args, { browseLoader }, info) => {
    const pluralName = toEntityType(info.fieldName)
    let singularName = pluralName
    if (pluralName.endsWith('s')) {
      singularName = pluralName.slice(0, -1)
    }
    const parentEntity = toEntityType(info.parentType.name)
    let params = {
      [parentEntity]: source.id,
      type: [],
      status: [],
      limit: args.limit,
      offset: args.offset
    }
    params = includeSubqueries(params, info)
    params = includeRelations(params, info)
    if (args.type) {
      params.type.push(args.type)
    }
    if (args.types) {
      params.type.push(...args.types)
    }
    if (args.status) {
      params.status.push(args.status)
    }
    if (args.statuses) {
      params.status.push(...args.statuses)
    }
    return browseLoader.load([singularName, params]).then(list => {
      return list[pluralName]
    })
  }
}
