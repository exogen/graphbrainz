'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tag = require('../../tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _tag2.default`
  """
  The image sizes that may be requested at [fanart.tv](https://fanart.tv/).
  """
  enum FanArtImageSize {
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
  A single image from [fanart.tv](https://fanart.tv/).
  """
  type FanArtImage {
    """
    The ID of the image on fanart.tv.
    """
    imageID: ID

    """
    The URL of the image.
    """
    url(
      """
      The size of the image to retrieve.
      """
      size: FanArtImageSize = FULL
    ): URLString

    """
    The number of likes the image has received by fanart.tv users.
    """
    likeCount: Int
  }

  """
  A disc image from [fanart.tv](https://fanart.tv/).
  """
  type FanArtDiscImage {
    """
    The ID of the image on fanart.tv.
    """
    imageID: ID

    """
    The URL of the image.
    """
    url(
      """
      The size of the image to retrieve.
      """
      size: FanArtImageSize = FULL
    ): URLString

    """
    The number of likes the image has received by fanart.tv users.
    """
    likeCount: Int

    """
    The disc number.
    """
    discNumber: Int

    """
    The width and height of the (square) disc image.
    """
    size: Int
  }

  """
  A music label image from [fanart.tv](https://fanart.tv/).
  """
  type FanArtLabelImage {
    """
    The ID of the image on fanart.tv.
    """
    imageID: ID

    """
    The URL of the image.
    """
    url(
      """
      The size of the image to retrieve.
      """
      size: FanArtImageSize = FULL
    ): URLString

    """
    The number of likes the image has received by fanart.tv users.
    """
    likeCount: Int

    """
    The type of color content in the image (usually “white” or “colour”).
    """
    color: String
  }

  """
  An object containing lists of the different types of artist images from
  [fanart.tv](https://fanart.tv/).
  """
  type FanArtArtist {
    """
    A list of 1920x1080 JPG images picturing the artist, suitable for use as
    backgrounds.
    """
    backgrounds: [FanArtImage]

    """
    A list of 1000x185 JPG images containing the artist and their logo or name.
    """
    banners: [FanArtImage]

    """
    A list of 400x155 PNG images containing the artist’s logo or name, with
    transparent backgrounds.
    """
    logos: [FanArtImage]

    """
    A list of 800x310 PNG images containing the artist’s logo or name, with
    transparent backgrounds.
    """
    logosHD: [FanArtImage]

    """
    A list of 1000x1000 JPG thumbnail images picturing the artist (usually
    containing every member of a band).
    """
    thumbnails: [FanArtImage]
  }

  """
  An object containing lists of the different types of label images from
  [fanart.tv](https://fanart.tv/).
  """
  type FanArtLabel {
    """
    A list of 400x270 PNG images containing the label’s logo. There will
    usually be a black version, a color version, and a white version, all with
    transparent backgrounds.
    """
    logos: [FanArtLabelImage]
  }

  """
  An object containing lists of the different types of release group images from
  [fanart.tv](https://fanart.tv/).
  """
  type FanArtAlbum {
    """
    A list of 1000x1000 JPG images of the cover artwork of the release group.
    """
    albumCovers: [FanArtImage]

    """
    A list of 1000x1000 PNG images of the physical disc media for the release
    group, with transparent backgrounds.
    """
    discImages: [FanArtDiscImage]
  }

  extend type Artist {
    """
    Images of the artist from [fanart.tv](https://fanart.tv/).
    This field is provided by the fanart.tv extension.
    """
    fanArt: FanArtArtist
  }

  extend type Label {
    """
    Images of the label from [fanart.tv](https://fanart.tv/).
    This field is provided by the fanart.tv extension.
    """
    fanArt: FanArtLabel
  }

  extend type ReleaseGroup {
    """
    Images of the release group from [fanart.tv](https://fanart.tv/).
    This field is provided by the fanart.tv extension.
    """
    fanArt: FanArtAlbum
  }
`;