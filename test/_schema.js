import test from 'ava';
import GraphQL from 'graphql';
import context from './helpers/context.js';

const { graphql } = GraphQL;

function testData(t, query, handler) {
  return graphql(t.context.schema, query, null, context).then((result) => {
    if (result.errors !== undefined) {
      result.errors.forEach((error) => t.log(error));
    }
    t.is(result.errors, undefined);
    return handler(t, result.data);
  });
}

function testError(t, query, handler) {
  return graphql(t.context.schema, query, null, context).then((result) => {
    t.truthy(result.errors);
    t.true(result.errors.length > 0);
    return handler(t, result.errors);
  });
}

test(
  'schema has a node field',
  testData,
  `
  {
    node(id: "UmVsZWFzZUdyb3VwOmUzN2QyNzQwLTQ1MDMtNGUzZi1hYjZkLWU2MjJhMjVlOTY0ZA==") {
      __typename
      ... on ReleaseGroup {
        mbid
      }
    }
  }
`,
  (t, data) => {
    t.deepEqual(data, {
      node: {
        __typename: 'ReleaseGroup',
        mbid: 'e37d2740-4503-4e3f-ab6d-e622a25e964d',
      },
    });
  }
);

test(
  'schema has a lookup query',
  testData,
  `
  {
    lookup {
      artist (mbid: "c8da2e40-bd28-4d4e-813a-bd2f51958ba8") {
        mbid
        name
        type
      }
    }
  }
`,
  (t, data) => {
    t.deepEqual(data, {
      lookup: {
        artist: {
          mbid: 'c8da2e40-bd28-4d4e-813a-bd2f51958ba8',
          name: 'Lures',
          type: 'Group',
        },
      },
    });
  }
);

