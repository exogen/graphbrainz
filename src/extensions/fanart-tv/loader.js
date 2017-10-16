import DataLoader from 'dataloader'
import request from 'request'

export default function createLoader (options) {
  return new DataLoader(keys => {
    return Promise.all(keys.map(key => {
      if (!options.apiKey) {
        throw new Error('No API key was configured for the fanart.tv extension.')
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
        case 'releaseGroup':
          url += `albums/${id}`
          break
        default:
          throw new Error(`Entity type unsupported: ${entityType}`)
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
          } else if (response.statusCode > 400) {
            reject(response)
          } else {
            resolve(body)
          }
        })
      })
    }))
  })
}
