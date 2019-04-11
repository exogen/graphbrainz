'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tag = require('../../tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _tag2.default`
  """
  The image sizes that may be requested at [TheAudioDB](http://www.theaudiodb.com/).
  """
  enum TheAudioDBImageSize {
    """
    The image’s full original dimensions.
    """
    FULL

    """
    A maximum dimension of 200px.
    """
    PREVIEW
  }

  """
  An artist on [TheAudioDB](http://www.theaudiodb.com/).
  """
  type TheAudioDBArtist {
    """
    TheAudioDB ID of the artist.
    """
    artistID: ID

    """
    A biography of the artist, often available in several languages.
    """
    biography(
      """
      The two-letter code for the language in which to retrieve the biography.
      """
      lang: String = "en"
    ): String

    """
    The number of members in the musical group, if applicable.
    """
    memberCount: Int

    """
    A 1000x185 JPG banner image containing the artist and their logo or name.
    """
    banner(
      """
      The size of the image to retrieve.
      """
      size: TheAudioDBImageSize = FULL
    ): URLString

    """
    A list of 1280x720 or 1920x1080 JPG images depicting the artist.
    """
    fanArt(
      """
      The size of the images to retrieve.
      """
      size: TheAudioDBImageSize = FULL
    ): [URLString]!

    """
    A 400x155 PNG image containing the artist’s logo or name, with a transparent
    background.
    """
    logo(
      """
      The size of the image to retrieve.
      """
      size: TheAudioDBImageSize = FULL
    ): URLString

    """
    A 1000x1000 JPG thumbnail image picturing the artist (usually containing
    every member of a band).
    """
    thumbnail(
      """
      The size of the image to retrieve.
      """
      size: TheAudioDBImageSize = FULL
    ): URLString

    """
    The primary musical genre of the artist (e.g. “Alternative Rock”).
    """
    genre: String

    """
    The primary musical mood of the artist (e.g. “Sad”).
    """
    mood: String

    """
    The primary musical style of the artist (e.g. “Rock/Pop”).
    """
    style: String
  }

  """
  An album on [TheAudioDB](http://www.theaudiodb.com/) corresponding with a
  MusicBrainz Release Group.
  """
  type TheAudioDBAlbum {
    """
    TheAudioDB ID of the album.
    """
    albumID: ID

    """
    TheAudioDB ID of the artist who released the album.
    """
    artistID: ID

    """
    A description of the album, often available in several languages.
    """
    description(
      """
      The two-letter code for the language in which to retrieve the biography.
      """
      lang: String = "en"
    ): String

    """
    A review of the album.
    """
    review: String

    """
    The worldwide sales figure.
    """
    salesCount: Float

    """
    The album’s rating as determined by user votes, out of 10.
    """
    score: Float

    """
    The number of users who voted to determine the album’s score.
    """
    scoreVotes: Float

    """
    An image of the physical disc media for the album.
    """
    discImage(
      """
      The size of the image to retrieve.
      """
      size: TheAudioDBImageSize = FULL
    ): URLString

    """
    An image of the spine of the album packaging.
    """
    spineImage(
      """
      The size of the image to retrieve.
      """
      size: TheAudioDBImageSize = FULL
    ): URLString

    """
    An image of the front of the album packaging.
    """
    frontImage(
      """
      The size of the image to retrieve.
      """
      size: TheAudioDBImageSize = FULL
    ): URLString

    """
    An image of the back of the album packaging.
    """
    backImage(
      """
      The size of the image to retrieve.
      """
      size: TheAudioDBImageSize = FULL
    ): URLString

    """
    The primary musical genre of the album (e.g. “Alternative Rock”).
    """
    genre: String

    """
    The primary musical mood of the album (e.g. “Sad”).
    """
    mood: String

    """
    The primary musical style of the album (e.g. “Rock/Pop”).
    """
    style: String

    """
    A rough description of the primary musical speed of the album (e.g. “Medium”).
    """
    speed: String

    """
    The primary musical theme of the album (e.g. “In Love”).
    """
    theme: String
  }

  """
  A track on [TheAudioDB](http://www.theaudiodb.com/) corresponding with a
  MusicBrainz Recording.
  """
  type TheAudioDBTrack {
    """
    TheAudioDB ID of the track.
    """
    trackID: ID

    """
    TheAudioDB ID of the album on which the track appears.
    """
    albumID: ID

    """
    TheAudioDB ID of the artist who released the track.
    """
    artistID: ID

    """
    A description of the track.
    """
    description(
      """
      The two-letter code for the language in which to retrieve the description.
      """
      lang: String = "en"
    ): String

    """
    A thumbnail image for the track.
    """
    thumbnail(
      """
      The size of the image to retrieve.
      """
      size: TheAudioDBImageSize = FULL
    ): URLString

    """
    The track’s rating as determined by user votes, out of 10.
    """
    score: Float

    """
    The number of users who voted to determine the album’s score.
    """
    scoreVotes: Float

    """
    The track number of the song on the album.
    """
    trackNumber: Int

    """
    The official music video for the track.
    """
    musicVideo: TheAudioDBMusicVideo

    """
    The primary musical genre of the track (e.g. “Alternative Rock”).
    """
    genre: String

    """
    The primary musical mood of the track (e.g. “Sad”).
    """
    mood: String

    """
    The primary musical style of the track (e.g. “Rock/Pop”).
    """
    style: String

    """
    The primary musical theme of the track (e.g. “In Love”).
    """
    theme: String
  }

  """
  Details of a music video associated with a track on [TheAudioDB](http://www.theaudiodb.com/).
  """
  type TheAudioDBMusicVideo {
    """
    The URL where the music video can be found.
    """
    url: URLString

    """
    The video production company of the music video.
    """
    companyName: String

    """
    The director of the music video.
    """
    directorName: String

    """
    A list of still images from the music video.
    """
    screenshots(
      """
      The size of the images to retrieve.
      """
      size: TheAudioDBImageSize = FULL
    ): [URLString]!

    """
    The number of views the video has received at the given URL. This will rarely
    be up to date, so use cautiously.
    """
    viewCount: Float

    """
    The number of likes the video has received at the given URL. This will rarely
    be up to date, so use cautiously.
    """
    likeCount: Float

    """
    The number of dislikes the video has received at the given URL. This will
    rarely be up to date, so use cautiously.
    """
    dislikeCount: Float

    """
    The number of comments the video has received at the given URL. This will
    rarely be up to date, so use cautiously.
    """
    commentCount: Float
  }

  extend type Artist {
    """
    Data about the artist from [TheAudioDB](http://www.theaudiodb.com/), a good
    source of biographical information and images.
    This field is provided by TheAudioDB extension.
    """
    theAudioDB: TheAudioDBArtist
  }

  extend type Recording {
    """
    Data about the recording from [TheAudioDB](http://www.theaudiodb.com/).
    This field is provided by TheAudioDB extension.
    """
    theAudioDB: TheAudioDBTrack
  }

  extend type ReleaseGroup {
    """
    Data about the release group from [TheAudioDB](http://www.theaudiodb.com/),
    a good source of descriptive information, reviews, and images.
    This field is provided by TheAudioDB extension.
    """
    theAudioDB: TheAudioDBAlbum
  }
`;