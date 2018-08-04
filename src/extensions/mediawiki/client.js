import URL from 'url'
import Client from '../../api/client'

export default class MediaWikiClient extends Client {
  constructor({ limit = 10, period = 1000, ...options } = {}) {
    super({ limit, period, ...options })
  }

  imageInfo(page) {
    const pageURL = URL.parse(page, true)
    const ClientError = this.errorClass

    if (!pageURL.pathname.startsWith('/wiki/')) {
      return Promise.reject(
        new ClientError(
          `MediaWiki page URL does not have the expected /wiki/ prefix: ${page}`
        )
      )
    }

    const apiURL = URL.format({
      protocol: pageURL.protocol,
      auth: pageURL.auth,
      host: pageURL.host,
      pathname: '/w/api.php',
      query: {
        action: 'query',
        titles: decodeURI(pageURL.pathname.slice(6)),
        prop: 'imageinfo',
        iiprop: 'url|size|canonicaltitle|user|extmetadata',
        format: 'json'
      }
    })

    return this.get(apiURL, { json: true }).then(body => {
      const pageIDs = Object.keys(body.query.pages)
      if (pageIDs.length !== 1) {
        throw new ClientError(
          `Query returned multiple pages: [${pageIDs.join(', ')}]`
        )
      }
      if (pageIDs[0] === '-1') {
        throw new ClientError(
          body.query.pages['-1'].invalidreason || 'Unknown error'
        )
      }
      const imageInfo = body.query.pages[pageIDs[0]].imageinfo
      if (imageInfo.length !== 1) {
        throw new ClientError(
          `Query returned info for ${imageInfo.length} images, expected 1.`
        )
      }
      return imageInfo[0]
    })
  }
}
