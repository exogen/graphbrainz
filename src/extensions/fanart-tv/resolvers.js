const imageResolvers = {
  imageID: image => image.id,
  url: (image, args) => {
    return args.size === 'PREVIEW'
      ? image.url.replace('/fanart/', '/preview/')
      : image.url
  },
  likeCount: image => image.likes
}

export default {
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
      return artist.artistbackground || []
    },
    thumbnails: artist => {
      return artist.artistthumb || []
    },
    logos: artist => {
      return artist.musiclogo || []
    },
    logosHD: artist => {
      return artist.hdmusiclogo || []
    },
    banners: artist => {
      return artist.musicbanner || []
    }
  },
  FanArtLabel: {
    logos: label => label.musiclabel || []
  },
  FanArtAlbum: {
    albumCovers: album => album.albumcover || [],
    discImages: album => album.cdart || []
  },
  Artist: {
    fanArt: (artist, args, context) => {
      return context.loaders.fanArt.load(['artist', artist.id])
    }
  },
  Label: {
    fanArt: (label, args, context) => {
      return context.loaders.fanArt.load(['label', label.id])
    }
  },
  ReleaseGroup: {
    fanArt: (releaseGroup, args, context) => {
      return context.loaders.fanArt
        .load(['release-group', releaseGroup.id])
        .then(artist => artist.albums[releaseGroup.id])
    }
  }
}
