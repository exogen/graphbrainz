import Client from '../../api/client'

export default class FanArtClient extends Client {
  constructor({
    apiKey = process.env.FANART_API_KEY,
    baseURL = process.env.FANART_BASE_URL || 'http://webservice.fanart.tv/v3/',
    limit = 10,
    period = 1000,
    ...options
  } = {}) {
    super({ baseURL, limit, period, ...options })
    this.apiKey = apiKey
  }

  get(path, options = {}) {
    const ClientError = this.errorClass
    if (!this.apiKey) {
      return Promise.reject(
        new ClientError('No API key was configured for the fanart.tv client.')
      )
    }
    options = {
      json: true,
      ...options,
      qs: {
        ...options.qs,
        api_key: this.apiKey
      }
    }
    return super.get(path, options)
  }

  musicEntity(entityType, mbid) {
    const ClientError = this.errorClass
    switch (entityType) {
      case 'artist':
        return this.musicArtist(mbid)
      case 'label':
        return this.musicLabel(mbid)
      case 'release-group':
        return this.musicAlbum(mbid)
      default:
        return Promise.reject(
          new ClientError(`Entity type unsupported: ${entityType}`)
        )
    }
  }

  musicArtist(mbid) {
    return this.get(`music/${mbid}`)
  }

  musicAlbum(mbid) {
    return this.get(`music/albums/${mbid}`)
  }

  musicLabel(mbid) {
    return this.get(`music/${mbid}`)
  }
}
