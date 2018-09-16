import request from 'request'
import retry from 'retry'
import ExtendableError from 'es6-error'
import RateLimit from '../rate-limit'
import pkg from '../../package.json'

const debug = require('debug')('graphbrainz:api/client')

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

export class ClientError extends ExtendableError {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

export default class Client {
  constructor({
    baseURL,
    userAgent = `${pkg.name}/${pkg.version} ` +
      `( ${pkg.homepage || pkg.author.url || pkg.author.email} )`,
    extraHeaders = {},
    errorClass = ClientError,
    timeout = 60000,
    limit = 1,
    period = 1000,
    concurrency = 10,
    retries = 10,
    // It's OK for `retryDelayMin` to be less than one second, even 0, because
    // `RateLimit` will already make sure we don't exceed the API rate limit.
    // We're not doing exponential backoff because it will help with being
    // rate limited, but rather to be chill in case MusicBrainz is returning
    // some other error or our network is failing.
    retryDelayMin = 100,
    retryDelayMax = 60000,
    randomizeRetry = true
  } = {}) {
    this.baseURL = baseURL
    this.userAgent = userAgent
    this.extraHeaders = extraHeaders
    this.errorClass = errorClass
    this.timeout = timeout
    this.limiter = new RateLimit({ limit, period, concurrency })
    this.retryOptions = {
      retries,
      minTimeout: retryDelayMin,
      maxTimeout: retryDelayMax,
      randomize: randomizeRetry
    }
  }

  /**
   * Determine if we should retry the request based on the given error.
   * Retry any 5XX response from MusicBrainz, as well as any error in
   * `RETRY_CODES`.
   */
  shouldRetry(err) {
    if (err instanceof this.errorClass) {
      return err.statusCode >= 500 && err.statusCode < 600
    }
    return RETRY_CODES[err.code] || false
  }

  parseErrorMessage(response, body) {
    return typeof body === 'string' && body ? body : `${response.statusCode}`
  }

  /**
   * Send a request without any retrying or rate limiting.
   * Use `get` instead.
   */
  _get(path, options = {}, info = {}) {
    return new Promise((resolve, reject) => {
      options = {
        baseUrl: this.baseURL,
        url: path,
        gzip: true,
        timeout: this.timeout,
        ...options,
        headers: {
          'User-Agent': this.userAgent,
          ...this.extraHeaders,
          ...options.headers
        }
      }

      const req = request(options, (err, response, body) => {
        if (err) {
          debug(`Error: “${err}” url=${req.uri.href}`)
          reject(err)
        } else if (response.statusCode >= 400) {
          const message = this.parseErrorMessage(response, body)
          debug(`Error: “${message}” url=${req.uri.href}`)
          const ClientError = this.errorClass
          reject(new ClientError(message, response.statusCode))
        } else if (options.method === 'HEAD') {
          resolve(response.headers)
        } else {
          resolve(body)
        }
      })

      debug(
        `Sending request. url=${req.uri.href} attempt=${info.currentAttempt}`
      )
    })
  }

  /**
   * Send a request with retrying and rate limiting.
   */
  get(path, options = {}) {
    return new Promise((resolve, reject) => {
      const fn = this._get.bind(this)
      const operation = retry.operation(this.retryOptions)
      operation.attempt(currentAttempt => {
        // This will increase the priority in our `RateLimit` queue for each
        // retry, so that newer requests don't delay this one further.
        const priority = currentAttempt
        this.limiter
          .enqueue(fn, [path, options, { currentAttempt }], priority)
          .then(resolve)
          .catch(err => {
            if (!this.shouldRetry(err) || !operation.retry(err)) {
              reject(operation.mainError() || err)
            }
          })
      })
    })
  }
}
