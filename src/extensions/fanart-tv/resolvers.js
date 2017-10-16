export default mergeInfo => ({
  FanArtImage: {
    imageID: image => image.id
  },
  FanArtDiscImage: {
    imageID: image => image.id
  },
  FanArtLabelImage: {
    imageID: image => image.id
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
    albumCovers: artist => {
      const releaseGroup = artist.albums[artist._releaseGroup]
      return releaseGroup ? releaseGroup.albumcover : []
    },
    discImages: artist => {
      const releaseGroup = artist.albums[artist._releaseGroup]
      return releaseGroup ? releaseGroup.cdart : []
    }
  },
  Artist: {
    fanArt: {
      fragment: `fragment EntityFragment on Entity { mbid }`,
      resolve (artist, args, context) {
        return context.loaders.fanArt.load(['artist', artist.mbid])
      }
    }
  },
  Label: {
    fanArt: {
      fragment: `fragment EntityFragment on Entity { mbid }`,
      resolve (label, args, context) {
        return context.loaders.fanArt.load(['label', label.mbid])
      }
    }
  },
  ReleaseGroup: {
    fanArt: {
      fragment: `fragment EntityFragment on Entity { mbid }`,
      resolve (releaseGroup, args, context) {
        return context.loaders.fanArt.load(['releaseGroup', releaseGroup.mbid])
      }
    }
  }
})
