import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql/type'
import Entity from './entity'
import Alias from './alias'
import Area from './area'
import {
  getFallback,
  fieldWithID,
  id,
  name,
  sortName,
  disambiguation,
  lifeSpan,
  recordings,
  releases,
  releaseGroups,
  works,
  relations,
  createPageType
} from './helpers'

const Artist = new GraphQLObjectType({
  name: 'Artist',
  description:
    'An artist is generally a musician, a group of musicians, or another ' +
    'music professional (composer, engineer, illustrator, producer, etc.)',
  interfaces: () => [Entity],
  fields: () => ({
    id,
    name,
    sortName,
    disambiguation,
    aliases: {
      type: new GraphQLList(Alias),
      resolve: (source, args, { lookupLoader }, info) => {
        const key = 'aliases'
        if (key in source) {
          return source[key]
        } else {
          const { entityType, id } = source
          const params = { inc: ['aliases'] }
          return lookupLoader.load([entityType, id, params]).then(entity => {
            return entity[key]
          })
        }
      }
    },
    country: { type: GraphQLString },
    area: { type: Area },
    beginArea: {
      type: Area,
      resolve: getFallback(['begin-area', 'begin_area'])
    },
    endArea: {
      type: Area,
      resolve: getFallback(['end-area', 'end_area'])
    },
    lifeSpan,
    ...fieldWithID('gender'),
    ...fieldWithID('type'),
    recordings,
    releases,
    releaseGroups,
    works,
    relations
  })
})

export const ArtistPage = createPageType(Artist)
export default Artist
