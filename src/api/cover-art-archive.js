import Client, { ClientError } from './client'

export class CoverArtArchiveError extends ClientError {}

export default class CoverArtArchive extends Client {
  constructor ({
    baseURL = process.env.COVER_ART_ARCHIVE_BASE_URL || 'http://coverartarchive.org/',
    errorClass = CoverArtArchiveError,
    limit = 10,
    period = 1000,
    ...options
  } = {}) {
    super({ baseURL, errorClass, limit, period, ...options })
  }

  parseErrorMessage (response, body) {
    if (typeof body === 'string' && body.startsWith('<!')) {
      const heading = /<h1>([^<]+)<\/h1>/i.exec(body)
      const message = /<p>([^<]+)<\/p>/i.exec(body)
      return `${heading ? heading[1] + ': ' : ''}${message ? message[1] : ''}`
    }
    return super.parseErrorMessage(response, body)
  }

  getImagesURL (entity, mbid) {
    return `${entity}/${mbid}`
  }

  images (entity, mbid) {
    const url = this.getImagesURL(entity, mbid)
    return this.get(url, { json: true })
  }

  getImageURL (entity, mbid, typeOrID = 'front', size) {
    let url = `${entity}/${mbid}/${typeOrID}`
    if (size != null) {
      url += `-${size}`
    }
    return url
  }

  imageURL (entity, mbid, typeOrID = 'front', size) {
    const url = this.getImageURL(entity, mbid, typeOrID, size)
    return this.get(url, { method: 'HEAD', followRedirect: false })
      .then(headers => headers.location)
  }
}
