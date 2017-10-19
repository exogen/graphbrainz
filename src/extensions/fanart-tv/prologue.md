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
