'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _client = require('../../api/client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MediaWikiClient extends _client2.default {
  constructor({ limit = 10, period = 1000, ...options } = {}) {
    super({ limit, period, ...options });
  }

  imageInfo(page) {
    const pageURL = _url2.default.parse(page, true);
    const ClientError = this.errorClass;

    if (!pageURL.pathname.startsWith('/wiki/')) {
      return _promise2.default.reject(new ClientError(`MediaWiki page URL does not have the expected /wiki/ prefix: ${page}`));
    }

    const apiURL = _url2.default.format({
      protocol: pageURL.protocol,
      auth: pageURL.auth,
      host: pageURL.host,
      pathname: '/w/api.php',
      query: {
        action: 'query',
        titles: decodeURI(pageURL.pathname.slice(6)),
        prop: 'imageinfo',
        iiprop: 'url|size|canonicaltitle|user|extmetadata',
        format: 'json'
      }
    });

    return this.get(apiURL, { json: true }).then(body => {
      const pageIDs = (0, _keys2.default)(body.query.pages);
      if (pageIDs.length !== 1) {
        throw new ClientError(`Query returned multiple pages: [${pageIDs.join(', ')}]`);
      }
      if (pageIDs[0] === '-1') {
        throw new ClientError(body.query.pages['-1'].invalidreason || 'Unknown error');
      }
      const imageInfo = body.query.pages[pageIDs[0]].imageinfo;
      if (imageInfo.length !== 1) {
        throw new ClientError(`Query returned info for ${imageInfo.length} images, expected 1.`);
      }
      return imageInfo[0];
    });
  }
}
exports.default = MediaWikiClient;