import DataLoader from 'dataloader'
import request from 'request'

export default function createLoader (options) {
  return new DataLoader(keys => {
    return Promise.all(keys.map(key => {
      if (!options.apiKey) {
        throw new Error('No API key was configured for the TheAudioDB extension.')
      }
      const requestOptions = { json: true }
      const [ entityType, id ] = key
    }))
  })
}
