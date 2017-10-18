import schema from './schema'
import resolvers from './resolvers'
import createLoader from './loader'

export default {
  name: 'fanart.tv',
  description:
    'Retrieve high quality artwork for artists, releases, and labels from ' +
    '[fanart.tv](https://fanart.tv/).',
  extendContext (context, { fanArt = {} } = {}) {
    const { apiKey = process.env.FANART_API_KEY } = fanArt
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
