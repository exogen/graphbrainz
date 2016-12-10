import path from 'path'
import sepia from 'sepia'
import MusicBrainz from '../../src/api'

sepia.fixtureDir(path.join(__dirname, '..', 'fixtures'))

const options = /^(playback|cache)$/.test(process.env.VCR_MODE)
  ? { limit: Infinity, period: 0 }
  : {}

export default new MusicBrainz(options)
