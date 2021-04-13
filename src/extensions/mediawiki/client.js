import Client from '../../api/client.js'

export default class MediaWikiClient extends Client {
  constructor({ limit = 10, period = 1000, ...options } = {}) {
    super({ limit, period, ...options })
  }

  imageInfo(page) {
    const pageURL = new URL(page)
    const ClientError = this.errorClass

    if (!pageURL.pathname.startsWith('/wiki/')) {
      return Promise.reject(
        new ClientError(
          `MediaWiki page URL does not have the expected /wiki/ prefix: ${page}`
        )
      )
    }

    const apiURL = new URL('/w/api.php', pageURL)
    apiURL.search = new URLSearchParams({
      action: 'query',
      titles: decodeURI(pageURL.pathname.slice(6)),
      prop: 'imageinfo',
      iiprop: 'url|size|canonicaltitle|user|extmetadata',
      format: 'json'
    }).toString()

    return this.get(apiURL.toString()).then(body => {
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
