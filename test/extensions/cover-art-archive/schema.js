import test from 'ava';
import GraphQL from 'graphql';
import extension from '../../../src/extensions/cover-art-archive/index.js';
import { baseSchema, applyExtension } from '../../../src/schema.js';
import baseContext from '../../helpers/context.js';

const { graphql } = GraphQL;

const schema = applyExtension(extension, baseSchema);
const context = extension.extendContext(baseContext, {
  coverArtArchive: {
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
  'releases have a cover art summary',
  testData,
  `
  {
    lookup {
      release(mbid: "b84ee12a-09ef-421b-82de-0441a926375b") {
        coverArtArchive {
          artwork
          count
        }
      }
    }
  }
`,
  (t, data) => {
    const { coverArtArchive } = data.lookup.release;
    t.true(coverArtArchive.artwork);
    t.true(coverArtArchive.count >= 10);
  }
);

test(
  'releases have a set of cover art images',
  testData,
  `
  {
    lookup {
      release(mbid: "b84ee12a-09ef-421b-82de-0441a926375b") {
        coverArtArchive {
          front
          back
          images {
            front
            back
            types
            approved
            edit
            comment
            fileID
            image
            thumbnails {
              small
              large
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const { coverArtArchive } = data.lookup.release;
    t.is(
      coverArtArchive.front,
      'http://coverartarchive.org/release/b84ee12a-09ef-421b-82de-0441a926375b/1611507818.jpg'
    );
    t.is(
      coverArtArchive.back,
      'http://coverartarchive.org/release/b84ee12a-09ef-421b-82de-0441a926375b/13536418798.jpg'
    );
    t.true(coverArtArchive.images.length >= 10);
    t.true(coverArtArchive.images.some((image) => image.front === true));
    t.true(coverArtArchive.images.some((image) => image.back === true));
    t.true(
      coverArtArchive.images.some((image) => image.types.indexOf('Front') >= 0)
    );
    t.true(
      coverArtArchive.images.some((image) => image.types.indexOf('Back') >= 0)
    );
    t.true(
      coverArtArchive.images.some((image) => image.types.indexOf('Liner') >= 0)
    );
    t.true(
      coverArtArchive.images.some((image) => image.types.indexOf('Poster') >= 0)
    );
    t.true(
      coverArtArchive.images.some((image) => image.types.indexOf('Medium') >= 0)
    );
    t.true(coverArtArchive.images.some((image) => image.edit === 18544122));
    t.true(coverArtArchive.images.some((image) => image.comment === ''));
    t.true(
      coverArtArchive.images.some((image) => image.fileID === '1611507818')
    );
    t.true(
      coverArtArchive.images.some(
        (image) =>
          image.image ===
          'http://coverartarchive.org/release/b84ee12a-09ef-421b-82de-0441a926375b/13536422691.jpg'
      )
    );
    t.true(coverArtArchive.images.every((image) => image.approved === true));
    t.true(coverArtArchive.images.every((image) => image.thumbnails.small));
    t.true(coverArtArchive.images.every((image) => image.thumbnails.large));
  }
);

test(
  'can request a size for front and back cover art',
  testData,
  `
  {
    lookup {
      release(mbid: "b84ee12a-09ef-421b-82de-0441a926375b") {
        coverArtArchive {
          front(size: LARGE)
          back(size: SMALL)
          fullFront: front(size: FULL)
        }
      }
    }
  }
`,
  (t, data) => {
    const { coverArtArchive } = data.lookup.release;
    t.is(
      coverArtArchive.front,
      'http://coverartarchive.org/release/b84ee12a-09ef-421b-82de-0441a926375b/1611507818-500.jpg'
    );
    t.is(
      coverArtArchive.back,
      'http://coverartarchive.org/release/b84ee12a-09ef-421b-82de-0441a926375b/13536418798-250.jpg'
    );
    t.is(
      coverArtArchive.fullFront,
      'http://coverartarchive.org/release/b84ee12a-09ef-421b-82de-0441a926375b/1611507818.jpg'
    );
  }
);

test(
  'release groups have a front cover art image',
  testData,
  `
  {
    lookup {
      releaseGroup(mbid: "f5093c06-23e3-404f-aeaa-40f72885ee3a") {
        coverArtArchive {
          artwork
          front
          images {
            front
            image
          }
          release {
            mbid
            title
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const { coverArtArchive } = data.lookup.releaseGroup;
    const { front } = coverArtArchive;
    t.true(coverArtArchive.artwork);
    t.snapshot({ front });
    t.is(coverArtArchive.release.mbid, '6ef6e6cd-ad36-4c2f-816d-121bfb2f6774');
    t.is(coverArtArchive.release.title, 'The Dark Side of the Moon');
    t.is(coverArtArchive.images.length, 1);
    t.true(coverArtArchive.images[0].front);
  }
);

test(
  'release groups have different cover art sizes available',
  testData,
  `
  {
    lookup {
      releaseGroup(mbid: "f5093c06-23e3-404f-aeaa-40f72885ee3a") {
        coverArtArchive {
          small: front(size: SMALL)
          large: front(size: LARGE)
        }
      }
    }
  }
`,
  (t, data) => {
    const { coverArtArchive } = data.lookup.releaseGroup;
    const { small, large } = coverArtArchive;
    t.snapshot({ small, large });
  }
);

test(
  'can retrieve cover art in searches',
  testData,
  `
  {
    search {
      releases(query: "You Want It Darker") {
        edges {
          node {
            coverArtArchive {
              artwork
              front
              back
              images {
                image
              }
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const releases = data.search.releases.edges.map((edge) => edge.node);
    t.is(releases.length, 25);
    t.true(
      releases.some((release) => release.coverArtArchive.artwork === true)
    );
    t.true(
      releases.some((release) => release.coverArtArchive.images.length > 0)
    );
    t.true(releases.some((release) => release.coverArtArchive.front === null));
    t.true(releases.some((release) => release.coverArtArchive.back === null));
  }
);
