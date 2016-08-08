import dashify from 'dashify'
import { GraphQLString, GraphQLList } from 'graphql/type'
import MBID from './mbid'

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

export function getUnderscored (source, args, context, info) {
  const name = dashify(info.fieldName).replace('-', '_')
  return source[name]
}

export function getByline (data) {
  const credit = data['artist-credit']
  if (credit && credit.length) {
    return credit.reduce((byline, credit) => {
      return byline + credit.name + credit.joinphrase
    }, '')
  }
}
