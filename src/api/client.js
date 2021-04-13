import { fileURLToPath } from 'url'
import createDebug from 'debug'
import got from 'got'
import ExtendableError from 'es6-error'
import { readPackageUpSync } from 'read-pkg-up'
import RateLimit from '../rate-limit.js'
import { filterObjectValues, getTypeName } from '../util.js'

const debug = createDebug('graphbrainz:api/client')

const { packageJson: pkg } = readPackageUpSync({
  cwd: fileURLToPath(import.meta.url)
})

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
    retry
  } = {}) {
    this.baseURL = baseURL
    this.userAgent = userAgent
    this.extraHeaders = extraHeaders
    this.errorClass = errorClass
    this.timeout = timeout
    this.limiter = new RateLimit({ limit, period, concurrency })
    this.retryOptions = retry
  }

  parseErrorMessage(response, body) {
    return typeof body === 'string' && body ? body : `${response.statusCode}`
  }

  /**
   * Send a request without any rate limiting.
   * Use `get` instead.
   */
  async _get(path, { searchParams, ...options } = {}) {
    const url = new URL(path, this.baseURL)
    if (searchParams) {
      if (getTypeName(searchParams) === 'Object') {
        searchParams = filterObjectValues(searchParams, value => value != null)
      }
      const moreSearchParams = new URLSearchParams(searchParams)
      moreSearchParams.forEach((value, key) => {
        url.searchParams.set(key, value)
      })
    }
    options = {
      responseType: 'json',
      timeout: this.timeout,
      ...options,
      headers: {
        'User-Agent': this.userAgent,
        ...this.extraHeaders,
        ...options.headers
      }
    }

    const urlString = url.toString()

    debug(`Sending request. url=${urlString}`)

    let response
    try {
      response = await got(url.toString(), options)
    } catch (err) {
      debug(`Error: “${err}” url=${urlString}`)
      throw err
    }
    if (options.method === 'HEAD') {
      return response.headers
    }
    return response.body
    // if (err) {
    //   reject(err);
    // } else if (response.statusCode >= 400) {
    //   const message = this.parseErrorMessage(response, body);
    //   // debug(`Error: “${message}” url=${req.uri.href}`);
    //   const ClientError = this.errorClass;
    //   reject(new ClientError(message, response.statusCode));
    // } else if (options.method === 'HEAD') {
    //   resolve(response.headers);
    // } else {
    //   resolve(body);
    // }
  }

  /**
   * Send a request with rate limiting.
   */
  get(path, options = {}) {
    const fn = this._get.bind(this)
    return this.limiter.enqueue(fn, [path, options])
  }
}
