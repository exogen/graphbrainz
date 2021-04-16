import ExtendableError from 'es6-error';
import Client from '../../api/client.js';

export class CoverArtArchiveError extends ExtendableError {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}

export default class CoverArtArchiveClient extends Client {
  constructor({
    baseURL = process.env.COVER_ART_ARCHIVE_BASE_URL ||
      'http://coverartarchive.org/',
    limit = 10,
    period = 1000,
    ...options
  } = {}) {
    super({ baseURL, limit, period, ...options });
  }

  /**
   * Sinfully attempt to parse HTML responses for the error message.
   */
  parseErrorMessage(err) {
    if (err.name === 'HTTPError') {
      const { body } = err.response;
      if (typeof body === 'string' && body.startsWith('<!')) {
        const heading = /<h1>([^<]+)<\/h1>/i.exec(body);
        const message = /<p>([^<]+)<\/p>/i.exec(body);
        return new CoverArtArchiveError(
          `${heading ? heading[1] + ': ' : ''}${message ? message[1] : ''}`,
          err.response
        );
      }
    }
    return super.parseErrorMessage(err);
  }

  images(entityType, mbid) {
    return this.get(`${entityType}/${mbid}`, { resolveBodyOnly: true });
  }

  async imageURL(entityType, mbid, typeOrID = 'front', size) {
    let url = `${entityType}/${mbid}/${typeOrID}`;
    if (size != null) {
      url += `-${size}`;
    }
    const response = await this.get(url, {
      method: 'HEAD',
      followRedirect: false,
    });
    return response.headers.location;
  }
}
