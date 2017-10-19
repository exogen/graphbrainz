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
