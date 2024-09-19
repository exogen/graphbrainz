# Extension: TheAudioDB

Retrieve images and information about artists, releases, and recordings from
[TheAudioDB.com](http://www.theaudiodb.com/).

This extension uses its own cache, separate from the MusicBrainz loader cache.

## Configuration

This extension can be configured using environment variables:

* **`THEAUDIODB_API_KEY`**: TheAudioDB API key to use. This is required for any
  fields added by the extension to successfully resolve.
* **`THEAUDIODB_BASE_URL`**: The base URL at which to access TheAudioDB API.
  Defaults to `http://www.theaudiodb.com/api/v1/json/`.
* **`THEAUDIODB_CACHE_SIZE`**: The number of items to keep in the cache.
  Defaults to `GRAPHBRAINZ_CACHE_SIZE` if defined, or `8192`.
* **`THEAUDIODB_CACHE_TTL`**: The number of seconds to keep items in the
  cache. Defaults to `GRAPHBRAINZ_CACHE_TTL` if defined, or `86400000` (one day).

<!-- START graphql-markdown -->

## Schema Types

<details>
  <summary><strong>Table of Contents</strong></summary>

  * [Objects](#objects)
    * [Artist](#artist)
    * [Recording](#recording)
    * [ReleaseGroup](#releasegroup)
    * [TheAudioDBAlbum](#theaudiodbalbum)
    * [TheAudioDBArtist](#theaudiodbartist)
    * [TheAudioDBMusicVideo](#theaudiodbmusicvideo)
    * [TheAudioDBTrack](#theaudiodbtrack)
  * [Enums](#enums)
    * [TheAudioDBImageSize](#theaudiodbimagesize)

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
<td colspan="2" valign="top"><strong id="artist.theaudiodb">theAudioDB</strong></td>
<td valign="top"><a href="#theaudiodbartist">TheAudioDBArtist</a></td>
<td>

Data about the artist from [TheAudioDB](http://www.theaudiodb.com/), a good
source of biographical information and images.
This field is provided by TheAudioDB extension.

</td>
</tr>
</tbody>
</table>

#### Recording

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
<td colspan="2" valign="top"><strong id="recording.theaudiodb">theAudioDB</strong></td>
<td valign="top"><a href="#theaudiodbtrack">TheAudioDBTrack</a></td>
<td>

Data about the recording from [TheAudioDB](http://www.theaudiodb.com/).
This field is provided by TheAudioDB extension.

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
<td colspan="2" valign="top"><strong id="releasegroup.theaudiodb">theAudioDB</strong></td>
<td valign="top"><a href="#theaudiodbalbum">TheAudioDBAlbum</a></td>
<td>

Data about the release group from [TheAudioDB](http://www.theaudiodb.com/),
a good source of descriptive information, reviews, and images.
This field is provided by TheAudioDB extension.

</td>
</tr>
</tbody>
</table>

#### TheAudioDBAlbum

An album on [TheAudioDB](http://www.theaudiodb.com/) corresponding with a
MusicBrainz Release Group.

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
<td colspan="2" valign="top"><strong id="theaudiodbalbum.albumid">albumID</strong></td>
<td valign="top"><a href="../types.md#id">ID</a></td>
<td>

TheAudioDB ID of the album.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbalbum.artistid">artistID</strong></td>
<td valign="top"><a href="../types.md#id">ID</a></td>
<td>

TheAudioDB ID of the artist who released the album.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbalbum.description">description</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

A description of the album, often available in several languages.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">lang</td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The two-letter code for the language in which to retrieve the biography.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbalbum.review">review</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

A review of the album.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbalbum.salescount">salesCount</strong></td>
<td valign="top"><a href="../types.md#float">Float</a></td>
<td>

The worldwide sales figure.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbalbum.score">score</strong></td>
<td valign="top"><a href="../types.md#float">Float</a></td>
<td>

The album’s rating as determined by user votes, out of 10.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbalbum.scorevotes">scoreVotes</strong></td>
<td valign="top"><a href="../types.md#float">Float</a></td>
<td>

The number of users who voted to determine the album’s score.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbalbum.discimage">discImage</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

An image of the physical disc media for the album.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">size</td>
<td valign="top"><a href="#theaudiodbimagesize">TheAudioDBImageSize</a></td>
<td>

The size of the image to retrieve.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbalbum.spineimage">spineImage</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

An image of the spine of the album packaging.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">size</td>
<td valign="top"><a href="#theaudiodbimagesize">TheAudioDBImageSize</a></td>
<td>

The size of the image to retrieve.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbalbum.frontimage">frontImage</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

An image of the front of the album packaging.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">size</td>
<td valign="top"><a href="#theaudiodbimagesize">TheAudioDBImageSize</a></td>
<td>

The size of the image to retrieve.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbalbum.backimage">backImage</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

An image of the back of the album packaging.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">size</td>
<td valign="top"><a href="#theaudiodbimagesize">TheAudioDBImageSize</a></td>
<td>

The size of the image to retrieve.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbalbum.genre">genre</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The primary musical genre of the album (e.g. “Alternative Rock”).

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbalbum.mood">mood</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The primary musical mood of the album (e.g. “Sad”).

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbalbum.style">style</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The primary musical style of the album (e.g. “Rock/Pop”).

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbalbum.speed">speed</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

A rough description of the primary musical speed of the album (e.g. “Medium”).

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbalbum.theme">theme</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The primary musical theme of the album (e.g. “In Love”).

</td>
</tr>
</tbody>
</table>

#### TheAudioDBArtist

An artist on [TheAudioDB](http://www.theaudiodb.com/).

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
<td colspan="2" valign="top"><strong id="theaudiodbartist.artistid">artistID</strong></td>
<td valign="top"><a href="../types.md#id">ID</a></td>
<td>

TheAudioDB ID of the artist.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbartist.biography">biography</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

A biography of the artist, often available in several languages.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">lang</td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The two-letter code for the language in which to retrieve the biography.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbartist.membercount">memberCount</strong></td>
<td valign="top"><a href="../types.md#int">Int</a></td>
<td>

The number of members in the musical group, if applicable.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbartist.banner">banner</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

A 1000x185 JPG banner image containing the artist and their logo or name.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">size</td>
<td valign="top"><a href="#theaudiodbimagesize">TheAudioDBImageSize</a></td>
<td>

The size of the image to retrieve.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbartist.fanart">fanArt</strong></td>
<td valign="top">[<a href="../types.md#urlstring">URLString</a>]!</td>
<td>

A list of 1280x720 or 1920x1080 JPG images depicting the artist.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">size</td>
<td valign="top"><a href="#theaudiodbimagesize">TheAudioDBImageSize</a></td>
<td>

The size of the images to retrieve.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbartist.logo">logo</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

A 400x155 PNG image containing the artist’s logo or name, with a transparent
background.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">size</td>
<td valign="top"><a href="#theaudiodbimagesize">TheAudioDBImageSize</a></td>
<td>

The size of the image to retrieve.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbartist.thumbnail">thumbnail</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

A 1000x1000 JPG thumbnail image picturing the artist (usually containing
every member of a band).

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">size</td>
<td valign="top"><a href="#theaudiodbimagesize">TheAudioDBImageSize</a></td>
<td>

The size of the image to retrieve.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbartist.genre">genre</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The primary musical genre of the artist (e.g. “Alternative Rock”).

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbartist.mood">mood</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The primary musical mood of the artist (e.g. “Sad”).

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbartist.style">style</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The primary musical style of the artist (e.g. “Rock/Pop”).

</td>
</tr>
</tbody>
</table>

#### TheAudioDBMusicVideo

Details of a music video associated with a track on [TheAudioDB](http://www.theaudiodb.com/).

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
<td colspan="2" valign="top"><strong id="theaudiodbmusicvideo.url">url</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

The URL where the music video can be found.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbmusicvideo.companyname">companyName</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The video production company of the music video.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbmusicvideo.directorname">directorName</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The director of the music video.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbmusicvideo.screenshots">screenshots</strong></td>
<td valign="top">[<a href="../types.md#urlstring">URLString</a>]!</td>
<td>

A list of still images from the music video.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">size</td>
<td valign="top"><a href="#theaudiodbimagesize">TheAudioDBImageSize</a></td>
<td>

The size of the images to retrieve.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbmusicvideo.viewcount">viewCount</strong></td>
<td valign="top"><a href="../types.md#float">Float</a></td>
<td>

The number of views the video has received at the given URL. This will rarely
be up to date, so use cautiously.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbmusicvideo.likecount">likeCount</strong></td>
<td valign="top"><a href="../types.md#float">Float</a></td>
<td>

The number of likes the video has received at the given URL. This will rarely
be up to date, so use cautiously.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbmusicvideo.dislikecount">dislikeCount</strong></td>
<td valign="top"><a href="../types.md#float">Float</a></td>
<td>

The number of dislikes the video has received at the given URL. This will
rarely be up to date, so use cautiously.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbmusicvideo.commentcount">commentCount</strong></td>
<td valign="top"><a href="../types.md#float">Float</a></td>
<td>

The number of comments the video has received at the given URL. This will
rarely be up to date, so use cautiously.

</td>
</tr>
</tbody>
</table>

#### TheAudioDBTrack

A track on [TheAudioDB](http://www.theaudiodb.com/) corresponding with a
MusicBrainz Recording.

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
<td colspan="2" valign="top"><strong id="theaudiodbtrack.trackid">trackID</strong></td>
<td valign="top"><a href="../types.md#id">ID</a></td>
<td>

TheAudioDB ID of the track.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbtrack.albumid">albumID</strong></td>
<td valign="top"><a href="../types.md#id">ID</a></td>
<td>

TheAudioDB ID of the album on which the track appears.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbtrack.artistid">artistID</strong></td>
<td valign="top"><a href="../types.md#id">ID</a></td>
<td>

TheAudioDB ID of the artist who released the track.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbtrack.description">description</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

A description of the track.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">lang</td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The two-letter code for the language in which to retrieve the description.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbtrack.thumbnail">thumbnail</strong></td>
<td valign="top"><a href="../types.md#urlstring">URLString</a></td>
<td>

A thumbnail image for the track.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">size</td>
<td valign="top"><a href="#theaudiodbimagesize">TheAudioDBImageSize</a></td>
<td>

The size of the image to retrieve.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbtrack.score">score</strong></td>
<td valign="top"><a href="../types.md#float">Float</a></td>
<td>

The track’s rating as determined by user votes, out of 10.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbtrack.scorevotes">scoreVotes</strong></td>
<td valign="top"><a href="../types.md#float">Float</a></td>
<td>

The number of users who voted to determine the album’s score.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbtrack.tracknumber">trackNumber</strong></td>
<td valign="top"><a href="../types.md#int">Int</a></td>
<td>

The track number of the song on the album.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbtrack.musicvideo">musicVideo</strong></td>
<td valign="top"><a href="#theaudiodbmusicvideo">TheAudioDBMusicVideo</a></td>
<td>

The official music video for the track.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbtrack.genre">genre</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The primary musical genre of the track (e.g. “Alternative Rock”).

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbtrack.mood">mood</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The primary musical mood of the track (e.g. “Sad”).

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbtrack.style">style</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The primary musical style of the track (e.g. “Rock/Pop”).

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="theaudiodbtrack.theme">theme</strong></td>
<td valign="top"><a href="../types.md#string">String</a></td>
<td>

The primary musical theme of the track (e.g. “In Love”).

</td>
</tr>
</tbody>
</table>

### Enums

#### TheAudioDBImageSize

The image sizes that may be requested at [TheAudioDB](http://www.theaudiodb.com/).

<table>
<thead>
<tr>
<th align="left">Value</th>
<th align="left">Description</th>
</tr>
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
