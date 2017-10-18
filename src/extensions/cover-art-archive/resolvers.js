function createFragment (type) {
  return `fragment EntityFragment on ${type} { mbid }`
}

function resolveImage (coverArt, { size }, { loaders }, info) {
  if (size === 'FULL') {
    size = null
  }
  const field = info.fieldName
  if (coverArt.images) {
    const matches = coverArt.images.filter(image => image[field])
    if (!matches.length) {
      return null
    } else if (matches.length === 1) {
      const match = matches[0]
      if (size === 250) {
        return match.thumbnails.small
      } else if (size === 500) {
        return match.thumbnails.large
      } else {
        return match.image
      }
    }
  }
  if (coverArt[field] !== false) {
    const {
      _parentType: entityType = 'release',
      _parentID: id = coverArt._release
    } = coverArt
    return loaders.coverArtURL.load([entityType, id, field, size])
  }
}

export default mergeInfo => ({
  CoverArtImage: {
    fileID: image => image.id
  },
  Release: {
    coverArt: {
      fragment: createFragment('Release'),
      resolve (release, args, { loaders }) {
        return loaders.coverArt.load(['release', release.mbid])
      }
    }
  },
  ReleaseGroup: {
    coverArt: {
      fragment: createFragment('ReleaseGroup'),
      resolve (releaseGroup, args, { loaders }) {
        return loaders.coverArt.load(['release-group', releaseGroup.mbid])
      }
    }
  }
})
