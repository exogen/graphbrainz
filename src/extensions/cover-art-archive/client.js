import Client from '../../api/client'

export default class CoverArtArchiveClient extends Client {
  constructor({
    baseURL = process.env.COVER_ART_ARCHIVE_BASE_URL ||
      'http://coverartarchive.org/',
    limit = 10,
    period = 1000,
    ...options
  } = {}) {
    super({ baseURL, limit, period, ...options })
  }

  /**
   * Sinfully attempt to parse HTML responses for the error message.
   */
  parseErrorMessage(response, body) {
    if (typeof body === 'string' && body.startsWith('<!')) {
      const heading = /<h1>([^<]+)<\/h1>/i.exec(body)
      const message = /<p>([^<]+)<\/p>/i.exec(body)
      return `${heading ? heading[1] + ': ' : ''}${message ? message[1] : ''}`
    }
    return super.parseErrorMessage(response, body)
  }

  images(entityType, mbid) {
    return this.get(`${entityType}/${mbid}`, { json: true })
  }

  imageURL(entityType, mbid, typeOrID = 'front', size) {
    let url = `${entityType}/${mbid}/${typeOrID}`
    if (size != null) {
      url += `-${size}`
    }
    return this.get(url, { method: 'HEAD', followRedirect: false }).then(
      headers => headers.location
    )
  }
}
