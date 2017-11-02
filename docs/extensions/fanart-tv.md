# Extension: fanart.tv

Retrieve high quality artwork for artists, releases, and labels from
[fanart.tv](https://fanart.tv/).

This extension uses its own cache, separate from the MusicBrainz loader cache.

## Configuration

This extension can be configured using environment variables:

* **`FANART_API_KEY`**: The fanart.tv API key to use. This is required for any
  fields added by the extension to successfully resolve.
* **`FANART_BASE_URL`**: The base URL at which to access the
  fanart.tv API. Defaults to `http://webservice.fanart.tv/v3/`.
* **`FANART_CACHE_SIZE`**: The number of items to keep in the cache.
  Defaults to `GRAPHBRAINZ_CACHE_SIZE` if defined, or `8192`.
* **`FANART_CACHE_TTL`**: The number of seconds to keep items in the
  cache. Defaults to `GRAPHBRAINZ_CACHE_TTL` if defined, or `86400000` (one day).

<!-- START graphql-markdown -->

## Schema Types

<details>
  <summary><strong>Table of Contents</strong></summary>

  * [Objects](#objects)
    * [Artist](#artist)
    * [FanArtAlbum](#fanartalbum)
    * [FanArtArtist](#fanartartist)
    * [FanArtDiscImage](#fanartdiscimage)
    * [FanArtImage](#fanartimage)
    * [FanArtLabel](#fanartlabel)
    * [FanArtLabelImage](#fanartlabelimage)
    * [Label](#label)
    * [ReleaseGroup](#releasegroup)
  * [Enums](#enums)
    * [FanArtImageSize](#fanartimagesize)

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
<td colspan="2" valign="top"><strong>fanArt</strong></td>
<td valign="top"><a href="#fanartartist">FanArtArtist</a></td>
<td>

Images of the artist from [fanart.tv](https://fanart.tv/).
This field is provided by the fanart.tv extension.

</td>
</tr>
</tbody>
</table>

#### FanArtAlbum

An object containing lists of the different types of release group images from
[fanart.tv](https://fanart.tv/).

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
<td colspan="2" valign="top"><strong>albumCovers</strong></td>
<td valign="top">[<a href="#fanartimage">FanArtImage</a>]</td>
<td>

A list of 1000x1000 JPG images of the cover artwork of the release group.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>discImages</strong></td>
<td valign="top">[<a href="#fanartdiscimage">FanArtDiscImage</a>]</td>
<td>

A list of 1000x1000 PNG images of the physical disc media for the release
group, with transparent backgrounds.

</td>
</tr>
</tbody>
</table>

#### FanArtArtist

An object containing lists of the different types of artist images from
[fanart.tv](https://fanart.tv/).

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
<td colspan="2" valign="top"><strong>backgrounds</strong></td>
<td valign="top">[<a href="#fanartimage">FanArtImage</a>]</td>
<td>

A list of 1920x1080 JPG images picturing the artist, suitable for use as
backgrounds.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>banners</strong></td>
<td valign="top">[<a href="#fanartimage">FanArtImage</a>]</td>
<td>

A list of 1000x185 JPG images containing the artist and their logo or name.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>logos</strong></td>
<td valign="top">[<a href="#fanartimage">FanArtImage</a>]</td>
<td>

A list of 400x155 PNG images containing the artist’s logo or name, with
transparent backgrounds.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>logosHD</strong></td>
<td valign="top">[<a href="#fanartimage">FanArtImage</a>]</td>
<td>

A list of 800x310 PNG images containing the artist’s logo or name, with
transparent backgrounds.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>thumbnails</strong></td>
<td valign="top">[<a href="#fanartimage">FanArtImage</a>]</td>
<td>

A list of 1000x1000 JPG thumbnail images picturing the artist (usually
containing every member of a band).

</td>
</tr>
</tbody>
</table>

#### FanArtDiscImage

A disc image from [fanart.tv](https://fanart.tv/).

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
<td colspan="2" valign="top"><strong>imageID</strong></td>
<td valign="top"><a href="../types.md#id">ID</a></td>
<td>

The ID of the image on fanart.tv.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>url</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

The URL of the image.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">size</td>
<td valign="top"><a href="#fanartimagesize">FanArtImageSize</a></td>
<td>

The size of the image to retrieve.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>likeCount</strong></td>
<td valign="top"><a href="../types.md#int">Int</a></td>
<td>

The number of likes the image has received by fanart.tv users.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>discNumber</strong></td>
<td valign="top"><a href="../types.md#int">Int</a></td>
<td>

The disc number.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>size</strong></td>
<td valign="top"><a href="../types.md#int">Int</a></td>
<td>

The width and height of the (square) disc image.

</td>
</tr>
</tbody>
</table>

#### FanArtImage

A single image from [fanart.tv](https://fanart.tv/).

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
<td colspan="2" valign="top"><strong>imageID</strong></td>
<td valign="top"><a href="../types.md#id">ID</a></td>
<td>

The ID of the image on fanart.tv.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>url</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

The URL of the image.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">size</td>
<td valign="top"><a href="#fanartimagesize">FanArtImageSize</a></td>
<td>

The size of the image to retrieve.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>likeCount</strong></td>
<td valign="top"><a href="../types.md#int">Int</a></td>
<td>

The number of likes the image has received by fanart.tv users.

</td>
</tr>
</tbody>
</table>

#### FanArtLabel

An object containing lists of the different types of label images from
[fanart.tv](https://fanart.tv/).

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
<td colspan="2" valign="top"><strong>logos</strong></td>
<td valign="top">[<a href="#fanartlabelimage">FanArtLabelImage</a>]</td>
<td>

A list of 400x270 PNG images containing the label’s logo. There will
usually be a black version, a color version, and a white version, all with
transparent backgrounds.

</td>
</tr>
</tbody>
</table>

#### FanArtLabelImage

A music label image from [fanart.tv](https://fanart.tv/).

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
<td colspan="2" valign="top"><strong>imageID</strong></td>
<td valign="top"><a href="../types.md#id">ID</a></td>
<td>

The ID of the image on fanart.tv.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>url</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

The URL of the image.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">size</td>
<td valign="top"><a href="#fanartimagesize">FanArtImageSize</a></td>
<td>

The size of the image to retrieve.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>likeCount</strong></td>
<td valign="top"><a href="../types.md#int">Int</a></td>
<td>

The number of likes the image has received by fanart.tv users.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>color</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The type of color content in the image (usually “white” or “colour”).

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
<td colspan="2" valign="top"><strong>fanArt</strong></td>
<td valign="top"><a href="#fanartlabel">FanArtLabel</a></td>
<td>

Images of the label from [fanart.tv](https://fanart.tv/).
This field is provided by the fanart.tv extension.

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
<td colspan="2" valign="top"><strong>fanArt</strong></td>
<td valign="top"><a href="#fanartalbum">FanArtAlbum</a></td>
<td>

Images of the release group from [fanart.tv](https://fanart.tv/).
This field is provided by the fanart.tv extension.

</td>
</tr>
</tbody>
</table>

### Enums

#### FanArtImageSize

The image sizes that may be requested at [fanart.tv](https://fanart.tv/).

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>FULL</strong></td>
<td>

The image’s full original dimensions.

</td>
</tr>
<tr>
<td valign="top"><strong>PREVIEW</strong></td>
<td>

A maximum dimension of 200px.

</td>
</tr>
</tbody>
</table>

<!-- END graphql-markdown -->
