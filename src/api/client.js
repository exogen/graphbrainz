import { fileURLToPath } from 'url';
import createDebug from 'debug';
import got from 'got';
import { readPackageUpSync } from 'read-pkg-up';
import RateLimit from '../rate-limit.js';
import { filterObjectValues, getTypeName } from '../util.js';

const debug = createDebug('graphbrainz:api/client');

const { packageJson: pkg } = readPackageUpSync({
  cwd: fileURLToPath(import.meta.url),
});

export default class Client {
  constructor({
    baseURL,
    userAgent = `${pkg.name}/${pkg.version} ` +
      `( ${pkg.homepage || pkg.author.url || pkg.author.email} )`,
    extraHeaders = {},
    timeout = 60000,
    limit = 1,
    period = 1000,
    concurrency = 10,
    retry,
  } = {}) {
    this.baseURL = baseURL;
    this.userAgent = userAgent;
    this.extraHeaders = extraHeaders;
    this.timeout = timeout;
    this.limiter = new RateLimit({ limit, period, concurrency });
    this.retryOptions = retry;
  }

  parseErrorMessage(err) {
    return err;
  }

  /**
   * Send a request without any rate limiting.
   * Use `get` instead.
   */
  async _get(path, { searchParams, ...options } = {}) {
    const url = new URL(path, this.baseURL);
    if (searchParams) {
      if (getTypeName(searchParams) === 'Object') {
        searchParams = filterObjectValues(
          searchParams,
          (value) => value != null
        );
      }
      const moreSearchParams = new URLSearchParams(searchParams);
      moreSearchParams.forEach((value, key) => {
        url.searchParams.set(key, value);
      });
    }
    options = {
      responseType: 'json',
      timeout: this.timeout,
      retry: this.retryOptions,
      ...options,
      headers: {
        'User-Agent': this.userAgent,
        ...this.extraHeaders,
        ...options.headers,
      },
    };

    let response;
    try {
      debug(`Sending request. url=%s`, url);
      response = await got(url.toString(), options);
      debug(`Success: %s url=%s`, response.statusCode, url);
      return response;
    } catch (err) {
      const parsedError = this.parseErrorMessage(err) || err;
      debug(`Error: “%s” url=%s`, parsedError, url);
      throw parsedError;
    }
  }

  /**
   * Send a request with rate limiting.
   */
  get(path, options = {}) {
    const fn = this._get.bind(this);
    return this.limiter.enqueue(fn, [path, options]);
  }
}
