import URL from 'url'
import DataLoader from 'dataloader'
import request from 'request'

const debug = require('debug')('graphbrainz:extensions:mediawiki')

export default function createLoader (options) {
  return new DataLoader(keys => {
    return Promise.all(keys.map(key => {
      const pageURL = URL.parse(key, true)

      if (!pageURL.pathname.startsWith('/wiki/')) {
        return Promise.reject(new Error(
          `MediaWiki page URL does not have the expected /wiki/ prefix: ${key}`
        ))
      }

      const apiURL = URL.format({
        protocol: pageURL.protocol,
        auth: pageURL.auth,
        host: pageURL.host,
        pathname: '/w/api.php',
        query: {
          action: 'query',
          titles: pageURL.pathname.slice(6),
          prop: 'imageinfo',
          iiprop: 'url|size|canonicaltitle|user|extmetadata',
          format: 'json'
        }
      })

      return new Promise((resolve, reject) => {
        debug(`Querying MediaWiki API. url=${apiURL}`)
        request(apiURL, { json: true }, (err, response, body) => {
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
