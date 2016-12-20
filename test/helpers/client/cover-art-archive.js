import path from 'path'
import sepia from 'sepia'
import { CoverArtArchive } from '../../../src/api'

sepia.fixtureDir(path.join(__dirname, '..', '..', 'fixtures'))

const options = process.env.VCR_MODE === 'playback'
  ? { limit: Infinity, period: 0 }
  : {}

export default new CoverArtArchive(options)
