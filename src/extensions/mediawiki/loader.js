import { URL } from 'url'
import DataLoader from 'dataloader'
import request from 'request'

const debug = require('debug')('graphbrainz:extensions:mediawiki')

export default function createLoader (options) {
  return new DataLoader(keys => {
    return Promise.all(keys.map(key => {
      const pageURL = new URL(key)
      if (!pageURL.pathname.startsWith('/wiki/')) {
        return Promise.reject(new Error(
          `MediaWiki page URL does not have the expected /wiki/ prefix: ${key}`
        ))
      }
      const title = pageURL.pathname.slice(6)
      const apiURL = new URL(key)
      apiURL.pathname = '/w/api.php'
      apiURL.searchParams.set('action', 'query')
      apiURL.searchParams.set('titles', title)
      apiURL.searchParams.set('prop', 'imageinfo')
      apiURL.searchParams.set('iiprop', 'url|size|canonicaltitle|user|extmetadata')
      apiURL.searchParams.set('format', 'json')

      return new Promise((resolve, reject) => {
        debug(`Querying MediaWiki API. url=${apiURL}`)
        request(apiURL.toString(), { json: true }, (err, response, body) => {
          if (err) {
            reject(err)
          } else if (response.statusCode >= 400) {
            reject(new Error(`Status: ${response.statusCode}`))
          } else {
            const pageIDs = Object.keys(body.query.pages)
            if (pageIDs.length !== 1) {
              reject(new Error(
                `Query returned multiple pages: [${pageIDs.join(', ')}]`
              ))
            } else {
              const imageInfo = body.query.pages[pageIDs[0]].imageinfo
              if (imageInfo.length === 1) {
                resolve(imageInfo[0])
              } else {
                reject(new Error(
                  `Query returned info for ${imageInfo.length} images, expected 1.`
                ))
              }
            }
          }
        })
      })
    }))
  })
}
