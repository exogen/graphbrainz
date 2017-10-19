import createLoaders from './loaders'

const debug = require('debug')('graphbrainz:context')

export function extendContext (extension, context, options) {
  if (extension.extendContext) {
    if (typeof extension.extendContext === 'function') {
      debug(`Extending context via a function from the “${extension.name}” extension.`)
      context = extension.extendContext(context, options)
    } else {
      throw new Error(
        `Extension “${extension.name}” contains an invalid \`extendContext\` ` +
        `value: ${extension.extendContext}`
      )
    }
  }
  return context
}

export function createContext (options) {
  const { client } = options
  const loaders = createLoaders(client)
  const context = { client, loaders }
  return options.extensions.reduce((context, extension) => {
    return extendContext(extension, context, options)
  }, context)
}
