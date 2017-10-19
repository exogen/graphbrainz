import path from 'path'
import sepia from 'sepia'
import CoverArtArchiveClient from '../../../src/extensions/cover-art-archive/client'

sepia.fixtureDir(path.join(__dirname, '..', '..', 'fixtures'))

const options = process.env.VCR_MODE === 'playback'
  ? { limit: Infinity, period: 0 }
  : {}

export default new CoverArtArchiveClient(options)
