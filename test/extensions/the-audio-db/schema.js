import test from 'ava';
import GraphQL from 'graphql';
import extension from '../../../src/extensions/the-audio-db/index.js';
import { baseSchema, applyExtension } from '../../../src/schema.js';
import baseContext from '../../helpers/context.js';

const { graphql } = GraphQL;

const schema = applyExtension(extension, baseSchema);
const context = extension.extendContext(baseContext, {
  theAudioDB: {
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
  'artists have a theAudioDB field',
  testData,
  `
  {
    lookup {
      artist(mbid: "5b11f4ce-a62d-471e-81fc-a69a8278c7da") {
        theAudioDB {
          artistID
          biography
          biographyJP: biography(lang: "jp")
          memberCount
          banner
          bannerPreview: banner(size: PREVIEW)
          fanArt
          fanArtPreview: fanArt(size: PREVIEW)
          logo
          logoPreview: logo(size: PREVIEW)
          thumbnail
          thumbnailPreview: thumbnail(size: PREVIEW)
          genre
          mood
          style
        }
      }
    }
  }
`,
  (t, data) => {
    t.snapshot(data);
  }
);

test(
  'release groups have a theAudioDB field',
  testData,
  `
{
  lookup {
    releaseGroup(mbid: "aa997ea0-2936-40bd-884d-3af8a0e064dc") {
      theAudioDB {
        albumID
        artistID
        description
        descriptionES: description(lang: "es")
        review
        salesCount
        score
        scoreVotes
        discImage
        discImagePreview: discImage(size: PREVIEW)
        spineImage
        spineImagePreview: spineImage(size: PREVIEW)
        frontImage
        frontImagePreview: frontImage(size: PREVIEW)
        backImage
        backImagePreview: backImage(size: PREVIEW)
        genre
        mood
        style
        speed
        theme
      }
    }
  }
}
`,
  (t, data) => {
    t.snapshot(data);
  }
);

test(
  'recordings have a theAudioDB field',
  testData,
  `
  {
    lookup {
      recording(mbid: "1109d8da-ce4a-4739-9414-242dc3e9b81c") {
        theAudioDB {
          trackID
          albumID
          artistID
          description
          descriptionES: description(lang: "es")
          thumbnail
          thumbnailPreview: thumbnail(size: PREVIEW)
          score
          scoreVotes
          trackNumber
          musicVideo {
            url
            companyName
            directorName
            screenshots
            screenshotsPreview: screenshots(size: PREVIEW)
            viewCount
            likeCount
            dislikeCount
            commentCount
          }
          genre
          mood
          style
          theme
        }
      }
    }
  }
`,
  (t, data) => {
    t.snapshot(data);
  }
);
