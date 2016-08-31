import request from 'request'
import retry from 'retry'
import qs from 'qs'
import chalk from 'chalk'
import ExtendableError from 'es6-error'
import RateLimit from './rate-limit'
import pkg from '../package.json'

// If the `request` callback returns an error, it indicates a failure at a lower
// level than the HTTP response itself. If it's any of the following error
// codes, we should retry.
const RETRY_CODES = {
  ECONNRESET: true,
  ENOTFOUND: true,
  ESOCKETTIMEDOUT: true,
  ETIMEDOUT: true,
  ECONNREFUSED: true,
  EHOSTUNREACH: true,
  EPIPE: true,
  EAI_AGAIN: true
}

export class MusicBrainzError extends ExtendableError {
  constructor (message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

export default class MusicBrainz {
  constructor (options = {}) {
    options = {
      baseURL: 'http://musicbrainz.org/ws/2/',
      userAgent: `${pkg.name}/${pkg.version} ` +
        `( ${pkg.homepage || pkg.author.url || pkg.author.email} )`,
      timeout: 60000,
      // MusicBrainz API requests are limited to an *average* of 1 req/sec.
      // That means if, for example, we only need to make a few API requests to
      // fulfill a query, we might as well make them all at once - as long as
      // we then wait a few seconds before making more. In practice this can
      // seemingly be set to about 5 requests every 5 seconds before we're
      // considered to exceed the rate limit.
      limit: 5,
      limitPeriod: 5000,
      concurrency: 10,
      retries: 10,
      // It's OK for `retryDelayMin` to be less than one second, even 0, because
      // `RateLimit` will already make sure we don't exceed the API rate limit.
      // We're not doing exponential backoff because it will help with being
      // rate limited, but rather to be chill in case MusicBrainz is returning
      // some other error or our network is failing.
      retryDelayMin: 100,
      retryDelayMax: 60000,
      randomizeRetry: true,
      ...options
    }
    this.baseURL = options.baseURL
    this.userAgent = options.userAgent
    this.timeout = options.timeout
    this.limiter = new RateLimit({
      limit: options.limit,
      period: options.limitPeriod,
      concurrency: options.concurrency
    })
    this.retryOptions = {
      retries: options.retries,
      minTimeout: options.retryDelayMin,
      maxTimeout: options.retryDelayMax,
      randomize: options.randomizeRetry
    }
  }

  /**
   * Determine if we should retry the request based on the given error.
   * Retry any 5XX response from MusicBrainz, as well as any error in
   * `RETRY_CODES`.
   */
  shouldRetry (err) {
    if (err instanceof MusicBrainzError) {
      return err.statusCode >= 500 && err.statusCode < 600
    }
    return RETRY_CODES[err.code] || false
  }

  /**
   * Send a request without any retrying or rate limiting.
   * Use `get` instead.
   */
  _get (path, params, info = {}) {
    return new Promise((resolve, reject) => {
      const options = {
        baseUrl: this.baseURL,
        url: path,
        qs: { ...params, fmt: 'json' },
        json: true,
        gzip: true,
        headers: { 'User-Agent': this.userAgent },
        timeout: this.timeout
      }

      const attempt = `(attempt #${info.currentAttempt})`
      console.log('GET:', path, info.currentAttempt > 1 ? attempt : '')

      request(options, (err, response, body) => {
        if (err) {
          reject(err)
        } else if (response.statusCode !== 200) {
          const message = (body && body.error) || ''
          reject(new MusicBrainzError(message, response.statusCode))
        } else {
          resolve(body)
        }
      })
    })
  }

  /**
   * Send a request with retrying and rate limiting.
   */
  get (path, params) {
    return new Promise((resolve, reject) => {
      const fn = this._get.bind(this)
      const operation = retry.operation(this.retryOptions)
      operation.attempt(currentAttempt => {
        // This will increase the priority in our `RateLimit` queue for each
        // retry, so that newer requests don't delay this one further.
        const priority = currentAttempt
        this.limiter.enqueue(fn, [path, params, { currentAttempt }], priority)
          .then(resolve)
          .catch(err => {
            if (!this.shouldRetry(err) || !operation.retry(err)) {
              reject(operation.mainError() || err)
            }
          })
      })
    })
  }

  stringifyParams (params) {
    if (typeof params.inc === 'object') {
      params = {
        ...params,
        inc: params.inc.join('+')
      }
    }
    if (typeof params.type === 'object') {
      params = {
        ...params,
        type: params.type.join('|')
      }
    }
    if (typeof params.status === 'object') {
      params = {
        ...params,
        status: params.status.join('|')
      }
    }
    return qs.stringify(params, {
      skipNulls: true,
      filter: (key, value) => value === '' ? undefined : value
    })
  }

  getURL (path, params) {
    const query = params ? this.stringifyParams(params) : ''
    return query ? `${path}?${query}` : path
  }

  getLookupURL (entity, id, params) {
    return this.getURL(`${entity}/${id}`, params)
  }

  lookup (entity, id, params = {}) {
    const url = this.getLookupURL(entity, id, params)
    return this.get(url)
  }

  getBrowseURL (entity, params) {
    return this.getURL(entity, params)
  }

  browse (entity, params = {}) {
    const url = this.getBrowseURL(entity, params)
    return this.get(url)
  }

  getSearchURL (entity, query, params) {
    return this.getURL(entity, { ...params, query })
  }

  search (entity, query, params = {}) {
    const url = this.getSearchURL(entity, query, params)
    return this.get(url)
  }
}

if (require.main === module) {
  const client = new MusicBrainz()
  const fn = (id) => {
    return client.lookup('artist', id).then(artist => {
      console.log(chalk.green(`Done: ${id} ✔ ${artist.name}`))
    }).catch(err => {
      console.log(chalk.red(`Error: ${id} ✘ ${err}`))
    })
  }
  fn('f1106b17-dcbb-45f6-b938-199ccfab50cc')
  fn('a74b1b7f-71a5-4011-9441-d0b5e4122711')
  fn('9b5ae4cc-15ae-4f0b-8a4e-8c44e42ba52a')
  fn('26f77379-968b-4435-b486-fc9acb4590d3')
  fn('8538e728-ca0b-4321-b7e5-cff6565dd4c0')
}
