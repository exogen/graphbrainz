function createFragment (type) {
  return `fragment EntityFragment on ${type} { mbid }`
}

const imageResolvers = {
  imageID: image => image.id,
  url: (image, args) => {
    return args.size === 'PREVIEW'
      ? image.url.replace('/fanart/', '/preview/')
      : image.url
  },
  likeCount: image => image.likes
}

export default mergeInfo => ({
  FanArtImage: {
    ...imageResolvers
  },
  FanArtDiscImage: {
    ...imageResolvers,
    discNumber: image => image.disc
  },
  FanArtLabelImage: {
    ...imageResolvers,
    color: image => image.colour
  },
  FanArtArtist: {
    backgrounds: artist => {
      return artist.artistbackground
    },
    thumbnails: artist => {
      return artist.artistthumb
    },
    logos: artist => {
      return artist.musiclogo
    },
    logosHD: artist => {
      return artist.hdmusiclogo
    },
    banners: artist => {
      return artist.musicbanner
    }
  },
  FanArtLabel: {
    logos: label => label.musiclabel
  },
  FanArtAlbum: {
    albumCovers: album => album.albumcover || [],
    discImages: album => album.cdart || []
  },
  Artist: {
    fanArt: {
      fragment: createFragment('Artist'),
      resolve (artist, args, context) {
        return context.loaders.fanArt.load(['artist', artist.mbid])
      }
    }
  },
  Label: {
    fanArt: {
      fragment: createFragment('Label'),
      resolve (label, args, context) {
        return context.loaders.fanArt.load(['label', label.mbid])
      }
    }
  },
  ReleaseGroup: {
    fanArt: {
      fragment: createFragment('ReleaseGroup'),
      resolve (releaseGroup, args, context) {
        return context.loaders.fanArt.load(['release-group', releaseGroup.mbid])
          .then(artist => artist.albums[releaseGroup.mbid])
      }
    }
  }
})
