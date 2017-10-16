import schema from './schema'
import resolvers from './resolvers'
import createLoader from './loader'

export default {
  name: 'fanart.tv',
  description:
    'Retrieve high quality artwork for artists, releases, and labels from ' +
    'the fanart.tv API.',
  extendContext (context, options) {
    let apiKey = process.env.FANART_API_KEY
    if (options.fanArt && options.fanArt.apiKey) {
      apiKey = options.fanArt.apiKey
    }
    return {
      ...context,
      loaders: {
        ...context.loaders,
        fanArt: createLoader({ apiKey })
      }
    }
  },
  extendSchema: {
    schemas: [schema],
    resolvers
  }
}