test(
  'schema has a search query',
  testData,
  `
  {
    search {
      recordings (query: "Burn the Witch") {
        totalCount
        edges {
          score
          node {
            mbid
            title
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const { recordings } = data.search;
    t.true(recordings.totalCount > 0);
    t.true(recordings.edges.length === 25);
    recordings.edges.forEach((edge) => t.true(edge.score > 0));
  }
);

test(
  'schema has a browse query',
  testData,
  `
  {
    browse {
      releaseGroups(artist: "c8da2e40-bd28-4d4e-813a-bd2f51958ba8") {
        totalCount
        edges {
          node {
            mbid
            title
            artistCredit {
              artist {
                mbid
              }
              name
              joinPhrase
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const { releaseGroups } = data.browse;
    t.true(releaseGroups.totalCount > 0);
    t.true(releaseGroups.edges.length > 0);
    releaseGroups.edges.forEach((edge) => t.truthy(edge.node.title));
  }
);

test(
  'supports deeply nested queries',
  testData,
  `
  query AppleRecordsMarriages {
    search {
      labels(query: "Apple Records", first: 1) {
        edges {
          node {
            name
            disambiguation
            country
            releases(first: 1) {
              edges {
                node {
                  title
                  date
                  artists {
                    edges {
                      node {
                        name
                        ...bandMembers
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  fragment bandMembers on Artist {
    relationships {
      artists(direction: "backward", type: "member of band") {
        edges {
          node {
            type
            target {
              ... on Artist {
                name
                ...marriages
              }
            }
          }
        }
      }
    }
  }

  fragment marriages on Artist {
    relationships {
      artists(type: "married") {
        edges {
          node {
            type
            direction
            begin
            end
            target {
              ... on Artist {
                name
              }
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const { labels } = data.search;
    t.true(labels.edges.length > 0);
    t.is(labels.edges[0].node.releases.edges.length, 1);
  }
);

test(
  'connections have a nodes shortcut field',
  testData,
  `
  query AppleRecordsMarriages {
    search {
      labels(query: "Apple Records", first: 1) {
        nodes {
          name
          disambiguation
          country
          releases(first: 1) {
            nodes {
              title
              date
              artists {
                nodes {
                  name
                  ...bandMembers
                }
              }
            }
          }
        }
      }
    }
  }

  fragment bandMembers on Artist {
    relationships {
      artists(direction: "backward", type: "member of band") {
        nodes {
          type
          target {
            ... on Artist {
              name
              ...marriages
            }
          }
        }
      }
    }
  }

  fragment marriages on Artist {
    relationships {
      artists(type: "married") {
        nodes {
          type
          direction
          begin
          end
          target {
            ... on Artist {
              name
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const { labels } = data.search;
    t.true(labels.nodes.length > 0);
    t.is(labels.nodes[0].releases.nodes.length, 1);
  }
);

test(
  'throws an error if given a malformed MBID',
  testError,
  `
  {
    lookup {
      artist(mbid: "ABC123") {
        name
      }
    }
  }
`,
  (t, errors) => {
    t.regex(errors[0].message, /Malformed MBID: ABC123/);
  }
);

test(
  'artist areas access begin_area/end_area for lookup queries',
  testData,
  `
  {
    lookup {
      artist(mbid: "65314b12-0e08-43fa-ba33-baaa7b874c15") {
        beginArea {
          name
        }
        endArea {
          name
        }
      }
    }
  }
`,
  (t, data) => {
    const { artist } = data.lookup;
    t.is(artist.beginArea.name, 'Westmount');
    t.is(artist.endArea.name, 'Los Angeles');
  }
);

test(
  'artist areas access begin_area/end_area for browse queries',
  testData,
  `
  {
    browse {
      artists(area: "3f504d54-c40c-487d-bc16-c1990eac887f") {
        edges {
          node {
            beginArea {
              name
            }
            endArea {
              name
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const artists = data.browse.artists.edges.map((edge) => edge.node);
    t.true(artists.length > 1);
    t.true(artists.some((artist) => artist.beginArea));
    t.true(artists.some((artist) => artist.endArea));
  }
);

test(
  'artist areas access begin-area/end-area for search queries',
  testData,
  `
  {
    search {
      artists(query: "Leonard Cohen", first: 1) {
        edges {
          node {
            beginArea {
              name
            }
            endArea {
              name
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const artists = data.search.artists.edges.map((edge) => edge.node);
    t.true(artists.length === 1);
    t.is(artists[0].beginArea.name, 'Westmount');
    t.is(artists[0].endArea.name, 'Los Angeles');
  }
);

test(
  'relationships are grouped by target type',
  testData,
  `
  {
    lookup {
      artist(mbid: "65314b12-0e08-43fa-ba33-baaa7b874c15") {
        relationships {
          artists(first: 5) {
            edges {
              node {
                target {
                  __typename
                }
                targetType
              }
            }
          }
          recordings(first: 5) {
            edges {
              node {
                target {
                  __typename
                }
                targetType
              }
            }
          }
          releases(first: 5) {
            edges {
              node {
                target {
                  __typename
                }
                targetType
              }
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const { relationships } = data.lookup.artist;
    t.is(relationships.artists.edges.length, 5);
    relationships.artists.edges.forEach((edge) => {
      t.is(edge.node.targetType, 'artist');
      t.is(edge.node.target.__typename, 'Artist');
    });
    t.is(relationships.recordings.edges.length, 5);
    relationships.recordings.edges.forEach((edge) => {
      t.is(edge.node.targetType, 'recording');
      t.is(edge.node.target.__typename, 'Recording');
    });
    t.is(relationships.releases.edges.length, 5);
    relationships.releases.edges.forEach((edge) => {
      t.is(edge.node.targetType, 'release');
      t.is(edge.node.target.__typename, 'Release');
    });
  }
);

test(
  'relationships can be filtered by type',
  testData,
  `
  {
    lookup {
      artist(mbid: "65314b12-0e08-43fa-ba33-baaa7b874c15") {
        relationships {
          artists(type: "parent") {
            edges {
              node {
                targetType
                type
              }
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const { artist } = data.lookup;
    const rels = artist.relationships.artists.edges.map((edge) => edge.node);
    t.is(rels.length, 2);
    rels.forEach((rel) => {
      t.is(rel.targetType, 'artist');
      t.is(rel.type, 'parent');
    });
  }
);

test(
  'relationships can be filtered by type ID',
  testData,
  `
  {
    lookup {
      artist(mbid: "65314b12-0e08-43fa-ba33-baaa7b874c15") {
        relationships {
          artists(typeID: "fd3927ba-fd51-4fa9-bcc2-e83637896fe8") {
            edges {
              node {
                targetType
                type
              }
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const { artist } = data.lookup;
    const rels = artist.relationships.artists.edges.map((edge) => edge.node);
    t.is(rels.length, 1);
    rels.forEach((rel) => {
      t.is(rel.targetType, 'artist');
      t.is(rel.type, 'involved with');
    });
  }
);

test(
  'relationships can be filtered by direction',
  testData,
  `
  {
    lookup {
      area(mbid: "10cb2ebd-1bc7-4c11-b10d-54f60c421d20") {
        relationships {
          isPartOf: areas(direction: "backward") {
            edges {
              node {
                type
                direction
              }
            }
          }
          hasParts: areas(direction: "forward") {
            edges {
              node {
                type
                direction
              }
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const { area } = data.lookup;
    const isPartOf = area.relationships.isPartOf.edges.map((edge) => edge.node);
    const hasParts = area.relationships.hasParts.edges.map((edge) => edge.node);
    t.true(isPartOf.length > 0);
    t.true(hasParts.length > 0);
    isPartOf.forEach((rel) => {
      t.is(rel.type, 'part of');
      t.is(rel.direction, 'backward');
    });
    hasParts.forEach((rel) => {
      t.is(rel.type, 'part of');
      t.is(rel.direction, 'forward');
    });
  }
);

test(
  'area maps iso-3166-1-codes to isoCodes',
  testData,
  `
  {
    lookup {
      area(mbid: "489ce91b-6658-3307-9877-795b68554c98") {
        name
        isoCodes
      }
    }
  }
`,
  (t, data) => {
    t.deepEqual(data.lookup.area.isoCodes, ['US']);
  }
);

test(
  'area isoCodes accepts an argument to retrieve 3166-1, 3166-2, or 3166-3 codes',
  testData,
  `
  {
    lookup {
      eastGermany: area(mbid: "d907b0ac-2956-386f-a246-62d55779aae1") {
        name
        isoDefault: isoCodes
        iso3166_1: isoCodes(standard: "3166-1")
        iso3166_2: isoCodes(standard: "3166-2")
        iso3166_3: isoCodes(standard: "3166-3")
      }
      newYork: area(mbid: "75e398a3-5f3f-4224-9cd8-0fe44715bc95") {
        name
        isoDefault: isoCodes
        iso3166_1: isoCodes(standard: "3166-1")
        iso3166_2: isoCodes(standard: "3166-2")
        iso3166_3: isoCodes(standard: "3166-3")
      }
    }
  }
`,
  (t, data) => {
    t.deepEqual(data.lookup.eastGermany.isoDefault, ['XG']);
    t.deepEqual(data.lookup.eastGermany.iso3166_1, ['XG']);
    t.is(data.lookup.eastGermany.iso3166_2, null);
    t.deepEqual(data.lookup.eastGermany.iso3166_3, ['DDDE']);

    t.is(data.lookup.newYork.isoDefault, null);
    t.is(data.lookup.newYork.iso3166_1, null);
    t.deepEqual(data.lookup.newYork.iso3166_2, ['US-NY']);
    t.is(data.lookup.newYork.iso3166_3, null);
  }
);

test(
  'areas have a type and typeID',
  testData,
  `
  {
    search {
      areas(query: "Germany", first: 5) {
        nodes {
          name
          type
          typeID
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
  'alias locales use the locale scalar',
  testData,
  `
  {
    lookup {
      artist(mbid: "f99b7d67-4e63-4678-aa66-4c6ac0f7d24a") {
        aliases {
          name
          locale
        }
      }
    }
  }
`,
  (t, data) => {
    const { aliases } = data.lookup.artist;
    t.true(
      aliases.some((alias) => alias.locale === 'en' && alias.name === 'PSY')
    );
    t.true(
      aliases.some((alias) => alias.locale === 'ko' && alias.name === '싸이')
    );
  }
);

test(
  'work ISWCs use the ISWC scalar',
  testData,
  `
  {
    lookup {
      work(mbid: "ef7d0814-da6a-32f5-a600-ff81cffd1aed") {
        title
        iswcs
      }
    }
  }
`,
  (t, data) => {
    const { work } = data.lookup;
    t.is(work.title, 'The Partisan');
    t.deepEqual(work.iswcs, ['T-900.755.682-3']);
  }
);

test(
  'URLs may be looked up by resource',
  testData,
  `
  {
    lookup {
      url(resource: "http://www.nirvana.com/") {
        mbid
        resource
      }
    }
  }
`,
  (t, data) => {
    const { url } = data.lookup;
    t.is(url.mbid, '4347ffe2-82ec-4059-9520-6a1a3f73a304');
    t.is(url.resource, 'http://www.nirvana.com/');
  }
);

test(
  'throws an error if given a malformed resource URL',
  testError,
  `
  {
    lookup {
      url(resource: "http:foo") {
        mbid
        resource
      }
    }
  }
`,
  (t, errors) => {
    t.regex(errors[0].message, /Malformed URL: http:foo/);
  }
);

test(
  'release groups can be browsed by type',
  testData,
  `
  {
    browse {
      releaseGroups(artist: "5b11f4ce-a62d-471e-81fc-a69a8278c7da", type: EP) {
        edges {
          node {
            primaryType
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const releaseGroups = data.browse.releaseGroups.edges.map(
      (edge) => edge.node
    );
    t.is(releaseGroups.length, 8);
    releaseGroups.forEach((releaseGroup) =>
      t.is(releaseGroup.primaryType, 'EP')
    );
  }
);

test(
  'releases can be browsed by type and status',
  testData,
  `
  {
    browse {
      releases(artist: "5b11f4ce-a62d-471e-81fc-a69a8278c7da", type: EP, status: BOOTLEG) {
        edges {
          node {
            status
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const releases = data.browse.releases.edges.map((edge) => edge.node);
    t.is(releases.length, 6);
    releases.forEach((release) => t.is(release.status, 'BOOTLEG'));
  }
);

test(
  'releases have an ASIN field',
  testData,
  `
  {
    lookup {
      release(mbid: "d5cdb7fd-c7e9-460a-9549-8a369655cc52") {
        asin
      }
    }
  }
`,
  (t, data) => {
    const { release } = data.lookup;
    t.is(release.asin, 'B01KN6XDS6');
  }
);

test(
  'artists have a list of ISNIs and IPIs',
  testData,
  `
  {
    lookup {
      artist(mbid: "65314b12-0e08-43fa-ba33-baaa7b874c15") {
        ipis
        isnis
      }
    }
  }
`,
  (t, data) => {
    const { artist } = data.lookup;
    t.deepEqual(artist.ipis, ['00006457004']);
    t.deepEqual(artist.isnis, ['0000000110273481']);
  }
);

test(
  'artistCredits is an alias for artistCredit',
  testData,
  `
  {
    lookup {
      recording(mbid: "07649758-09c8-4d70-bc6f-5c37ab36334d") {
        artistCredit {
          name
          joinPhrase
        }
        artistCredits {
          name
          joinPhrase
        }
      }
      release(mbid: "d5cdb7fd-c7e9-460a-9549-8a369655cc52") {
        artistCredit {
          name
          joinPhrase
        }
        artistCredits {
          name
          joinPhrase
        }
      }
      releaseGroup(mbid: "53614893-6f25-4519-9cae-b1db904e2887") {
        artistCredit {
          name
          joinPhrase
        }
        artistCredits {
          name
          joinPhrase
        }
      }
    }
  }
`,
  (t, data) => {
    const { recording, release, releaseGroup } = data.lookup;
    t.deepEqual(recording.artistCredit, [
      { name: 'Holly Golightly & The Brokeoffs', joinPhrase: '' },
    ]);
    t.deepEqual(recording.artistCredits, recording.artistCredit);

    t.deepEqual(release.artistCredit, [
      { name: 'Leonard Cohen', joinPhrase: '' },
    ]);
    t.deepEqual(release.artistCredits, release.artistCredit);

    t.deepEqual(releaseGroup.artistCredit, [
      { name: 'DJ Muggs', joinPhrase: ' vs. ' },
      { name: 'Ill Bill', joinPhrase: '' },
    ]);
    t.deepEqual(releaseGroup.artistCredits, releaseGroup.artistCredit);
  }
);

test(
  'recordings have a list of ISRCs',
  testData,
  `
  {
    lookup {
      recording(mbid: "9f9cf187-d6f9-437f-9d98-d59cdbd52757") {
        isrcs
      }
    }
  }
  `,
  (t, data) => {
    t.true(data.lookup.recording.isrcs.includes('GBAYE9701376'));
    t.true(data.lookup.recording.isrcs.includes('GBBKS1700108'));
  }
);

test(
  'recordings can be browsed by ISRC',
  testData,
  `
  {
    browse {
      recordings(isrc: "USSUB0200002") {
        totalCount
        edges {
          node {
            title
            isrcs
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const recordings = data.browse.recordings.edges.map((edge) => edge.node);
    t.true(data.browse.recordings.totalCount >= 1);
    t.true(
      recordings.every((recording) => recording.isrcs.includes('USSUB0200002'))
    );
  }
);

test(
  'releases can be browsed by Disc ID',
  testData,
  `
  {
    browse {
      releases(discID: "XzPS7vW.HPHsYemQh0HBUGr8vuU-") {
        totalCount
        edges {
          node {
            mbid
            title
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const releases = data.browse.releases.edges.map((edge) => edge.node);
    t.true(data.browse.releases.totalCount >= 2);
    t.true(
      releases.some(
        (release) => release.mbid === '5a6e5ad7-c2bd-3484-a20e-121bf981c883'
      )
    );
    t.true(
      releases.some(
        (release) => release.mbid === '96f6f90e-d831-4f37-bf72-ce2982e459fb'
      )
    );
  }
);

test(
  'works can be browsed by ISWC',
  testData,
  `
  {
    browse {
      works(iswc: "T-900.755.682-3") {
        totalCount
        edges {
          node {
            title
            iswcs
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const works = data.browse.works.edges.map((edge) => edge.node);
    t.is(data.browse.works.totalCount, 1);
    t.deepEqual(works, [{ title: 'The Partisan', iswcs: ['T-900.755.682-3'] }]);
  }
);

test(
  'recordings have a length in milliseconds',
  testData,
  `
  {
    lookup {
      recording(mbid: "9f9cf187-d6f9-437f-9d98-d59cdbd52757") {
        length
      }
    }
  }
`,
  (t, data) => {
    const { recording } = data.lookup;
    t.is(recording.length, 383813);
  }
);

test(
  'collections can be browsed by the entities they contain',
  testData,
  `
  {
    browse {
      collections(artist: "24f1766e-9635-4d58-a4d4-9413f9f98a4c") {
        totalCount
        edges {
          node {
            name
            editor
            entityType
            type
            artists {
              totalCount
              edges {
                node {
                  mbid
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const collections = data.browse.collections.edges.map((edge) => edge.node);
    t.true(collections.length >= 2);
    t.true(collections.some((collection) => collection.editor === 'arist.on'));
    t.true(
      collections.some((collection) => collection.editor === 'ListMyCDs.com')
    );
    collections.forEach((collection) => {
      t.is(collection.entityType, 'artist');
      t.is(collection.type, 'Artist');
      t.true(collection.artists.totalCount > 0);
      t.true(collection.artists.edges.length > 0);
    });
  }
);

test(
  'collections can be looked up by MBID',
  testData,
  `
  {
    lookup {
      collection(mbid: "85da782d-2ec0-41ec-a97f-9be464bba309") {
        name
        releases {
          edges {
            node {
              title
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const { collection } = data.lookup;
    t.is(collection.name, 'Beets Music Collection');
    t.is(collection.releases.edges.length, 25);
  }
);

test(
  'entities have a collections field',
  testData,
  `
  {
    lookup {
      release(mbid: "0702057c-cb90-43d3-b7b4-6d0cc37e8644") {
        title
        collections {
          totalCount
          edges {
            node {
              editor
            }
          }
        }
      }
      artist(mbid: "24f1766e-9635-4d58-a4d4-9413f9f98a4c") {
        name
        collections {
          totalCount
          edges {
            node {
              editor
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const { release, artist } = data.lookup;
    t.true(release.collections.totalCount > 0);
    t.true(release.collections.edges.length > 0);
    t.true(artist.collections.edges.length > 0);
  }
);

test(
  'releases support a list of media',
  testData,
  `
  {
    lookup {
      release(mbid: "a4864e94-6d75-4ade-bc93-0dabf3521453") {
        media {
          title
          format
          formatID
          position
          trackCount
        }
      }
    }
  }
`,
  (t, data) => {
    const { release } = data.lookup;
    t.deepEqual(release.media, [
      {
        title: 'Left',
        format: 'CD',
        formatID: '9712d52a-4509-3d4b-a1a2-67c88c643e31',
        position: 1,
        trackCount: 12,
      },
      {
        title: 'Right',
        format: 'CD',
        formatID: '9712d52a-4509-3d4b-a1a2-67c88c643e31',
        position: 2,
        trackCount: 11,
      },
    ]);
  }
);

test(
  'throws an error if looking up a URL without an argument',
  testError,
  `
  {
    lookup {
      url {
        mbid
      }
    }
  }
`,
  (t, errors) => {
    t.is(
      errors[0].message,
      'Lookups by a field other than MBID must provide: resource'
    );
  }
);

test(
  'some entities support ratings',
  testData,
  `
  {
    lookup {
      event(mbid: "eec75a81-8864-4cea-b8b4-e99cd08b29f1") {
        rating {
          voteCount
          value
        }
      }
      work(mbid: "12b53203-64af-3a94-b3ec-11fad7c7d809") {
        rating {
          voteCount
          value
        }
      }
    }
    browse {
      artists(work: "8a25ce1e-8695-42c0-b668-8f0aa057c72b") {
        edges {
          node {
            rating {
              voteCount
              value
            }
          }
        }
      }
      recordings(artist: "c8da2e40-bd28-4d4e-813a-bd2f51958ba8") {
        edges {
          node {
            rating {
              voteCount
              value
            }
          }
        }
      }
    }
    search {
      labels(query: "Fin Records") {
        edges {
          node {
            rating {
              voteCount
              value
            }
          }
        }
      }
      releaseGroups(query: "arid:c8da2e40-bd28-4d4e-813a-bd2f51958ba8") {
        edges {
          node {
            rating {
              voteCount
              value
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const { event, work } = data.lookup;
    const artists = data.browse.artists.edges.map((edge) => edge.node);
    const recordings = data.browse.recordings.edges.map((edge) => edge.node);
    const labels = data.search.labels.edges.map((edge) => edge.node);
    const releaseGroups = data.search.releaseGroups.edges.map(
      (edge) => edge.node
    );
    t.is(event.rating.voteCount, 0);
    t.is(event.rating.value, null);
    t.true(work.rating.voteCount > 0);
    t.true(work.rating.value >= 4);
    t.true(artists.some((artist) => artist.rating.voteCount > 0));
    t.true(artists.some((artist) => artist.rating.value > 3));
    t.true(recordings.some((recording) => recording.rating.voteCount > 0));
    t.true(recordings.some((recording) => recording.rating.value > 3));
    t.true(labels.some((label) => label.rating.voteCount > 0));
    t.true(labels.some((label) => label.rating.value > 3));
    t.true(
      releaseGroups.some((releaseGroup) => releaseGroup.rating.voteCount > 0)
    );
    t.true(releaseGroups.some((releaseGroup) => releaseGroup.rating.value > 3));
  }
);

test(
  'discs can be looked up by disc ID',
  testData,
  `
  {
    lookup {
      disc(discID: "TMXdzZkTcc9Jq24PD0w5J9_AXms-") {
        id
        discID
        offsetCount
        offsets
        sectors
        releases {
          totalCount
          edges {
            node {
              mbid
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const { disc } = data.lookup;
    t.is(disc.discID, 'TMXdzZkTcc9Jq24PD0w5J9_AXms-');
    t.is(disc.offsetCount, 9);
    t.is(disc.sectors, 193443);
    t.deepEqual(disc.offsets, [
      150,
      18190,
      34163,
      66150,
      87453,
      116853,
      151413,
      166833,
      184123,
    ]);
    t.is(disc.releases.totalCount, 1);
    t.is(disc.releases.edges.length, 1);
    t.is(
      disc.releases.edges[0].node.mbid,
      '7f6d3088-837d-495e-905f-be5c70ac2d82'
    );
  }
);

test(
  'release media has a list of discs',
  testData,
  `
  {
    lookup {
      release(mbid: "7f6d3088-837d-495e-905f-be5c70ac2d82") {
        media {
          discs {
            discID
            releases {
              totalCount
              edges {
                node {
                  mbid
                }
              }
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const { release } = data.lookup;
    t.is(release.media.length, 1);
    t.is(release.media[0].discs.length, 2);
  }
);

// FIXME: API seems to have changed, potentially a bug in MusicBrainz.
test(
  'disc queries can be deeply nested',
  testData,
  `
  {
    lookup {
      disc(discID: "TMXdzZkTcc9Jq24PD0w5J9_AXms-") {
        discID
        offsetCount
        offsets
        sectors
        releases {
          totalCount
          edges {
            node {
              mbid
              title
              date
              media {
                discs {
                  discID
                  releases {
                    edges {
                      node {
                        date
                        media {
                          discs {
                            discID
                            releases {
                              edges {
                                node {
                                  date
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const { disc } = data.lookup;
    t.true(disc.releases.edges.length > 0);
    disc.releases.edges.forEach((release) => {
      t.true(release.node.media.length > 0);
      release.node.media.forEach((medium) => {
        t.true(medium.discs.length > 0);
        medium.discs.forEach((disc) => {
          t.true(disc.releases.edges.length > 0);
          disc.releases.edges.forEach((release) => {
            t.true(release.node.media.length > 0);
            release.node.media.forEach((medium) => {
              t.true(medium.discs.length > 0);
            });
          });
        });
      });
    });
  }
);

test(
  'entities support tags',
  testData,
  `
  {
    lookup {
      label(mbid: "38dc88de-7720-4100-9d5b-3cdc41b0c474") {
        tags {
          edges {
            node {
              name
              count
            }
          }
        }
      }
    }
    search {
      artists(query: "Leonard Cohen", first: 1) {
        edges {
          node {
            tags {
              edges {
                node {
                  name
                  count
                }
              }
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    const { label } = data.lookup;
    const artists = data.search.artists.edges.map((edge) => edge.node);
    t.true(label.tags.edges.some((edge) => edge.node.name === 'indie folk'));
    t.true(label.tags.edges.some((edge) => edge.node.count > 0));
    t.true(
      artists[0].tags.edges.some((edge) => edge.node.name === 'blues rock')
    );
    t.true(artists[0].tags.edges.some((edge) => edge.node.count > 0));
  }
);

test(
  'releases can include tracks',
  testData,
  `
  {
    lookup {
      release(mbid: "fba5f8fe-c6c8-4511-8562-c9febf482674") {
        media {
          trackCount
          position
          formatID
          format
          tracks {
            mbid
            title
            position
            number
            length
            recording {
              title
            }
          }
        }
      }
    }
  }
`,
  (t, data) => {
    t.true(data.lookup.release.media.every((media) => media.tracks.length > 0));
    t.true(
      data.lookup.release.media.every((media) =>
        media.tracks.every((track) => track.recording)
      )
    );
  }
);
