import DataLoader from 'dataloader'
import request from 'request'

const debug = require('debug')('graphbrainz:extensions:the-audio-db')

const endpoints = new Map([
  ['artist', 'artist-mb.php'],
  ['recording', 'track-mb.php'],
  ['release-group', 'album-mb.php']
])

export default function createLoader (options) {
  return new DataLoader(keys => {
    return Promise.all(keys.map(key => {
      if (!options.apiKey) {
        return Promise.reject(new Error(
          'No API key was configured for TheAudioDB extension.'
        ))
      }
      const requestOptions = { json: true }
      const [ entityType, id ] = key
      const baseURL = 'http://www.theaudiodb.com/api/v1/json'
      const endpoint = endpoints.get(entityType)
      if (!endpoint) {
        return Promise.reject(new Error(`Entity type unsupported: ${entityType}`))
      }
      const url = `${baseURL}/${options.apiKey}/${endpoint}?i=${id}`
      return new Promise((resolve, reject) => {
        debug(`Sending request. url=${url}`)
        request(url, requestOptions, (err, response, body) => {
          if (err) {
            reject(err)
          } else if (response.statusCode >= 400) {
            reject(new Error(`Status: ${response.statusCode}`))
          } else {
            switch (entityType) {
              case 'artist':
                if (body.artists && body.artists.length === 1) {
                  resolve(body.artists[0])
                } else {
                  resolve(null)
                }
                break
              case 'recording':
                if (body.track && body.track.length === 1) {
                  resolve(body.track[0])
                } else {
                  resolve(null)
                }
                break
              case 'release-group':
                if (body.album && body.album.length === 1) {
                  resolve(body.album[0])
                } else {
                  resolve(null)
                }
                break
              default:
                resolve({})
            }
          }
        })
      })
    }))
  }, {
    cacheKeyFn: ([ entityType, id ]) => `${entityType}/${id}`
  })
}
