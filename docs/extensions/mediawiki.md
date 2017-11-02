# Extension: MediaWiki

Retrieve information from MediaWiki image pages, like the actual image file URL
and EXIF metadata.

On entities with [URL relationship types][relationships] that represent images,
this extension will find those URLs that appear to be MediaWiki image pages, and
use the [MediaWiki API][] to fetch information about the image. This information
will include the actual file URL, so you can use it as the `src` in an `<img>`
tag (for example).

MediaWiki image URLs are assumed to be those with a path that starts with
`/wiki/Image:` or `/wiki/File:`.

This extension uses its own cache, separate from the MusicBrainz loader cache.

## Configuration

This extension can be configured using environment variables:

* **`MEDIAWIKI_CACHE_SIZE`**: The number of items to keep in the cache.
  Defaults to `GRAPHBRAINZ_CACHE_SIZE` if defined, or `8192`.
* **`MEDIAWIKI_CACHE_TTL`**: The number of seconds to keep items in the
  cache. Defaults to `GRAPHBRAINZ_CACHE_TTL` if defined, or `86400000` (one day).

[relationships]: https://musicbrainz.org/relationships
[MediaWiki API]: https://www.mediawiki.org/wiki/API:Main_page

<!-- START graphql-markdown -->

## Schema Types

<details>
  <summary><strong>Table of Contents</strong></summary>

  * [Objects](#objects)
    * [Artist](#artist)
    * [Instrument](#instrument)
    * [Label](#label)
    * [MediaWikiImage](#mediawikiimage)
    * [MediaWikiImageMetadata](#mediawikiimagemetadata)
    * [Place](#place)

</details>

### Objects

#### Artist

:small_blue_diamond: *This type has been extended. See the [base schema](../types.md)
for a description and additional fields.*

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>mediaWikiImages</strong></td>
<td valign="top">[<a href="#mediawikiimage">MediaWikiImage</a>]!</td>
<td>

Artist images found at MediaWiki URLs in the artist’s URL relationships.
Defaults to URL relationships with the type “image”.
This field is provided by the MediaWiki extension.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">type</td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The type of URL relationship that will be selected to find images. See
the possible [Artist-URL relationship types](https://musicbrainz.org/relationships/artist-url).

</td>
</tr>
</tbody>
</table>

#### Instrument

:small_blue_diamond: *This type has been extended. See the [base schema](../types.md)
for a description and additional fields.*

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>mediaWikiImages</strong></td>
<td valign="top">[<a href="#mediawikiimage">MediaWikiImage</a>]!</td>
<td>

Instrument images found at MediaWiki URLs in the instrument’s URL
relationships. Defaults to URL relationships with the type “image”.
This field is provided by the MediaWiki extension.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">type</td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The type of URL relationship that will be selected to find images. See the
possible [Instrument-URL relationship types](https://musicbrainz.org/relationships/instrument-url).

</td>
</tr>
</tbody>
</table>

#### Label

:small_blue_diamond: *This type has been extended. See the [base schema](../types.md)
for a description and additional fields.*

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>mediaWikiImages</strong></td>
<td valign="top">[<a href="#mediawikiimage">MediaWikiImage</a>]!</td>
<td>

Label images found at MediaWiki URLs in the label’s URL relationships.
Defaults to URL relationships with the type “logo”.
This field is provided by the MediaWiki extension.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">type</td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The type of URL relationship that will be selected to find images. See the
possible [Label-URL relationship types](https://musicbrainz.org/relationships/label-url).

</td>
</tr>
</tbody>
</table>

#### MediaWikiImage

An object describing various properties of an image stored on a MediaWiki
server. The information comes the [MediaWiki imageinfo API](https://www.mediawiki.org/wiki/API:Imageinfo).

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>url</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a>!</td>
<td>

The URL of the actual image file.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>descriptionURL</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

The URL of the wiki page describing the image.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The user who uploaded the file.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>size</strong></td>
<td valign="top"><a href="../types.md#int">Int</a></td>
<td>

The size of the file in bytes.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>width</strong></td>
<td valign="top"><a href="../types.md#int">Int</a></td>
<td>

The pixel width of the image.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>height</strong></td>
<td valign="top"><a href="../types.md#int">Int</a></td>
<td>

The pixel height of the image.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>canonicalTitle</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The canonical title of the file.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>objectName</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The image title, brief description, or file name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>descriptionHTML</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

A description of the image, potentially containing HTML.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>originalDateTimeHTML</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The original date of creation of the image. May be a description rather than
a parseable timestamp, and may contain HTML.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>categories</strong></td>
<td valign="top">[<a href="../types.md#string">String</a>]!</td>
<td>

A list of the categories of the image.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>artistHTML</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The name of the image author, potentially containing HTML.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>creditHTML</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The source of the image, potentially containing HTML.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>licenseShortName</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

A short human-readable license name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>licenseURL</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

A web address where the license is described.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>metadata</strong></td>
<td valign="top">[<a href="#mediawikiimagemetadata">MediaWikiImageMetadata</a>]!</td>
<td>

The full list of values in the `extmetadata` field.

</td>
</tr>
</tbody>
</table>

#### MediaWikiImageMetadata

An entry in the `extmetadata` field of a MediaWiki image file.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="../types.md#string">String</a>!</td>
<td>

The name of the metadata field.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>value</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The value of the metadata field. All values will be converted to strings.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>source</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The source of the value.

</td>
</tr>
</tbody>
</table>

#### Place

:small_blue_diamond: *This type has been extended. See the [base schema](../types.md)
for a description and additional fields.*

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>mediaWikiImages</strong></td>
<td valign="top">[<a href="#mediawikiimage">MediaWikiImage</a>]!</td>
<td>

Place images found at MediaWiki URLs in the place’s URL relationships.
Defaults to URL relationships with the type “image”.
This field is provided by the MediaWiki extension.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">type</td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The type of URL relationship that will be selected to find images. See the
possible [Place-URL relationship types](https://musicbrainz.org/relationships/place-url).

</td>
</tr>
</tbody>
</table>

<!-- END graphql-markdown -->
