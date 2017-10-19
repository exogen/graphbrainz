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

* **`COVER_ART_ARCHIVE_BASE_URL`**: The base URL at which to access to Cover Art
  Archive API. Defaults to `http://coverartarchive.org/`.
* **`COVER_ART_ARCHIVE_CACHE_SIZE`**: The number of items to keep in the cache.
  Defaults to `GRAPHBRAINZ_CACHE_SIZE` if defined, or `8192`.
* **`COVER_ART_ARCHIVE_CACHE_TTL`**: The number of seconds to keep items in the
  cache. Defaults to `GRAPHBRAINZ_CACHE_TTL` if defined, or `86400000` (one day).

[relationships]: https://musicbrainz.org/relationships
[MediaWiki API]: https://www.mediawiki.org/wiki/API:Main_page
