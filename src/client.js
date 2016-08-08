import request from 'request'
import retry from 'retry'
import qs from 'qs'
import chalk from 'chalk'
import ExtendableError from 'es6-error'
import RateLimit from './rate-limit'
import pkg from '../package.json'

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
      limit: 3,
      limitPeriod: 3000,
      maxConcurrency: 10,
      retries: 10,
      minRetryDelay: 100,
      maxRetryDelay: 60000,
      randomizeRetry: true,
      ...options
    }
    this.baseURL = options.baseURL
    this.userAgent = options.userAgent
    this.timeout = options.timeout
    this.limiter = new RateLimit({
      limit: options.limit,
      period: options.limitPeriod,
      maxConcurrency: options.maxConcurrency
    })
    // Even though `minTimeout` is lower than one second, the `Limiter` is
    // making sure we don't exceed the API rate limit anyway. So we're not doing
    // exponential backoff to wait for the rate limit to subside, but rather
    // to be kind to MusicBrainz in case some other error occurred.
    this.retryOptions = {
      retries: options.retries,
      minTimeout: options.minRetryTimeout,
      maxTimeout: options.maxRetryDelay,
      randomize: options.randomizeRetry
    }
  }

  shouldRetry (err) {
    if (err instanceof MusicBrainzError) {
      return err.statusCode >= 500 && err.statusCode < 600
    }
    return RETRY_CODES[err.code] || false
  }

  _get (path, params) {
    return new Promise((resolve, reject) => {
      const options = {
        baseUrl: this.baseURL,
        url: path,
        qs: params,
        json: true,
        gzip: true,
        headers: { 'User-Agent': this.userAgent },
        timeout: this.timeout
      }

      console.log('GET:', path, params)

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

  get (path, params) {
    return new Promise((resolve, reject) => {
      const fn = this._get.bind(this)
      const operation = retry.operation(this.retryOptions)
      operation.attempt(currentAttempt => {
        const priority = currentAttempt
        this.limiter.enqueue(fn, [path, params], priority)
          .then(resolve)
          .catch(err => {
            if (!this.shouldRetry(err) || !operation.retry(err)) {
              reject(operation.mainError() || err)
            }
          })
      })
    })
  }

  getLookupURL (entity, id, params) {
    let url = `${entity}/${id}`
    if (typeof params.inc === 'object') {
      params = {
        ...params,
        inc: params.inc.join('+')
      }
    }
    const query = qs.stringify(params, {
      skipNulls: true,
      filter: (key, value) => value === '' ? undefined : value
    })
    if (query) {
      url += `?${query}`
    }
    return url
  }

  lookup (entity, id, params = {}) {
    const url = this.getLookupURL(entity, id, params)
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
