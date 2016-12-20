import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt
} from 'graphql/type'
import { URLString } from './scalars'

export const CoverArtImageThumbnails = new GraphQLObjectType({
  name: 'CoverArtImageThumbnails',
  description: `URLs for thumbnails of different sizes for a particular piece of
cover art.`,
  fields: () => ({
    small: {
      type: URLString,
      description: `The URL of a small version of the cover art, where the
maximum dimension is 250px.`
    },
    large: {
      type: URLString,
      description: `The URL of a large version of the cover art, where the
maximum dimension is 500px.`
    }
  })
})

export default new GraphQLObjectType({
  name: 'CoverArtImage',
  description: 'An individual piece of album artwork from the [Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive).',
  fields: () => ({
    fileID: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The Internet Archive’s internal file ID for the image.',
      resolve: image => image.id
    },
    image: {
      type: new GraphQLNonNull(URLString),
      description: 'The URL at which the image can be found.'
    },
    thumbnails: {
      type: CoverArtImageThumbnails,
      description: 'A set of thumbnails for the image.'
    },
    front: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether this image depicts the “main front” of the release.'
    },
    back: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether this image depicts the “main back” of the release.'
    },
    types: {
      type: new GraphQLList(GraphQLString),
      description: `A list of [image types](https://musicbrainz.org/doc/Cover_Art/Types)
describing what part(s) of the release the image includes.`
    },
    edit: {
      type: GraphQLInt,
      description: 'The MusicBrainz edit ID.'
    },
    approved: {
      type: GraphQLBoolean,
      description: 'Whether the image was approved by the MusicBrainz edit system.'
    },
    comment: {
      type: GraphQLString,
      description: 'A free-text comment left for the image.'
    }
  })
})
