This extension uses its own cache, separate from the MusicBrainz loader cache.

## Configuration

This extension can be configured using environment variables:

* **`COVER_ART_ARCHIVE_BASE_URL`**: The base URL at which to access the Cover
  Art Archive API. Defaults to `http://coverartarchive.org/`.
* **`COVER_ART_ARCHIVE_CACHE_SIZE`**: The number of items to keep in the cache.
  Defaults to `GRAPHBRAINZ_CACHE_SIZE` if defined, or `8192`.
* **`COVER_ART_ARCHIVE_CACHE_TTL`**: The number of seconds to keep items in the
  cache. Defaults to `GRAPHBRAINZ_CACHE_TTL` if defined, or `86400000` (one day).
