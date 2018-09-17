import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} from 'graphql/type'
import Disc from './disc'
import Track from './track'
import { resolveHyphenated, fieldWithID } from './helpers'
import { createSubqueryResolver } from '../resolvers'

export default new GraphQLObjectType({
  name: 'Medium',
  description: `A medium is the actual physical medium the audio content is
stored upon. This means that each CD in a multi-disc release will be entered as
separate mediums within the release, and that both sides of a vinyl record or
cassette will exist on one medium. Mediums have a format (e.g. CD, DVD, vinyl,
cassette) and can optionally also have a title.`,
  fields: () => ({
    title: {
      type: GraphQLString,
      description: 'The title of this particular medium.'
    },
    ...fieldWithID('format', {
      description: `The [format](https://musicbrainz.org/doc/Release/Format) of
the medium (e.g. CD, DVD, vinyl, cassette).`
    }),
    position: {
      type: GraphQLInt,
      description: `The order of this medium in the release (for example, in a
multi-disc release).`
    },
    trackCount: {
      type: GraphQLInt,
      description: 'The number of audio tracks on this medium.',
      resolve: resolveHyphenated
    },
    discs: {
      type: new GraphQLList(Disc),
      description:
        'A list of physical discs and their disc IDs for this medium.'
    },
    tracks: {
      type: new GraphQLList(Track),
      description: 'The list of tracks on the given media.',
      resolve: createSubqueryResolver({
        inc: 'recordings',
        key: 'tracks'
      })
    }
  })
})
