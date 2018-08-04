import path from 'path'
import replayer from 'replayer'
import MusicBrainz from '../../../src/api'

replayer.fixtureDir(path.join(__dirname, '..', '..', 'fixtures'))

const options =
  process.env.VCR_MODE === 'playback' ? { limit: Infinity, period: 0 } : {}

export default new MusicBrainz(options)
