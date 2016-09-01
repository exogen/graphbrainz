import { toEntityType } from './types/helpers'
import {
  getOffsetWithDefault,
  connectionFromArray,
  connectionFromArraySlice
} from 'graphql-relay'
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

export function lookupResolver () {
  return (root, { mbid }, { lookupLoader }, info) => {
    const entityType = toEntityType(info.fieldName)
    const params = includeRelations({}, info)
    return lookupLoader.load([entityType, mbid, params])
  }
}

export function browseResolver () {
  return (source, { first = 25, after, ...args }, { browseLoader }, info) => {
    const pluralName = toEntityType(info.fieldName)
    let singularName = pluralName
    if (pluralName.endsWith('s')) {
      singularName = pluralName.slice(0, -1)
    }
    const { type, types, status, statuses, ...moreParams } = args
    let params = {
      ...moreParams,
      type: [],
      status: [],
      limit: first,
      offset: getOffsetWithDefault(after, 0)
    }
    params = includeSubqueries(params, info)
    params = includeRelations(params, info)
    if (type) {
      params.type.push(type)
    }
    if (types) {
      params.type.push(...types)
    }
    if (status) {
      params.status.push(status)
    }
    if (statuses) {
      params.status.push(...statuses)
    }
    return browseLoader.load([singularName, params]).then(list => {
      const {
        [pluralName]: arraySlice,
        [`${singularName}-offset`]: sliceStart,
        [`${singularName}-count`]: arrayLength
      } = list
      const meta = { sliceStart, arrayLength }
      return connectionFromArraySlice(arraySlice, { first, after }, meta)
    })
  }
}

export function searchResolver () {
  return (source, { first = 25, after, ...args }, { searchLoader }, info) => {
    const pluralName = toEntityType(info.fieldName)
    let singularName = pluralName
    if (pluralName.endsWith('s')) {
      singularName = pluralName.slice(0, -1)
    }
    const { query, ...params } = args
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
  return (source, args, context, info) => {
    const targetType = toEntityType(info.fieldName).replace('-', '_')
    const relations = source.filter(relation => {
      if (relation['target-type'] !== targetType) {
        return false
      }
      if (args.direction != null && relation.direction !== args.direction) {
        return false
      }
      if (args.type != null && relation.type !== args.type) {
        return false
      }
      if (args.typeID != null && relation['type-id'] !== args.typeID) {
        return false
      }
      return true
    })
    return connectionFromArray(relations, args)
  }
}

export function linkedResolver () {
  return (source, args, context, info) => {
    const parentEntity = toEntityType(info.parentType.name)
    args = { ...args, [parentEntity]: source.id }
    return browseResolver()(source, args, context, info)
  }
}
