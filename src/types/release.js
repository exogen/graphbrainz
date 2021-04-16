import GraphQL from 'graphql';
import { Node } from './node.js';
import { Entity } from './entity.js';
import { ASIN, DateType } from './scalars.js';
import { Media } from './media.js';
import { ReleaseStatus } from './enums.js';
import { ReleaseEvent } from './release-event.js';
import {
  id,
  mbid,
  title,
  disambiguation,
  fieldWithID,
  releaseGroupType,
  releaseStatus,
  resolveHyphenated,
  connectionWithExtras,
  linkedQuery,
} from './helpers.js';
import { aliases } from './alias.js';
import { artistCredit, artistCredits } from './artist-credit.js';
import { artists } from './artist.js';
import { collections } from './collection.js';
import { labels } from './label.js';
import { recordings } from './recording.js';
import { relationships } from './relationship.js';
import { releaseGroups } from './release-group.js';
import { tags } from './tag.js';

const { GraphQLObjectType, GraphQLString, GraphQLList } = GraphQL;

export const Release = new GraphQLObjectType({
  name: 'Release',
  description: `A [release](https://musicbrainz.org/doc/Release) represents the
unique release (i.e. issuing) of a product on a specific date with specific
release information such as the country, label, barcode, packaging, etc. If you
walk into a store and purchase an album or single, they’re each represented in
MusicBrainz as one release.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    title,
    disambiguation,
    aliases,
    artistCredit,
    artistCredits,
    releaseEvents: {
      type: new GraphQLList(ReleaseEvent),
      description: 'The release events for this release.',
      resolve: resolveHyphenated,
    },
    date: {
      type: DateType,
      description: `The [release date](https://musicbrainz.org/doc/Release/Date)
is the date in which a release was made available through some sort of
distribution mechanism.`,
    },
    country: {
      type: GraphQLString,
      description: 'The country in which the release was issued.',
    },
    asin: {
      type: ASIN,
      description: `The [Amazon Standard Identification Number](https://musicbrainz.org/doc/ASIN)
of the release.`,
    },
    barcode: {
      type: GraphQLString,
      description: `The [barcode](https://en.wikipedia.org/wiki/Barcode), if the
release has one. The most common types found on releases are 12-digit
[UPCs](https://en.wikipedia.org/wiki/Universal_Product_Code) and 13-digit
[EANs](https://en.wikipedia.org/wiki/International_Article_Number).`,
    },
    ...fieldWithID('status', {
      type: ReleaseStatus,
      description: 'The status describes how “official” a release is.',
    }),
    ...fieldWithID('packaging', {
      description: `The physical packaging that accompanies the release. See
the [list of packaging](https://musicbrainz.org/doc/Release/Packaging) for more
information.`,
    }),
    quality: {
      type: GraphQLString,
      description: `Data quality indicates how good the data for a release is.
It is not a mark of how good or bad the music itself is – for that, use
[ratings](https://musicbrainz.org/doc/Rating_System).`,
    },
    media: {
      type: new GraphQLList(Media),
      description: 'The media on which the release was distributed.',
    },
    artists,
    labels,
    recordings,
    releaseGroups,
    relationships,
    collections,
    tags,
  }),
});

export const ReleaseConnection = connectionWithExtras(Release);

export const releases = linkedQuery(ReleaseConnection, {
  args: {
    type: releaseGroupType,
    status: releaseStatus,
  },
});
