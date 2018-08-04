import qs from 'qs'
import Client, { ClientError } from './client'

export class MusicBrainzError extends ClientError {}

export default class MusicBrainz extends Client {
  constructor({
    baseURL = process.env.MUSICBRAINZ_BASE_URL ||
      'http://musicbrainz.org/ws/2/',
    errorClass = MusicBrainzError,
    // MusicBrainz API requests are limited to an *average* of 1 req/sec.
    // That means if, for example, we only need to make a few API requests to
    // fulfill a query, we might as well make them all at once - as long as
    // we then wait a few seconds before making more. In practice this can
    // seemingly be set to about 5 requests every 5 seconds before we're
    // considered to exceed the rate limit.
    limit = 5,
    period = 5500,
    ...options
  } = {}) {
    super({ baseURL, errorClass, limit, period, ...options })
  }

  parseErrorMessage(response, body) {
    if (body && body.error) {
      return body.error
    }
    return super.parseErrorMessage(response, body)
  }

  stringifyParams(params) {
    if (Array.isArray(params.inc)) {
      params = {
        ...params,
        inc: params.inc.join('+')
      }
    }
    if (Array.isArray(params.type)) {
      params = {
        ...params,
        type: params.type.join('|')
      }
    }
    if (Array.isArray(params.status)) {
      params = {
        ...params,
        status: params.status.join('|')
      }
    }
    return qs.stringify(params, {
      skipNulls: true,
      filter: (key, value) => (value === '' ? undefined : value)
    })
  }

  getURL(path, params) {
    const query = params ? this.stringifyParams(params) : ''
    return query ? `${path}?${query}` : path
  }

  getLookupURL(entity, id, params) {
    if (id == null) {
      return this.getBrowseURL(entity, params)
    }
    return this.getURL(`${entity}/${id}`, params)
  }

  lookup(entity, id, params = {}) {
    const url = this.getLookupURL(entity, id, params)
    return this.get(url, { json: true, qs: { fmt: 'json' } })
  }

  getBrowseURL(entity, params) {
    return this.getURL(entity, params)
  }

  browse(entity, params = {}) {
    const url = this.getBrowseURL(entity, params)
    return this.get(url, { json: true, qs: { fmt: 'json' } })
  }

  getSearchURL(entity, query, params) {
    return this.getURL(entity, { ...params, query })
  }

  search(entity, query, params = {}) {
    const url = this.getSearchURL(entity, query, params)
    return this.get(url, { json: true, qs: { fmt: 'json' } })
  }
}
