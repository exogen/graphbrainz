'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tag = require('../../tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _tag2.default`
  """
  An object describing various properties of an image stored on a MediaWiki
  server. The information comes the [MediaWiki imageinfo API](https://www.mediawiki.org/wiki/API:Imageinfo).
  """
  type MediaWikiImage {
    """
    The URL of the actual image file.
    """
    url: URLString!

    """
    The URL of the wiki page describing the image.
    """
    descriptionURL: URLString

    """
    The user who uploaded the file.
    """
    user: String

    """
    The size of the file in bytes.
    """
    size: Int

    """
    The pixel width of the image.
    """
    width: Int

    """
    The pixel height of the image.
    """
    height: Int

    """
    The canonical title of the file.
    """
    canonicalTitle: String

    """
    The image title, brief description, or file name.
    """
    objectName: String

    """
    A description of the image, potentially containing HTML.
    """
    descriptionHTML: String

    """
    The original date of creation of the image. May be a description rather than
    a parseable timestamp, and may contain HTML.
    """
    originalDateTimeHTML: String

    """
    A list of the categories of the image.
    """
    categories: [String]!

    """
    The name of the image author, potentially containing HTML.
    """
    artistHTML: String

    """
    The source of the image, potentially containing HTML.
    """
    creditHTML: String

    """
    A short human-readable license name.
    """
    licenseShortName: String

    """
    A web address where the license is described.
    """
    licenseURL: URLString

    """
    The full list of values in the \`extmetadata\` field.
    """
    metadata: [MediaWikiImageMetadata]!
  }

  """
  An entry in the \`extmetadata\` field of a MediaWiki image file.
  """
  type MediaWikiImageMetadata {
    """
    The name of the metadata field.
    """
    name: String!
    """
    The value of the metadata field. All values will be converted to strings.
    """
    value: String
    """
    The source of the value.
    """
    source: String
  }

  extend type Artist {
    """
    Artist images found at MediaWiki URLs in the artist’s URL relationships.
    Defaults to URL relationships with the type “image”.
    This field is provided by the MediaWiki extension.
    """
    mediaWikiImages(
      """
      The type of URL relationship that will be selected to find images. See
      the possible [Artist-URL relationship types](https://musicbrainz.org/relationships/artist-url).
      """
      type: String = "image"
    ): [MediaWikiImage]!
  }

  extend type Instrument {
    """
    Instrument images found at MediaWiki URLs in the instrument’s URL
    relationships. Defaults to URL relationships with the type “image”.
    This field is provided by the MediaWiki extension.
    """
    mediaWikiImages(
      """
      The type of URL relationship that will be selected to find images. See the
      possible [Instrument-URL relationship types](https://musicbrainz.org/relationships/instrument-url).
      """
      type: String = "image"
    ): [MediaWikiImage]!
  }

  extend type Label {
    """
    Label images found at MediaWiki URLs in the label’s URL relationships.
    Defaults to URL relationships with the type “logo”.
    This field is provided by the MediaWiki extension.
    """
    mediaWikiImages(
      """
      The type of URL relationship that will be selected to find images. See the
      possible [Label-URL relationship types](https://musicbrainz.org/relationships/label-url).
      """
      type: String = "logo"
    ): [MediaWikiImage]!
  }

  extend type Place {
    """
    Place images found at MediaWiki URLs in the place’s URL relationships.
    Defaults to URL relationships with the type “image”.
    This field is provided by the MediaWiki extension.
    """
    mediaWikiImages(
      """
      The type of URL relationship that will be selected to find images. See the
      possible [Place-URL relationship types](https://musicbrainz.org/relationships/place-url).
      """
      type: String = "image"
    ): [MediaWikiImage]!
  }
`;