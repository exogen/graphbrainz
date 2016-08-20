# graphbrainz

GraphQL server for the MusicBrainz API

## Schema

```graphql

schema {
  query: RootQuery
}

type Alias {
  name: String
  sortName: String
  locale: String
  primary: Boolean
  type: String
  typeID: MBID
}

type Area implements Entity {
  id: MBID!
  name: String
  sortName: String
  disambiguation: String
  isoCodes: [String]
  artists(limit: Int, offset: Int): [Artist]
  events(limit: Int, offset: Int): [Event]
  labels(limit: Int, offset: Int): [Label]
  places(limit: Int, offset: Int): [Place]
  releases(limit: Int,
           offset: Int,
           type: ReleaseGroupType,
           types: [ReleaseGroupType],
           status: ReleaseStatus,
           statuses: [ReleaseStatus]): [Release]
}

type AreaPage {
  count: Int!
  offset: Int!
  created: Date
  results: [Area]!
}

type Artist implements Entity {
  id: MBID!
  name: String
  sortName: String
  disambiguation: String
  aliases: [Alias]
  country: String
  area: Area
  beginArea: Area
  endArea: Area
  lifeSpan: LifeSpan
  gender: String
  genderID: MBID
  type: String
  typeID: MBID
  recordings(limit: Int, offset: Int): [Recording]
  releases(limit: Int,
           offset: Int,
           type: ReleaseGroupType,
           types: [ReleaseGroupType],
           status: ReleaseStatus,
           statuses: [ReleaseStatus]): [Release]
  releaseGroups(limit: Int,
                offset: Int,
                type: ReleaseGroupType,
                types: [ReleaseGroupType]): [ReleaseGroup]
  works(limit: Int, offset: Int): [Work]
  relations: Relations
}

type ArtistCredit {
  artist: Artist
  name: String
  joinPhrase: String
}

type ArtistPage {
  count: Int!
  offset: Int!
  created: Date
  results: [Artist]!
}

type BrowseQuery {
  artists(limit: Int,
          offset: Int,
          area: MBID,
          recording: MBID,
          release: MBID,
          releaseGroup: MBID,
          work: MBID): ArtistPage
  events(limit: Int,
         offset: Int,
         area: MBID,
         artist: MBID,
         place: MBID): EventPage
  labels(limit: Int,
         offset: Int,
         area: MBID,
         release: MBID): LabelPage
  places(limit: Int,
         offset: Int,
         area: MBID): PlacePage
  recordings(limit: Int,
             offset: Int,
             artist: MBID,
             release: MBID): RecordingPage
  releases(limit: Int,
           offset: Int,
           area: MBID,
           artist: MBID,
           label: MBID,
           track: MBID,
           trackArtist: MBID,
           recording: MBID,
           releaseGroup: MBID): ReleasePage
  releaseGroups(limit: Int,
                offset: Int,
                artist: MBID,
                release: MBID): ReleaseGroupPage
  works(limit: Int,
        offset: Int,
        artist: MBID): WorkPage
  urls(limit: Int,
       offset: Int,
       resource: URLString): URLPage
}

type Coordinates {
  latitude: Degrees
  longitude: Degrees
}

scalar Date

scalar Degrees

interface Entity {
  id: MBID!
}

type Event implements Entity {
  id: MBID!
  name: String
  disambiguation: String
  lifeSpan: LifeSpan
  time: Time
  cancelled: Boolean
  setlist: String
  type: String
  typeID: MBID
}

type EventPage {
  count: Int!
  offset: Int!
  created: Date
  results: [Event]!
}

type Instrument implements Entity {
  id: MBID!
  name: String
  disambiguation: String
  description: String
  type: String
  typeID: MBID
}

scalar IPI

type Label implements Entity {
  id: MBID!
  name: String
  sortName: String
  disambiguation: String
  country: String
  area: Area
  lifeSpan: LifeSpan
  labelCode: Int
  ipis: [IPI]
  type: String
  typeID: MBID
  releases(limit: Int,
           offset: Int,
           type: ReleaseGroupType,
           types: [ReleaseGroupType],
           status: ReleaseStatus,
           statuses: [ReleaseStatus]): [Release]
}

type LabelPage {
  count: Int!
  offset: Int!
  created: Date
  results: [Label]!
}

type LifeSpan {
  begin: Date
  end: Date
  ended: Boolean
}

type LookupQuery {
  area(id: MBID!): Area
  artist(id: MBID!): Artist
  event(id: MBID!): Event
  instrument(id: MBID!): Instrument
  label(id: MBID!): Label
  place(id: MBID!): Place
  recording(id: MBID!): Recording
  release(id: MBID!): Release
  releaseGroup(id: MBID!): ReleaseGroup
  url(id: MBID!): URL
  work(id: MBID!): Work
}

scalar MBID

type Place implements Entity {
  id: MBID!
  name: String
  disambiguation: String
  address: String
  area: Area
  coordinates: Coordinates
  lifeSpan: LifeSpan
  type: String
  typeID: MBID
  events(limit: Int, offset: Int): [Event]
}

type PlacePage {
  count: Int!
  offset: Int!
  created: Date
  results: [Place]!
}

type Recording implements Entity {
  id: MBID!
  title: String
  disambiguation: String
  artistCredit: [ArtistCredit]
  length: Int
  video: Boolean
  artists(limit: Int, offset: Int): [Artist]
  releases(limit: Int,
           offset: Int,
           type: ReleaseGroupType,
           types: [ReleaseGroupType],
           status: ReleaseStatus,
           statuses: [ReleaseStatus]): [Release]
  relations: Relations
}

type RecordingPage {
  count: Int!
  offset: Int!
  created: Date
  results: [Recording]!
}

type Relation {
  target: Entity!
  direction: String!
  targetType: String!
  sourceCredit: String
  targetCredit: String
  begin: Date
  end: Date
  ended: Boolean
  attributes: [String]
  type: String
  typeID: MBID
}

type Relations {
  area(limit: Int,
       offset: Int,
       direction: String,
       type: String,
       typeID: MBID): [Relation]
  artist(limit: Int,
         offset: Int,
         direction: String,
         type: String,
         typeID: MBID): [Relation]
  event(limit: Int,
        offset: Int,
        direction: String,
        type: String,
        typeID: MBID): [Relation]
  instrument(limit: Int,
             offset: Int,
             direction: String,
             type: String,
             typeID: MBID): [Relation]
  label(limit: Int,
        offset: Int,
        direction: String,
        type: String,
        typeID: MBID): [Relation]
  place(limit: Int,
        offset: Int,
        direction: String,
        type: String,
        typeID: MBID): [Relation]
  recording(limit: Int,
            offset: Int,
            direction: String,
            type: String,
            typeID: MBID): [Relation]
  release(limit: Int,
          offset: Int,
          direction: String,
          type: String,
          typeID: MBID): [Relation]
  releaseGroup(limit: Int,
               offset: Int,
               direction: String,
               type: String,
               typeID: MBID): [Relation]
  series(limit: Int,
         offset: Int,
         direction: String,
         type: String,
         typeID: MBID): [Relation]
  url(limit: Int,
      offset: Int,
      direction: String,
      type: String,
      typeID: MBID): [Relation]
  work(limit: Int,
       offset: Int,
       direction: String,
       type: String,
       typeID: MBID): [Relation]
}

type Release implements Entity {
  id: MBID!
  title: String
  disambiguation: String
  artistCredit: [ArtistCredit]
  releaseEvents: [ReleaseEvent]
  date: Date
  country: String
  barcode: String
  status: String
  statusID: MBID
  packaging: String
  packagingID: MBID
  quality: String
  artists(limit: Int, offset: Int): [Artist]
  labels(limit: Int, offset: Int): [Label]
  recordings(limit: Int, offset: Int): [Recording]
  releaseGroups(limit: Int,
                offset: Int,
                type: ReleaseGroupType,
                types: [ReleaseGroupType]): [ReleaseGroup]
  relations: Relations
}

type ReleaseEvent {
  area: Area
  date: Date
}

type ReleaseGroup implements Entity {
  id: MBID!
  title: String
  disambiguation: String
  artistCredit: [ArtistCredit]
  firstReleaseDate: Date
  primaryType: String
  primaryTypeID: MBID
  secondaryTypes: [String]
  secondaryTypeIDs: [MBID]
  artists(limit: Int, offset: Int): [Artist]
  releases(limit: Int,
           offset: Int,
           type: ReleaseGroupType,
           types: [ReleaseGroupType],
           status: ReleaseStatus,
           statuses: [ReleaseStatus]): [Release]
  relations: Relations
}

type ReleaseGroupPage {
  count: Int!
  offset: Int!
  created: Date
  results: [ReleaseGroup]!
}

enum ReleaseGroupType {
  ALBUM
  SINGLE
  EP
  OTHER
  BROADCAST
  COMPILATION
  SOUNDTRACK
  SPOKENWORD
  INTERVIEW
  AUDIOBOOK
  LIVE
  REMIX
  DJMIX
  MIXTAPE
  DEMO
  NAT
}

type ReleasePage {
  count: Int!
  offset: Int!
  created: Date
  results: [Release]!
}

enum ReleaseStatus {
  OFFICIAL
  PROMOTION
  BOOTLEG
  PSEUDORELEASE
}

type RootQuery {
  lookup: LookupQuery
  browse: BrowseQuery
  search: SearchQuery
}

type SearchQuery {
  areas(query: String!, limit: Int, offset: Int): AreaPage
  artists(query: String!, limit: Int, offset: Int): ArtistPage
  labels(query: String!, limit: Int, offset: Int): LabelPage
  places(query: String!, limit: Int, offset: Int): PlacePage
  recordings(query: String!, limit: Int, offset: Int): RecordingPage
  releases(query: String!, limit: Int, offset: Int): ReleasePage
  releaseGroups(query: String!, limit: Int, offset: Int): ReleaseGroupPage
  works(query: String!, limit: Int, offset: Int): WorkPage
}

scalar Time

type URL implements Entity {
  id: MBID!
  resource: URLString!
  relations: Relations
}

type URLPage {
  count: Int!
  offset: Int!
  created: Date
  results: [URL]!
}

scalar URLString

type Work implements Entity {
  id: MBID!
  title: String
  disambiguation: String
  iswcs: [String]
  language: String
  type: String
  typeID: MBID
  artists(limit: Int, offset: Int): [Artist]
  relations: Relations
}

type WorkPage {
  count: Int!
  offset: Int!
  created: Date
  results: [Work]!
}

```
