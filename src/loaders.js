import DataLoader from 'dataloader'
import MusicBrainz from './client'

const CLIENT = new MusicBrainz()

export const entityLoader = new DataLoader(keys => {
  return Promise.all(keys.map(key => {
    const [ entity, id, params ] = key
    return CLIENT.lookup(entity, id, params)
  }))
}, {
  cacheKeyFn: (key) => CLIENT.getLookupURL(...key)
})
