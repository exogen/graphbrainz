# Extension: Cover Art Archive

Retrieve cover art images for releases from the [Cover Art Archive](https://coverartarchive.org/).

This extension uses its own cache, separate from the MusicBrainz loader cache.

## Configuration

This extension can be configured using environment variables:

* **`COVER_ART_ARCHIVE_BASE_URL`**: The base URL at which to access the Cover
  Art Archive API. Defaults to `http://coverartarchive.org/`.
* **`COVER_ART_ARCHIVE_CACHE_SIZE`**: The number of items to keep in the cache.
  Defaults to `GRAPHBRAINZ_CACHE_SIZE` if defined, or `8192`.
* **`COVER_ART_ARCHIVE_CACHE_TTL`**: The number of seconds to keep items in the
  cache. Defaults to `GRAPHBRAINZ_CACHE_TTL` if defined, or `86400000` (one day).

<!-- START graphql-markdown -->

## Schema Types

<details>
  <summary><strong>Table of Contents</strong></summary>

  * [Objects](#objects)
    * [CoverArtArchiveImage](#coverartarchiveimage)
    * [CoverArtArchiveImageThumbnails](#coverartarchiveimagethumbnails)
    * [CoverArtArchiveRelease](#coverartarchiverelease)
    * [Release](#release)
    * [ReleaseGroup](#releasegroup)
  * [Enums](#enums)
    * [CoverArtArchiveImageSize](#coverartarchiveimagesize)

</details>

### Objects

#### CoverArtArchiveImage

An individual piece of album artwork from the [Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive).

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
<td colspan="2" valign="top"><strong>fileID</strong></td>
<td valign="top"><a href="../types.md#string">String</a>!</td>
<td>

The Internet Archive’s internal file ID for the image.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>image</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a>!</td>
<td>

The URL at which the image can be found.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>thumbnails</strong></td>
<td valign="top"><a href="#coverartarchiveimagethumbnails">CoverArtArchiveImageThumbnails</a>!</td>
<td>

A set of thumbnails for the image.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>front</strong></td>
<td valign="top"><a href="../types.md#boolean">Boolean</a>!</td>
<td>

Whether this image depicts the “main front” of the release.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>back</strong></td>
<td valign="top"><a href="../types.md#boolean">Boolean</a>!</td>
<td>

Whether this image depicts the “main back” of the release.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>types</strong></td>
<td valign="top">[<a href="../types.md#string">String</a>]!</td>
<td>

A list of [image types](https://musicbrainz.org/doc/Cover_Art/Types)
describing what part(s) of the release the image includes.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>edit</strong></td>
<td valign="top"><a href="../types.md#int">Int</a></td>
<td>

The MusicBrainz edit ID.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>approved</strong></td>
<td valign="top"><a href="../types.md#boolean">Boolean</a></td>
<td>

Whether the image was approved by the MusicBrainz edit system.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>comment</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

A free-text comment left for the image.

</td>
</tr>
</tbody>
</table>

#### CoverArtArchiveImageThumbnails

URLs for thumbnails of different sizes for a particular piece of cover art.

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
<td colspan="2" valign="top"><strong>small</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

The URL of a small version of the cover art, where the maximum dimension is
250px.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>large</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

The URL of a large version of the cover art, where the maximum dimension is
500px.

</td>
</tr>
</tbody>
</table>

#### CoverArtArchiveRelease

An object containing a list of the cover art images for a release obtained
from the [Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive),
as well as a summary of what artwork is available.

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
<td colspan="2" valign="top"><strong>front</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

The URL of an image depicting the album cover or “main front” of the release,
i.e. the front of the packaging of the audio recording (or in the case of a
digital release, the image associated with it in a digital media store).

In the MusicBrainz schema, this field is a Boolean value indicating the
presence of a front image, whereas here the value is the URL for the image
itself if one exists. You can check for null if you just want to determine
the presence of an image.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">size</td>
<td valign="top"><a href="#coverartarchiveimagesize">CoverArtArchiveImageSize</a></td>
<td>

The size of the image to retrieve. By default, the returned image will
have its full original dimensions, but certain thumbnail sizes may be
retrieved as well.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>back</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

The URL of an image depicting the “main back” of the release, i.e. the back
of the packaging of the audio recording.

In the MusicBrainz schema, this field is a Boolean value indicating the
presence of a back image, whereas here the value is the URL for the image
itself. You can check for null if you just want to determine the presence of
an image.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">size</td>
<td valign="top"><a href="#coverartarchiveimagesize">CoverArtArchiveImageSize</a></td>
<td>

The size of the image to retrieve. By default, the returned image will
have its full original dimensions, but certain thumbnail sizes may be
retrieved as well.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>images</strong></td>
<td valign="top">[<a href="#coverartarchiveimage">CoverArtArchiveImage</a>]!</td>
<td>

A list of images depicting the different sides and surfaces of a release’s
media and packaging.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>artwork</strong></td>
<td valign="top"><a href="../types.md#boolean">Boolean</a>!</td>
<td>

Whether there is artwork present for this release.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>count</strong></td>
<td valign="top"><a href="../types.md#int">Int</a>!</td>
<td>

The number of artwork images present for this release.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>release</strong></td>
<td valign="top"><a href="#release">Release</a></td>
<td>

The particular release shown in the returned cover art.

</td>
</tr>
</tbody>
</table>

#### Release

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
<td colspan="2" valign="top"><strong>coverArtArchive</strong></td>
<td valign="top"><a href="#coverartarchiverelease">CoverArtArchiveRelease</a></td>
<td>

An object containing a list and summary of the cover art images that are
present for this release from the [Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive).
This field is provided by the Cover Art Archive extension.

</td>
</tr>
</tbody>
</table>

#### ReleaseGroup

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
<td colspan="2" valign="top"><strong>coverArtArchive</strong></td>
<td valign="top"><a href="#coverartarchiverelease">CoverArtArchiveRelease</a></td>
<td>

The cover art for a release in the release group, obtained from the
[Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive). A
release in the release group will be chosen as representative of the release
group.
This field is provided by the Cover Art Archive extension.

</td>
</tr>
</tbody>
</table>

### Enums

#### CoverArtArchiveImageSize

The image sizes that may be requested at the [Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive).

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>SMALL</strong></td>
<td>

A maximum dimension of 250px.

</td>
</tr>
<tr>
<td valign="top"><strong>LARGE</strong></td>
<td>

A maximum dimension of 500px.

</td>
</tr>
<tr>
<td valign="top"><strong>FULL</strong></td>
<td>

The image’s original dimensions, with no maximum.

</td>
</tr>
</tbody>
</table>

<!-- END graphql-markdown -->
