import gql from '../../tag'

export default gql`
  """
  An individual piece of album artwork from the [Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive).
  """
  type CoverArtArchiveImage {
    """
    The Internet Archive’s internal file ID for the image.
    """
    fileID: String!

    """
    The URL at which the image can be found.
    """
    image: URLString!

    """
    A set of thumbnails for the image.
    """
    thumbnails: CoverArtArchiveImageThumbnails!

    """
    Whether this image depicts the “main front” of the release.
    """
    front: Boolean!

    """
    Whether this image depicts the “main back” of the release.
    """
    back: Boolean!

    """
    A list of [image types](https://musicbrainz.org/doc/Cover_Art/Types)
    describing what part(s) of the release the image includes.
    """
    types: [String]!

    """
    The MusicBrainz edit ID.
    """
    edit: Int

    """
    Whether the image was approved by the MusicBrainz edit system.
    """
    approved: Boolean

    """
    A free-text comment left for the image.
    """
    comment: String
  }

  """
  The image sizes that may be requested at the [Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive).
  """
  enum CoverArtArchiveImageSize {
    """
    A maximum dimension of 250px.
    """
    SMALL

    """
    A maximum dimension of 500px.
    """
    LARGE

    """
    The image’s original dimensions, with no maximum.
    """
    FULL
  }

  """
  URLs for thumbnails of different sizes for a particular piece of cover art.
  """
  type CoverArtArchiveImageThumbnails {
    """
    The URL of a small version of the cover art, where the maximum dimension is
    250px.
    """
    small: URLString

    """
    The URL of a large version of the cover art, where the maximum dimension is
    500px.
    """
    large: URLString
  }

  """
  An object containing a list of the cover art images for a release obtained
  from the [Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive),
  as well as a summary of what artwork is available.
  """
  type CoverArtArchiveRelease {
    """
    The URL of an image depicting the album cover or “main front” of the release,
    i.e. the front of the packaging of the audio recording (or in the case of a
    digital release, the image associated with it in a digital media store).

    In the MusicBrainz schema, this field is a Boolean value indicating the
    presence of a front image, whereas here the value is the URL for the image
    itself if one exists. You can check for null if you just want to determine
    the presence of an image.
    """
    front(
      """
      The size of the image to retrieve. By default, the returned image will
      have its full original dimensions, but certain thumbnail sizes may be
      retrieved as well.
      """
      size: CoverArtArchiveImageSize = FULL
    ): URLString

    """
    The URL of an image depicting the “main back” of the release, i.e. the back
    of the packaging of the audio recording.

    In the MusicBrainz schema, this field is a Boolean value indicating the
    presence of a back image, whereas here the value is the URL for the image
    itself. You can check for null if you just want to determine the presence of
    an image.
    """
    back(
      """
      The size of the image to retrieve. By default, the returned image will
      have its full original dimensions, but certain thumbnail sizes may be
      retrieved as well.
      """
      size: CoverArtArchiveImageSize = FULL
    ): URLString

    """
    A list of images depicting the different sides and surfaces of a release’s
    media and packaging.
    """
    images: [CoverArtArchiveImage]!

    """
    Whether there is artwork present for this release.
    """
    artwork: Boolean!

    """
    The number of artwork images present for this release.
    """
    count: Int!

    """
    The particular release shown in the returned cover art.
    """
    release: Release
  }

  extend type Release {
    """
    An object containing a list and summary of the cover art images that are
    present for this release from the [Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive).
    This field is provided by the Cover Art Archive extension.
    """
    coverArtArchive: CoverArtArchiveRelease
  }

  extend type ReleaseGroup {
    """
    The cover art for a release in the release group, obtained from the
    [Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive). A
    release in the release group will be chosen as representative of the release
    group.
    This field is provided by the Cover Art Archive extension.
    """
    coverArtArchive: CoverArtArchiveRelease
  }
`
