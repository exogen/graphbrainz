export default mergeInfo => ({
  TheAudioDBArtist: {
    artistID: artist => artist.idArtist,
    biography: (artist, args) => {
      const lang = args.lang.toUpperCase()
      return artist[`strBiography${lang}`]
    },
    memberCount: artist => parseInt(artist.intMembers, 10),
    banner: artist => artist.strArtistBanner,
    fanArt: artist => {
      return [
        artist.strArtistFanart,
        artist.strArtistFanart2,
        artist.strArtistFanart3
      ].filter(Boolean)
    },
    logo: artist => artist.strArtistLogo,
    thumbnail: artist => artist.strArtistThumb,
    genre: artist => artist.strGenre,
    mood: artist => artist.strMood,
    style: artist => artist.strStyle
  },
  TheAudioDBAlbum: {
    albumID: album => album.idAlbum,
    artistID: album => album.idArtist,
    description: (album, args) => {
      const lang = args.lang.toUpperCase()
      return album[`strDescription${lang}`]
    },
    salesCount: album => parseInt(album.intSales, 10),
    score: album => parseInt(album.intScore, 10),
    scoreVotes: album => parseInt(album.intScoreVotes, 10),
    discImage: album => album.strAlbumCDart,
    spineImage: album => album.strAlbumSpine,
    frontImage: album => album.strAlbumThumb,
    backImage: album => album.strAlbumThumbBack,
    review: album => album.strReview,
    genre: album => album.strGenre,
    mood: album => album.strMood,
    style: album => album.strStyle,
    speed: album => album.strSpeed,
    theme: album => album.strTheme
  },
  TheAudioDBTrack: {
    trackID: track => track.idTrack,
    albumID: track => track.idAlbum,
    artistID: track => track.idArtist,
    description: (track, args) => {
      const lang = args.lang.toUpperCase()
      return track[`strDescription${lang}`]
    },
    thumbnail: track => track.strTrackThumb,
    score: track => parseInt(track.intScore, 10),
    scoreVotes: track => parseInt(track.intScoreVotes, 10),
    trackNumber: track => parseInt(track.intTrackNumber, 10),
    musicVideo: track => track,
    genre: track => track.strGenre,
    mood: track => track.strMood,
    style: track => track.strStyle,
    theme: track => track.strTheme
  },
  TheAudioDBMusicVideo: {
    url: track => track.strMusicVid,
    companyName: track => track.strMusicVidCompany,
    directorName: track => track.strMusicVidDirector,
    screenshots: track => {
      return [
        track.strMusicVidScreen1,
        track.strMusicVidScreen2,
        track.strMusicVidScreen3
      ].filter(Boolean)
    },
    viewCount: track => parseInt(track.intMusicVidViews, 10),
    likeCount: track => parseInt(track.intMusicVidLikes, 10),
    dislikeCount: track => parseInt(track.intMusicVidDislikes, 10),
    commentCount: track => parseInt(track.intMusicVidComments, 10)
  },
  Artist: {
    theAudioDB: {
      fragment: 'fragment EntityFragment on Entity { mbid }',
      resolve (artist, args, context) {
        return context.loaders.theAudioDB.load(['artist', artist.mbid])
      }
    }
  },
  ReleaseGroup: {
    theAudioDB: {
      fragment: 'fragment EntityFragment on Entity { mbid }',
      resolve (releaseGroup, args, context) {
        return context.loaders.theAudioDB.load(['album', releaseGroup.mbid])
      }
    }
  },
  Recording: {
    theAudioDB: {
      fragment: 'fragment EntityFragment on Entity { mbid }',
      resolve (recording, args, context) {
        return context.loaders.theAudioDB.load(['track', recording.mbid])
      }
    }
  }
})
