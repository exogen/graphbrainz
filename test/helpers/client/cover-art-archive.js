import path from 'path'
import replayer from 'replayer'
import CoverArtArchiveClient from '../../../src/extensions/cover-art-archive/client'

replayer.fixtureDir(path.join(__dirname, '..', '..', 'fixtures'))

const options =
  process.env.VCR_MODE === 'playback' ? { limit: Infinity, period: 0 } : {}

export default new CoverArtArchiveClient(options)
