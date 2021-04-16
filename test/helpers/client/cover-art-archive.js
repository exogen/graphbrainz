import AvaNock from 'ava-nock';
import CoverArtArchiveClient from '../../../src/extensions/cover-art-archive/client.js';

AvaNock.setupTests();

const options =
  process.env.NOCK_MODE === 'play' ? { limit: Infinity, period: 0 } : {};

export default new CoverArtArchiveClient(options);
