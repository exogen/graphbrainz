'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _client = require('../../api/client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TheAudioDBClient extends _client2.default {
  constructor({
    apiKey = process.env.THEAUDIODB_API_KEY,
    baseURL = process.env.THEAUDIODB_BASE_URL || 'https://www.theaudiodb.com/api/v1/json/',
    limit = 10,
    period = 1000,
    ...options
  } = {}) {
    super({ baseURL, limit, period, ...options });
    this.apiKey = apiKey;
  }

  get(path, options = {}) {
    const ClientError = this.errorClass;
    if (!this.apiKey) {
      return _promise2.default.reject(new ClientError('No API key was configured for TheAudioDB client.'));
    }
    return super.get(`${this.apiKey}/${path}`, {
      json: true,
      // FIXME: TheAudioDB's SSL terminator seems to be broken and only works
      // by forcing TLS 1.0.
      agentOptions: { secureProtocol: 'TLSv1_method' },
      ...options
    });
  }

  entity(entityType, mbid) {
    const ClientError = this.errorClass;
    switch (entityType) {
      case 'artist':
        return this.artist(mbid);
      case 'release-group':
        return this.album(mbid);
      case 'recording':
        return this.track(mbid);
      default:
        return _promise2.default.reject(new ClientError(`Entity type unsupported: ${entityType}`));
    }
  }

  artist(mbid) {
    return this.get('artist-mb.php', { qs: { i: mbid } }).then(body => {
      if (body.artists && body.artists.length === 1) {
        return body.artists[0];
      }
      return null;
    });
  }

  album(mbid) {
    return this.get('album-mb.php', { qs: { i: mbid } }).then(body => {
      if (body.album && body.album.length === 1) {
        return body.album[0];
      }
      return null;
    });
  }

  track(mbid) {
    return this.get('track-mb.php', { qs: { i: mbid } }).then(body => {
      if (body.track && body.track.length === 1) {
        return body.track[0];
      }
      return null;
    });
  }
}
exports.default = TheAudioDBClient;