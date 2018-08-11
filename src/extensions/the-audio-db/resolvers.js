function handleImageSize(resolver) {
  return (source, args, context, info) => {
    const getURL = url => (args.size === 'PREVIEW' ? `${url}/preview` : url)
    const url = resolver(source, args, context, info)
    if (!url) {
      return null
    } else if (Array.isArray(url)) {
      return url.map(getURL)
    } else {
      return getURL(url)
    }
  }
}

export default {
  TheAudioDBArtist: {
    artistID: artist => artist.idArtist,
    biography: (artist, args) => {
      const lang = args.lang.toUpperCase()
      return artist[`strBiography${lang}`] || null
    },
    memberCount: artist => artist.intMembers,
    banner: handleImageSize(artist => artist.strArtistBanner),
    fanArt: handleImageSize(artist => {
      return [
        artist.strArtistFanart,
        artist.strArtistFanart2,
        artist.strArtistFanart3
      ].filter(Boolean)
    }),
    logo: handleImageSize(artist => artist.strArtistLogo),
    thumbnail: handleImageSize(artist => artist.strArtistThumb),
    genre: artist => artist.strGenre || null,
    mood: artist => artist.strMood || null,
    style: artist => artist.strStyle || null
  },
  TheAudioDBAlbum: {
    albumID: album => album.idAlbum,
    artistID: album => album.idArtist,
    description: (album, args) => {
      const lang = args.lang.toUpperCase()
      return album[`strDescription${lang}`] || null
    },
    salesCount: album => album.intSales,
    score: album => album.intScore,
    scoreVotes: album => album.intScoreVotes,
    discImage: handleImageSize(album => album.strAlbumCDart),
    spineImage: handleImageSize(album => album.strAlbumSpine),
    frontImage: handleImageSize(album => album.strAlbumThumb),
    backImage: handleImageSize(album => album.strAlbumThumbBack),
    review: album => album.strReview || null,
    genre: album => album.strGenre || null,
    mood: album => album.strMood || null,
    style: album => album.strStyle || null,
    speed: album => album.strSpeed || null,
    theme: album => album.strTheme || null
  },
  TheAudioDBTrack: {
    trackID: track => track.idTrack,
    albumID: track => track.idAlbum,
    artistID: track => track.idArtist,
    description: (track, args) => {
      const lang = args.lang.toUpperCase()
      return track[`strDescription${lang}`] || null
    },
    thumbnail: handleImageSize(track => track.strTrackThumb),
    score: track => track.intScore,
    scoreVotes: track => track.intScoreVotes,
    trackNumber: track => track.intTrackNumber,
    musicVideo: track => track,
    genre: track => track.strGenre || null,
    mood: track => track.strMood || null,
    style: track => track.strStyle || null,
    theme: track => track.strTheme || null
  },
  TheAudioDBMusicVideo: {
    url: track => {
      let url = track.strMusicVid || null
      // Many of these are missing the protocol and start with www, so add it
      // in that case.
      if (url && url.startsWith('www.')) {
        url = `https://${url}`
      }
      return url
    },
    companyName: track => track.strMusicVidCompany || null,
    directorName: track => track.strMusicVidDirector || null,
    screenshots: handleImageSize(track => {
      return [
        track.strMusicVidScreen1,
        track.strMusicVidScreen2,
        track.strMusicVidScreen3
      ].filter(Boolean)
    }),
    viewCount: track => track.intMusicVidViews,
    likeCount: track => track.intMusicVidLikes,
    dislikeCount: track => track.intMusicVidDislikes,
    commentCount: track => track.intMusicVidComments
  },
  Artist: {
    theAudioDB: (artist, args, context) => {
      return context.loaders.theAudioDB.load(['artist', artist.id])
    }
  },
  Recording: {
    theAudioDB: (recording, args, context) => {
      return context.loaders.theAudioDB.load(['recording', recording.id])
    }
  },
  ReleaseGroup: {
    theAudioDB: (releaseGroup, args, context) => {
      return context.loaders.theAudioDB.load(['release-group', releaseGroup.id])
    }
  }
}
