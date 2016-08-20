import DataLoader from 'dataloader'
import MusicBrainz from './api'

const client = new MusicBrainz()

export const lookupLoader = new DataLoader(keys => {
  return Promise.all(keys.map(key => {
    const [ entityType, id, params ] = key
    return client.lookup(entityType, id, params).then(entity => {
      if (entity) {
        entity.entityType = entityType
      }
      return entity
    })
  }))
}, {
  cacheKeyFn: (key) => client.getLookupURL(...key)
})

export const browseLoader = new DataLoader(keys => {
  return Promise.all(keys.map(key => {
    const [ entityType, params ] = key
    const pluralName = entityType.endsWith('s') ? entityType : `${entityType}s`
    return client.browse(entityType, params).then(list => {
      list[pluralName].forEach(entity => {
        entity.entityType = entityType
      })
      return list
    })
  }))
}, {
  cacheKeyFn: (key) => client.getBrowseURL(...key)
})

export const searchLoader = new DataLoader(keys => {
  return Promise.all(keys.map(key => {
    const [ entityType, query, params ] = key
    const pluralName = entityType.endsWith('s') ? entityType : `${entityType}s`
    return client.search(entityType, query, params).then(list => {
      list[pluralName].forEach(entity => {
        entity.entityType = entityType
      })
      return list
    })
  }))
}, {
  cacheKeyFn: (key) => client.getSearchURL(...key)
})
