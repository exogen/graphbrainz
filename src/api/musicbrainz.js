import ExtendableError from 'es6-error';
import Client from './client.js';
import { filterObjectValues } from '../util.js';

export class MusicBrainzError extends ExtendableError {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}

export default class MusicBrainz extends Client {
  constructor({
    baseURL = process.env.MUSICBRAINZ_BASE_URL ||
      'http://musicbrainz.org/ws/2/',
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
    super({ baseURL, limit, period, ...options });
  }

  parseErrorMessage(err) {
    if (err.name === 'HTTPError') {
      const { body } = err.response;
      if (body && body.error) {
        return new MusicBrainzError(`${body.error}`, err.response);
      }
    }
    return super.parseErrorMessage(err);
  }

  get(url, options = {}) {
    options = {
      resolveBodyOnly: true,
      ...options,
      searchParams: {
        fmt: 'json',
        ...options.searchParams,
      },
    };
    return super.get(url, options);
  }

  stringifyParams(params) {
    if (Array.isArray(params.inc)) {
      params = {
        ...params,
        inc: params.inc.join('+'),
      };
    }
    if (Array.isArray(params.type)) {
      params = {
        ...params,
        type: params.type.join('|'),
      };
    }
    if (Array.isArray(params.status)) {
      params = {
        ...params,
        status: params.status.join('|'),
      };
    }
    return new URLSearchParams(
      filterObjectValues(params, (value) => value != null && value !== '')
    ).toString();
  }

  getURL(path, params) {
    const query = params ? this.stringifyParams(params) : '';
    return query ? `${path}?${query}` : path;
  }

  getLookupURL(entity, id, params) {
    if (id == null) {
      return this.getBrowseURL(entity, params);
    }
    return this.getURL(`${entity}/${id}`, params);
  }

  lookup(entity, id, params = {}) {
    const url = this.getLookupURL(entity, id, params);
    return this.get(url);
  }

  getBrowseURL(entity, params) {
    return this.getURL(entity, params);
  }

  browse(entity, params = {}) {
    const url = this.getBrowseURL(entity, params);
    return this.get(url);
  }

  getSearchURL(entity, query, params) {
    return this.getURL(entity, { ...params, query });
  }

  search(entity, query, params = {}) {
    const url = this.getSearchURL(entity, query, params);
    return this.get(url);
  }
}
