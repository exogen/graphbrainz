import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql/type'
import { connectionDefinitions } from 'graphql-relay'
import Node from './node'
import Entity from './entity'
import Alias from './alias'
import Area from './area'
import {
  getFallback,
  fieldWithID,
  id,
  mbid,
  name,
  sortName,
  disambiguation,
  lifeSpan,
  recordings,
  releases,
  releaseGroups,
  works,
  relationships
} from './helpers'

const Artist = new GraphQLObjectType({
  name: 'Artist',
  description: `An [artist](https://musicbrainz.org/doc/Artist) is generally a
musician, group of musicians, or other music professional (like a producer or
engineer). Occasionally, it can also be a non-musical person (like a
photographer, an illustrator, or a poet whose writings are set to music), or
even a fictional character.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    name,
    sortName,
    disambiguation,
    aliases: {
      type: new GraphQLList(Alias),
      description: `[Aliases](https://musicbrainz.org/doc/Aliases) are used to
store alternate names or misspellings.`,
      resolve: (source, args, { loaders }, info) => {
        const key = 'aliases'
        if (key in source) {
          return source[key]
        } else {
          const { entityType, id } = source
          const params = { inc: ['aliases'] }
          return loaders.lookup.load([entityType, id, params]).then(entity => {
            return entity[key]
          })
        }
      }
    },
    country: {
      type: GraphQLString,
      description: `The country with which an artist is primarily identified. It
is often, but not always, its birth/formation country.`
    },
    area: {
      type: Area,
      description: `The area with which an artist is primarily identified. It
is often, but not always, its birth/formation country.`
    },
    beginArea: {
      type: Area,
      description: `The area in which an artist began their career (or where
were born, if the artist is a person).`,
      resolve: getFallback(['begin-area', 'begin_area'])
    },
    endArea: {
      type: Area,
      description: `The area in which an artist ended their career (or where
they died, if the artist is a person).`,
      resolve: getFallback(['end-area', 'end_area'])
    },
    lifeSpan,
    ...fieldWithID('gender', {
      description: `Whether a person or character identifies as male, female, or
neither. Groups do not have genders.`
    }),
    ...fieldWithID('type', {
      description: 'Whether an artist is a person, a group, or something else.'
    }),
    recordings,
    releases,
    releaseGroups,
    works,
    relationships
  })
})

const { connectionType: ArtistConnection } = connectionDefinitions({ nodeType: Artist })
export { ArtistConnection }
export default Artist
