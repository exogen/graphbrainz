'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MusicBrainzError = exports.MusicBrainz = exports.default = undefined;

var _musicbrainz = require('./musicbrainz');

var _musicbrainz2 = _interopRequireDefault(_musicbrainz);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _musicbrainz2.default;
exports.MusicBrainz = _musicbrainz2.default;
exports.MusicBrainzError = _musicbrainz.MusicBrainzError;