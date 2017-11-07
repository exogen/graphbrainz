import URL from 'url'

function resolveMediaWikiImages(source, args, { loaders }) {
  const isURL = relation => relation['target-type'] === 'url'
  let rels = source.relations ? source.relations.filter(isURL) : []
  if (!rels.length) {
    rels = loaders.lookup
      .load([source._type, source.id, { inc: 'url-rels' }])
      .then(source => source.relations.filter(isURL))
  }
  return Promise.resolve(rels).then(rels => {
    const pages = rels
      .filter(rel => {
        if (rel.type === args.type) {
          const url = URL.parse(rel.url.resource)
          if (url.pathname.match(/^\/wiki\/(File|Image):/)) {
            return true
          }
        }
        return false
      })
      .map(rel => rel.url.resource)
    return loaders.mediaWiki.loadMany(pages)
  })
}

export default {
  MediaWikiImage: {
    descriptionURL: imageInfo => imageInfo.descriptionurl,
    canonicalTitle: imageInfo => imageInfo.canonicaltitle,
    objectName: imageInfo => {
      const data = imageInfo.extmetadata.ObjectName
      return data ? data.value : null
    },
    descriptionHTML: imageInfo => {
      const data = imageInfo.extmetadata.ImageDescription
      return data ? data.value : null
    },
    originalDateTimeHTML: imageInfo => {
      const data = imageInfo.extmetadata.DateTimeOriginal
      return data ? data.value : null
    },
    categories: imageInfo => {
      const data = imageInfo.extmetadata.Categories
      return data ? data.value.split('|') : []
    },
    artistHTML: imageInfo => {
      const data = imageInfo.extmetadata.Artist
      return data ? data.value : null
    },
    creditHTML: imageInfo => {
      const data = imageInfo.extmetadata.Credit
      return data ? data.value : null
    },
    licenseShortName: imageInfo => {
      const data = imageInfo.extmetadata.LicenseShortName
      return data ? data.value : null
    },
    licenseURL: imageInfo => {
      const data = imageInfo.extmetadata.LicenseUrl
      return data ? data.value : null
    },
    metadata: imageInfo =>
      Object.keys(imageInfo.extmetadata).map(key => {
        const data = imageInfo.extmetadata[key]
        return { ...data, name: key }
      })
  },
  MediaWikiImageMetadata: {
    value: obj => (obj.value == null ? obj.value : `${obj.value}`)
  },
  Artist: {
    mediaWikiImages: resolveMediaWikiImages
  },
  Instrument: {
    mediaWikiImages: resolveMediaWikiImages
  },
  Label: {
    mediaWikiImages: resolveMediaWikiImages
  },
  Place: {
    mediaWikiImages: resolveMediaWikiImages
  }
}
