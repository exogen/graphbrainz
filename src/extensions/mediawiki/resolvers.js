import { URL } from 'url'

function resolveMediaWikiImages (source, args, context) {
  const pages = source.relationships.urls.nodes.filter(node => {
    if (node.type === args.type) {
      const url = new URL(node.target.resource)
      if (url.pathname.match(/^\/wiki\/(File|Image):/)) {
        return true
      }
    }
    return false
  }).map(node => node.target.resource)
  return context.loaders.mediaWiki.loadMany(pages)
}

function createFragment (type) {
  return `
    fragment MediaWikiURLs on ${type} {
      relationships {
        urls {
          nodes {
            type
            target {
              ... on URL {
                resource
              }
            }
          }
        }
      }
    }
  `
}

export default mergeInfo => ({
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
    metadata: imageInfo => Object.keys(imageInfo.extmetadata).map(key => {
      const data = imageInfo.extmetadata[key]
      return { ...data, name: key }
    })
  },
  MediaWikiImageMetadata: {
    value: obj => obj.value == null ? obj.value : `${obj.value}`
  },
  Artist: {
    mediaWikiImages: {
      fragment: createFragment('Artist'),
      resolve: resolveMediaWikiImages
    }
  },
  Instrument: {
    mediaWikiImages: {
      fragment: createFragment('Instrument'),
      resolve: resolveMediaWikiImages
    }
  },
  Label: {
    mediaWikiImages: {
      fragment: createFragment('Label'),
      resolve: resolveMediaWikiImages
    }
  },
  Place: {
    mediaWikiImages: {
      fragment: createFragment('Place'),
      resolve: resolveMediaWikiImages
    }
  }
})
