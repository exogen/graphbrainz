import DataLoader from 'dataloader'
import request from 'request'

const debug = require('debug')('graphbrainz:extensions:fanart-tv')

export default function createLoader (options) {
  const loader = new DataLoader(keys => {
    return Promise.all(keys.map(key => {
      if (!options.apiKey) {
        return Promise.reject(new Error(
          'No API key was configured for the fanart.tv extension.'
        ))
      }
      const requestOptions = {
        qs: { api_key: options.apiKey },
        json: true
      }
      const [ entityType, id ] = key
      let url = 'http://webservice.fanart.tv/v3/music/'
      switch (entityType) {
        case 'artist':
          url += id
          break
        case 'label':
          url += `labels/${id}`
          break
        case 'release-group':
          url += `albums/${id}`
          break
        default:
          return Promise.reject(new Error(`Entity type unsupported: ${entityType}`))
      }
      return new Promise((resolve, reject) => {
        request(url, requestOptions, (err, response, body) => {
          if (err) {
            reject(err)
          } else if (response.statusCode === 404) {
            resolve({
              artistbackground: [],
              artistthumb: [],
              musiclogo: [],
              hdmusiclogo: [],
              musicbanner: [],
              musiclabel: [],
              albums: {}
            })
          } else if (response.statusCode >= 400) {
            reject(new Error(`Status: ${response.statusCode}`))
          } else {
            if (entityType === 'artist') {
              const releaseGroupIDs = Object.keys(body.albums)
              debug(`Priming album cache with ${releaseGroupIDs.length} album(s).`)
              releaseGroupIDs.forEach(key => loader.prime(['release-group', key], body))
            }
            resolve(body)
          }
        })
      })
    }))
  }, {
    cacheKeyFn: ([ entityType, id ]) => `${entityType}/${id}`
  })
  return loader
}
