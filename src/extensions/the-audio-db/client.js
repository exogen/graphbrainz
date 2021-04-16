import ExtendableError from 'es6-error';
import Client from '../../api/client.js';

export class TheAudioDBError extends ExtendableError {}

export default class TheAudioDBClient extends Client {
  constructor({
    apiKey = process.env.THEAUDIODB_API_KEY,
    baseURL = process.env.THEAUDIODB_BASE_URL ||
      'https://www.theaudiodb.com/api/v1/json/',
    limit = 10,
    period = 1000,
    ...options
  } = {}) {
    super({ baseURL, limit, period, ...options });
    this.apiKey = apiKey;
  }

  get(path, options = {}) {
    if (!this.apiKey) {
      return Promise.reject(
        new TheAudioDBError('No API key was configured for TheAudioDB client.')
      );
    }
    return super.get(`${this.apiKey}/${path}`, {
      resolveBodyOnly: true,
      ...options,
    });
  }

  entity(entityType, mbid) {
    switch (entityType) {
      case 'artist':
        return this.artist(mbid);
      case 'release-group':
        return this.album(mbid);
      case 'recording':
        return this.track(mbid);
      default:
        return Promise.reject(
          new TheAudioDBError(`Entity type unsupported: ${entityType}`)
        );
    }
  }

  artist(mbid) {
    return this.get('artist-mb.php', { searchParams: { i: mbid } }).then(
      (body) => {
        if (body.artists && body.artists.length === 1) {
          return body.artists[0];
        }
        return null;
      }
    );
  }

  album(mbid) {
    return this.get('album-mb.php', { searchParams: { i: mbid } }).then(
      (body) => {
        if (body.album && body.album.length === 1) {
          return body.album[0];
        }
        return null;
      }
    );
  }

  track(mbid) {
    return this.get('track-mb.php', { searchParams: { i: mbid } }).then(
      (body) => {
        if (body.track && body.track.length === 1) {
          return body.track[0];
        }
        return null;
      }
    );
  }
}
