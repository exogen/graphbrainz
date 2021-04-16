import test from 'ava';
import GraphQL from 'graphql';
import extension from '../../../src/extensions/fanart-tv/index.js';
import { baseSchema, applyExtension } from '../../../src/schema.js';
import baseContext from '../../helpers/context.js';

const { graphql } = GraphQL;

const schema = applyExtension(extension, baseSchema);
const context = extension.extendContext(baseContext, {
  fanArt: {
    limit: Infinity,
    period: 0,
  },
});

function testData(t, query, handler) {
  return graphql(schema, query, null, context).then((result) => {
    if (result.errors !== undefined) {
      result.errors.forEach((error) => t.log(error));
    }
    t.is(result.errors, undefined);
    return handler(t, result.data);
  });
}

test(
  'artists have a fanArt field and preview images',
  testData,
  `
  {
    lookup {
      artist(mbid: "5b11f4ce-a62d-471e-81fc-a69a8278c7da") {
        fanArt {
          backgrounds {
            imageID
            url(size: PREVIEW)
            fullSizeURL: url
            likeCount
          }
          banners {
            imageID
            url(size: PREVIEW)
            fullSizeURL: url
            likeCount
          }
          logos {
            imageID
            url(size: PREVIEW)
            fullSizeURL: url
            likeCount
          }
          logosHD {
            imageID
            url(size: PREVIEW)
            fullSizeURL: url
            likeCount
          }
          thumbnails {
            imageID
            url(size: PREVIEW)
            fullSizeURL: url
            likeCount
          }
        }
      }
    }
  }
`,
  (t, data) => {
    t.snapshot(data);
    const { fanArt } = data.lookup.artist;
    const allImages = []
      .concat(fanArt.backgrounds)
      .concat(fanArt.banners)
      .concat(fanArt.logos)
      .concat(fanArt.logosHD)
      .concat(fanArt.thumbnails);
    allImages.forEach((image) => {
      t.not(image.url, image.fullSizeURL);
    });
  }
);

test(
  'release groups have a fanArt field and preview images',
  testData,
  `
  {
    lookup {
      releaseGroup(mbid: "f5093c06-23e3-404f-aeaa-40f72885ee3a") {
        fanArt {
          albumCovers {
            imageID
            url(size: PREVIEW)
            fullSizeURL: url
            likeCount
          }
          discImages {
            imageID
            url(size: PREVIEW)
            fullSizeURL: url
            discNumber
            size
          }
        }
      }
    }
  }
`,
  (t, data) => {
    t.snapshot(data);
    const { fanArt } = data.lookup.releaseGroup;
    const allImages = [].concat(fanArt.albumCovers).concat(fanArt.discImages);
    allImages.forEach((image) => {
      t.not(image.url, image.fullSizeURL);
    });
  }
);

test(
  'labels have a fanArt field and preview images',
  testData,
  `
  {
    lookup {
      label(mbid: "0cf56645-50ec-4411-aeb6-c9f4ce0f8edb") {
        fanArt {
          logos {
            imageID
            url(size: PREVIEW)
            fullSizeURL: url
            likeCount
            color
          }
        }
      }
    }
  }
`,
  (t, data) => {
    t.snapshot(data);
    const { fanArt } = data.lookup.label;
    fanArt.logos.forEach((image) => {
      t.not(image.url, image.fullSizeURL);
    });
  }
);
