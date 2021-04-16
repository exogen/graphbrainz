import AvaNock from 'ava-nock';
import MusicBrainz from '../../../src/api/index.js';

AvaNock.setupTests();

const options =
  process.env.NOCK_MODE === 'play' ? { limit: Infinity, period: 0 } : {};

export default new MusicBrainz(options);
