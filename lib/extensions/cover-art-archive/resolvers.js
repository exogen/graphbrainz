'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _resolvers = require('../../resolvers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SIZES = new _map2.default([[null, null], [250, 250], [500, 500], ['FULL', null], ['SMALL', 250], ['LARGE', 500]]);

function resolveImage(coverArt, args, { loaders }, info) {
  // Since migrating the schema to an extension, we lost custom enum values
  // for the time being. Translate any incoming `size` arg to the old enum
  // values.
  const size = SIZES.get(args.size);
  // Field should be `front` or `back`.
  const field = info.fieldName;
  if (coverArt.images) {
    const matches = coverArt.images.filter(image => image[field]);
    if (!matches.length) {
      return null;
    } else if (matches.length === 1) {
      const match = matches[0];
      if (size === 250) {
        return match.thumbnails.small;
      } else if (size === 500) {
        return match.thumbnails.large;
      } else {
        return match.image;
      }
    }
  }
  const entityType = coverArt._entityType;
  const id = coverArt._id;
  const releaseID = coverArt._releaseID;
  if (entityType === 'release-group' && field === 'front') {
    // Release groups only have an endpoint to retrieve the front image.
    // If someone requests the back of a release group, return the back of the
    // release that the release group's cover art response points to.
    return loaders.coverArtArchiveURL.load(['release-group', id, field, size]);
  } else {
    return loaders.coverArtArchiveURL.load(['release', releaseID, field, size]);
  }
}

exports.default = {
  CoverArtArchiveImage: {
    fileID: image => image.id
  },
  CoverArtArchiveRelease: {
    front: resolveImage,
    back: resolveImage,
    images: coverArt => coverArt.images,
    artwork: coverArt => coverArt.images.length > 0,
    count: coverArt => coverArt.images.length,
    release: (coverArt, args, context, info) => {
      const mbid = coverArt._releaseID;
      if (mbid) {
        return (0, _resolvers.resolveLookup)(coverArt, { mbid }, context, info);
      }
      return null;
    }
  },
  Release: {
    coverArtArchive: (release, args, { loaders }) => {
      return loaders.coverArtArchive.load(['release', release.id]);
    }
  },
  ReleaseGroup: {
    coverArtArchive: (releaseGroup, args, { loaders }) => {
      return loaders.coverArtArchive.load(['release-group', releaseGroup.id]);
    }
  }
};