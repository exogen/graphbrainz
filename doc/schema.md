# GraphQL Schema

```graphql
# [Aliases](https://musicbrainz.org/doc/Aliases) are variant names
# that are mostly used as search help: if a search matches an entity’s alias, the
# entity will be given as a result – even if the actual name wouldn’t be. They are
# available for artists, labels, and works.
type Alias {
  # The aliased name of the entity.
  name: String

  # The string to use for the purpose of ordering by name (for
  # example, by moving articles like ‘the’ to the end or a person’s last name to
  # the front).
  sortName: String

  # The locale (language and/or country) in which the alias is
  # used.
  locale: String

  # Whether this is the main alias for the entity in the
  # specified locale (this could mean the most recent or the most common).
  primary: Boolean

  # The type or purpose of the alias – whether it is a variant,
  # search hint, etc.
  type: String

  # The MBID associated with the value of the `type`
  # field.
  typeID: MBID
}

# [Areas](https://musicbrainz.org/doc/Area) are geographic regions
# or settlements (countries, cities, or the like).
type Area implements Node, Entity {
  # The ID of an object
  id: ID!

  # The MBID of the entity.
  mbid: MBID!

  # The official name of the entity.
  name: String

  # The string to use for the purpose of ordering by name (for
  # example, by moving articles like ‘the’ to the end or a person’s last name to
  # the front).
  sortName: String

  # A comment used to help distinguish identically named entitites.
  disambiguation: String

  # [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
  # alternate names or misspellings.
  aliases: [Alias]

  # [ISO 3166 codes](https://en.wikipedia.org/wiki/ISO_3166) are
  # the codes assigned by ISO to countries and subdivisions.
  isoCodes: [String]

  # A list of artists linked to this entity.
  artists(after: String, first: Int): ArtistConnection

  # A list of events linked to this entity.
  events(after: String, first: Int): EventConnection

  # A list of labels linked to this entity.
  labels(after: String, first: Int): LabelConnection

  # A list of places linked to this entity.
  places(after: String, first: Int): PlaceConnection

  # A list of releases linked to this entity.
  releases(
    after: String
    first: Int

    # Filter by one or more release group types.
    type: [ReleaseGroupType]

    # Filter by one or more release statuses.
    status: [ReleaseStatus]
  ): ReleaseConnection

  # Relationships between this entity and other entitites.
  relationships: Relationships

  # A list of tags linked to this entity.
  tags(after: String, first: Int): TagConnection
}

# A connection to a list of items.
type AreaConnection {
  # Information to aid in pagination.
  pageInfo: PageInfo!

  # A list of edges.
  edges: [AreaEdge]

  # A count of the total number of items in this connection,
  # ignoring pagination.
  totalCount: Int
}

# An edge in a connection.
type AreaEdge {
  # The item at the end of the edge
  node: Area

  # A cursor for use in pagination
  cursor: String!

  # The relevancy score (0–100) assigned by the search engine, if
  # these results were found through a search.
  score: Int
}

# An [artist](https://musicbrainz.org/doc/Artist) is generally a
# musician, group of musicians, or other music professional (like a producer or
# engineer). Occasionally, it can also be a non-musical person (like a
# photographer, an illustrator, or a poet whose writings are set to music), or
# even a fictional character.
type Artist implements Node, Entity {
  # The ID of an object
  id: ID!

  # The MBID of the entity.
  mbid: MBID!

  # The official name of the entity.
  name: String

  # The string to use for the purpose of ordering by name (for
  # example, by moving articles like ‘the’ to the end or a person’s last name to
  # the front).
  sortName: String

  # A comment used to help distinguish identically named entitites.
  disambiguation: String

  # [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
  # alternate names or misspellings.
  aliases: [Alias]

  # The country with which an artist is primarily identified. It
  # is often, but not always, its birth/formation country.
  country: String

  # The area with which an artist is primarily identified. It
  # is often, but not always, its birth/formation country.
  area: Area

  # The area in which an artist began their career (or where
  # were born, if the artist is a person).
  beginArea: Area

  # The area in which an artist ended their career (or where
  # they died, if the artist is a person).
  endArea: Area

  # The begin and end dates of the entity’s existence. Its exact
  # meaning depends on the type of entity.
  lifeSpan: LifeSpan

  # Whether a person or character identifies as male, female, or
  # neither. Groups do not have genders.
  gender: String

  # The MBID associated with the value of the `gender`
  # field.
  genderID: MBID

  # Whether an artist is a person, a group, or something else.
  type: String

  # The MBID associated with the value of the `type`
  # field.
  typeID: MBID

  # A list of recordings linked to this entity.
  recordings(after: String, first: Int): RecordingConnection

  # A list of releases linked to this entity.
  releases(
    after: String
    first: Int

    # Filter by one or more release group types.
    type: [ReleaseGroupType]

    # Filter by one or more release statuses.
    status: [ReleaseStatus]
  ): ReleaseConnection

  # A list of release groups linked to this entity.
  releaseGroups(
    after: String
    first: Int

    # Filter by one or more release group types.
    type: [ReleaseGroupType]
  ): ReleaseGroupConnection

  # A list of works linked to this entity.
  works(after: String, first: Int): WorkConnection

  # Relationships between this entity and other entitites.
  relationships: Relationships

  # A list of tags linked to this entity.
  tags(after: String, first: Int): TagConnection
}

# A connection to a list of items.
type ArtistConnection {
  # Information to aid in pagination.
  pageInfo: PageInfo!

  # A list of edges.
  edges: [ArtistEdge]

  # A count of the total number of items in this connection,
  # ignoring pagination.
  totalCount: Int
}

# [Artist credits](https://musicbrainz.org/doc/Artist_Credits)
# indicate who is the main credited artist (or artists) for releases, release
# groups, tracks and recordings, and how they are credited. They consist of
# artists, with (optionally) their names as credited in the specific release,
# track, etc., and join phrases between them.
type ArtistCredit {
  # The entity representing the artist referenced in the
  # credits.
  artist: Artist

  # The name of the artist as credited in the specific release,
  # track, etc.
  name: String

  # Join phrases might include words and/or punctuation to
  # separate artist names as they appear on the release, track, etc.
  joinPhrase: String
}

# An edge in a connection.
type ArtistEdge {
  # The item at the end of the edge
  node: Artist

  # A cursor for use in pagination
  cursor: String!

  # The relevancy score (0–100) assigned by the search engine, if
  # these results were found through a search.
  score: Int
}

# A query for all MusicBrainz entities directly linked to another
# entity.
type BrowseQuery {
  # Browse area entities linked to the given arguments.
  areas(
    after: String
    first: Int

    # The MBID of a collection in which the entity is found.
    collection: MBID
  ): AreaConnection

  # Browse artist entities linked to the given arguments.
  artists(
    after: String
    first: Int

    # The MBID of an area to which the entity is linked.
    area: MBID

    # The MBID of a collection in which the entity is found.
    collection: MBID

    # The MBID of a recording to which the entity is linked.
    recording: MBID

    # The MBID of a release to which the entity is linked.
    release: MBID

    # The MBID of a release group to which the entity is linked.
    releaseGroup: MBID

    # The MBID of a work to which the artist is linked.
    work: MBID
  ): ArtistConnection

  # Browse event entities linked to the given arguments.
  events(
    after: String
    first: Int

    # The MBID of an area to which the entity is linked.
    area: MBID

    # The MBID of an artist to which the entity is linked.
    artist: MBID

    # The MBID of a collection in which the entity is found.
    collection: MBID

    # The MBID of a place to which the event is linked.
    place: MBID
  ): EventConnection

  # Browse label entities linked to the given arguments.
  labels(
    after: String
    first: Int

    # The MBID of an area to which the entity is linked.
    area: MBID

    # The MBID of a collection in which the entity is found.
    collection: MBID

    # The MBID of a release to which the entity is linked.
    release: MBID
  ): LabelConnection

  # Browse place entities linked to the given arguments.
  places(
    after: String
    first: Int

    # The MBID of an area to which the entity is linked.
    area: MBID

    # The MBID of a collection in which the entity is found.
    collection: MBID
  ): PlaceConnection

  # Browse recording entities linked to the given arguments.
  recordings(
    after: String
    first: Int

    # The MBID of an artist to which the entity is linked.
    artist: MBID

    # The MBID of a collection in which the entity is found.
    collection: MBID

    # The MBID of a release to which the entity is linked.
    release: MBID
  ): RecordingConnection

  # Browse release entities linked to the given arguments.
  releases(
    after: String
    first: Int

    # The MBID of an area to which the entity is linked.
    area: MBID

    # The MBID of an artist to which the entity is linked.
    artist: MBID

    # The MBID of a collection in which the entity is found.
    collection: MBID

    # The MBID of a label to which the release is linked.
    label: MBID

    # The MBID of a track that is included in the release.
    track: MBID

    # The MBID of an artist that appears on a track in the
    # release, but is not included in the credits for the release itself.
    trackArtist: MBID

    # The MBID of a recording to which the entity is linked.
    recording: MBID

    # The MBID of a release group to which the entity is linked.
    releaseGroup: MBID
  ): ReleaseConnection

  # Browse release group entities linked to the given arguments.
  releaseGroups(
    after: String
    first: Int

    # The MBID of an artist to which the entity is linked.
    artist: MBID

    # The MBID of a collection in which the entity is found.
    collection: MBID

    # The MBID of a release to which the entity is linked.
    release: MBID
  ): ReleaseGroupConnection

  # Browse work entities linked to the given arguments.
  works(
    after: String
    first: Int

    # The MBID of an artist to which the entity is linked.
    artist: MBID

    # The MBID of a collection in which the entity is found.
    collection: MBID
  ): WorkConnection

  # Browse URL entities linked to the given arguments.
  urls(
    after: String
    first: Int

    # The web address for which to browse URL entities.
    resource: URLString
  ): URLConnection
}

# Geographic coordinates described with latitude and longitude.
type Coordinates {
  # The north–south position of a point on the Earth’s surface.
  latitude: Degrees

  # The east–west position of a point on the Earth’s surface.
  longitude: Degrees
}

# Year, month (optional), and day (optional) in YYYY-MM-DD format.
scalar Date

# Decimal degrees, used for latitude and longitude.
scalar Degrees

# An entity in the MusicBrainz schema.
interface Entity {
  # The MBID of the entity.
  mbid: MBID!
}

# An [event](https://musicbrainz.org/doc/Event) refers to an
# organised event which people can attend, and is relevant to MusicBrainz.
# Generally this means live performances, like concerts and festivals.
type Event implements Node, Entity {
  # The ID of an object
  id: ID!

  # The MBID of the entity.
  mbid: MBID!

  # The official name of the entity.
  name: String

  # A comment used to help distinguish identically named entitites.
  disambiguation: String

  # [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
  # alternate names or misspellings.
  aliases: [Alias]

  # The begin and end dates of the entity’s existence. Its exact
  # meaning depends on the type of entity.
  lifeSpan: LifeSpan

  # The start time of the event.
  time: Time

  # Whether or not the event took place.
  cancelled: Boolean

  # A list of songs performed, optionally including links to
  # artists and works. See the [setlist documentation](https://musicbrainz.org/doc/Event/Setlist)
  # for syntax and examples.
  setlist: String

  # What kind of event the event is, e.g. concert, festival, etc.
  type: String

  # The MBID associated with the value of the `type`
  # field.
  typeID: MBID

  # Relationships between this entity and other entitites.
  relationships: Relationships

  # A list of tags linked to this entity.
  tags(after: String, first: Int): TagConnection
}

# A connection to a list of items.
type EventConnection {
  # Information to aid in pagination.
  pageInfo: PageInfo!

  # A list of edges.
  edges: [EventEdge]

  # A count of the total number of items in this connection,
  # ignoring pagination.
  totalCount: Int
}

# An edge in a connection.
type EventEdge {
  # The item at the end of the edge
  node: Event

  # A cursor for use in pagination
  cursor: String!

  # The relevancy score (0–100) assigned by the search engine, if
  # these results were found through a search.
  score: Int
}

# [Instruments](https://musicbrainz.org/doc/Instrument) are
# devices created or adapted to make musical sounds. Instruments are primarily
# used in relationships between two other entities.
type Instrument implements Node, Entity {
  # The ID of an object
  id: ID!

  # The MBID of the entity.
  mbid: MBID!

  # The official name of the entity.
  name: String

  # A comment used to help distinguish identically named entitites.
  disambiguation: String

  # [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
  # alternate names or misspellings.
  aliases: [Alias]

  # A brief description of the main characteristics of the
  # instrument.
  description: String

  # The type categorises the instrument by the way the sound is
  # created, similar to the [Hornbostel-Sachs](https://en.wikipedia.org/wiki/Hornbostel%E2%80%93Sachs)
  # classification.
  type: String

  # The MBID associated with the value of the `type`
  # field.
  typeID: MBID

  # Relationships between this entity and other entitites.
  relationships: Relationships

  # A list of tags linked to this entity.
  tags(after: String, first: Int): TagConnection
}

# A connection to a list of items.
type InstrumentConnection {
  # Information to aid in pagination.
  pageInfo: PageInfo!

  # A list of edges.
  edges: [InstrumentEdge]

  # A count of the total number of items in this connection,
  # ignoring pagination.
  totalCount: Int
}

# An edge in a connection.
type InstrumentEdge {
  # The item at the end of the edge
  node: Instrument

  # A cursor for use in pagination
  cursor: String!

  # The relevancy score (0–100) assigned by the search engine, if
  # these results were found through a search.
  score: Int
}

# An [IPI](https://musicbrainz.org/doc/IPI) (interested party
# information) code is an identifying number assigned by the CISAC database for
# musical rights management.
scalar IPI

# [Labels](https://musicbrainz.org/doc/Label) represent mostly
# (but not only) imprints. To a lesser extent, a label entity may be created to
# represent a record company.
type Label implements Node, Entity {
  # The ID of an object
  id: ID!

  # The MBID of the entity.
  mbid: MBID!

  # The official name of the entity.
  name: String

  # The string to use for the purpose of ordering by name (for
  # example, by moving articles like ‘the’ to the end or a person’s last name to
  # the front).
  sortName: String

  # A comment used to help distinguish identically named entitites.
  disambiguation: String

  # [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
  # alternate names or misspellings.
  aliases: [Alias]

  # The country of origin for the label.
  country: String

  # The area in which the label is based.
  area: Area

  # The begin and end dates of the entity’s existence. Its exact
  # meaning depends on the type of entity.
  lifeSpan: LifeSpan

  # The [“LC” code](https://musicbrainz.org/doc/Label/Label_Code)
  # of the label.
  labelCode: Int

  # List of IPI (interested party information) codes for the
  # label.
  ipis: [IPI]

  # A type describing the main activity of the label, e.g.
  # imprint, production, distributor, rights society, etc.
  type: String

  # The MBID associated with the value of the `type`
  # field.
  typeID: MBID

  # A list of releases linked to this entity.
  releases(
    after: String
    first: Int

    # Filter by one or more release group types.
    type: [ReleaseGroupType]

    # Filter by one or more release statuses.
    status: [ReleaseStatus]
  ): ReleaseConnection

  # Relationships between this entity and other entitites.
  relationships: Relationships

  # A list of tags linked to this entity.
  tags(after: String, first: Int): TagConnection
}

# A connection to a list of items.
type LabelConnection {
  # Information to aid in pagination.
  pageInfo: PageInfo!

  # A list of edges.
  edges: [LabelEdge]

  # A count of the total number of items in this connection,
  # ignoring pagination.
  totalCount: Int
}

# An edge in a connection.
type LabelEdge {
  # The item at the end of the edge
  node: Label

  # A cursor for use in pagination
  cursor: String!

  # The relevancy score (0–100) assigned by the search engine, if
  # these results were found through a search.
  score: Int
}

# Fields indicating the begin and end date of an entity’s
# lifetime, including whether it has ended (even if the date is unknown).
type LifeSpan {
  # The start date of the entity’s life span.
  begin: Date

  # The end date of the entity’s life span.
  end: Date

  # Whether or not the entity’s life span has ended.
  ended: Boolean
}

# A lookup of an individual MusicBrainz entity by its MBID.
type LookupQuery {
  # Look up a specific area by its MBID.
  area(
    # The MBID of the entity.
    mbid: MBID!
  ): Area

  # Look up a specific artist by its MBID.
  artist(
    # The MBID of the entity.
    mbid: MBID!
  ): Artist

  # Look up a specific event by its MBID.
  event(
    # The MBID of the entity.
    mbid: MBID!
  ): Event

  # Look up a specific instrument by its MBID.
  instrument(
    # The MBID of the entity.
    mbid: MBID!
  ): Instrument

  # Look up a specific label by its MBID.
  label(
    # The MBID of the entity.
    mbid: MBID!
  ): Label

  # Look up a specific place by its MBID.
  place(
    # The MBID of the entity.
    mbid: MBID!
  ): Place

  # Look up a specific recording by its MBID.
  recording(
    # The MBID of the entity.
    mbid: MBID!
  ): Recording

  # Look up a specific release by its MBID.
  release(
    # The MBID of the entity.
    mbid: MBID!
  ): Release

  # Look up a specific release group by its MBID.
  releaseGroup(
    # The MBID of the entity.
    mbid: MBID!
  ): ReleaseGroup

  # Look up a specific series by its MBID.
  series(
    # The MBID of the entity.
    mbid: MBID!
  ): Series

  # Look up a specific URL by its MBID.
  url(
    # The MBID of the entity.
    mbid: MBID!
  ): URL

  # Look up a specific work by its MBID.
  work(
    # The MBID of the entity.
    mbid: MBID!
  ): Work
}

# The MBID scalar represents MusicBrainz identifiers, which are
# 36-character UUIDs.
scalar MBID

# An object with an ID
interface Node {
  # The id of the object.
  id: ID!
}

# Information about pagination in a connection.
type PageInfo {
  # When paginating forwards, are there more items?
  hasNextPage: Boolean!

  # When paginating backwards, are there more items?
  hasPreviousPage: Boolean!

  # When paginating backwards, the cursor to continue.
  startCursor: String

  # When paginating forwards, the cursor to continue.
  endCursor: String
}

# A [place](https://musicbrainz.org/doc/Place) is a venue, studio
# or other place where music is performed, recorded, engineered, etc.
type Place implements Node, Entity {
  # The ID of an object
  id: ID!

  # The MBID of the entity.
  mbid: MBID!

  # The official name of the entity.
  name: String

  # A comment used to help distinguish identically named entitites.
  disambiguation: String

  # [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
  # alternate names or misspellings.
  aliases: [Alias]

  # The address describes the location of the place using the
  # standard addressing format for the country it is located in.
  address: String

  # The area entity representing the area, such as the city, in
  # which the place is located.
  area: Area

  # The geographic coordinates of the place.
  coordinates: Coordinates

  # The begin and end dates of the entity’s existence. Its exact
  # meaning depends on the type of entity.
  lifeSpan: LifeSpan

  # The type categorises the place based on its primary
  # function.
  type: String

  # The MBID associated with the value of the `type`
  # field.
  typeID: MBID

  # A list of events linked to this entity.
  events(after: String, first: Int): EventConnection

  # Relationships between this entity and other entitites.
  relationships: Relationships

  # A list of tags linked to this entity.
  tags(after: String, first: Int): TagConnection
}

# A connection to a list of items.
type PlaceConnection {
  # Information to aid in pagination.
  pageInfo: PageInfo!

  # A list of edges.
  edges: [PlaceEdge]

  # A count of the total number of items in this connection,
  # ignoring pagination.
  totalCount: Int
}

# An edge in a connection.
type PlaceEdge {
  # The item at the end of the edge
  node: Place

  # A cursor for use in pagination
  cursor: String!

  # The relevancy score (0–100) assigned by the search engine, if
  # these results were found through a search.
  score: Int
}

# The query root, from which multiple types of MusicBrainz
# requests can be made.
type Query {
  # Fetches an object given its ID
  node(
    # The ID of an object
    id: ID!
  ): Node

  # Perform a lookup of a MusicBrainz entity by its MBID.
  lookup: LookupQuery

  # Browse all MusicBrainz entities directly linked to another entity.
  browse: BrowseQuery

  # Search for MusicBrainz entities using Lucene query syntax.
  search: SearchQuery
}

# A [recording](https://musicbrainz.org/doc/Recording) is an
# entity in MusicBrainz which can be linked to tracks on releases. Each track must
# always be associated with a single recording, but a recording can be linked to
# any number of tracks.
#
# A recording represents distinct audio that has been used to produce at least one
# released track through copying or mastering. A recording itself is never
# produced solely through copying or mastering.
#
# Generally, the audio represented by a recording corresponds to the audio at a
# stage in the production process before any final mastering but after any editing
# or mixing.
type Recording implements Node, Entity {
  # The ID of an object
  id: ID!

  # The MBID of the entity.
  mbid: MBID!

  # The official title of the entity.
  title: String

  # A comment used to help distinguish identically named entitites.
  disambiguation: String

  # [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
  # alternate names or misspellings.
  aliases: [Alias]

  # The main credited artist(s).
  artistCredit: [ArtistCredit]

  # An approximation to the length of the recording, calculated
  # from the lengths of the tracks using it.
  length: Int

  # Whether this is a video recording.
  video: Boolean

  # A list of artists linked to this entity.
  artists(after: String, first: Int): ArtistConnection

  # A list of releases linked to this entity.
  releases(
    after: String
    first: Int

    # Filter by one or more release group types.
    type: [ReleaseGroupType]

    # Filter by one or more release statuses.
    status: [ReleaseStatus]
  ): ReleaseConnection

  # Relationships between this entity and other entitites.
  relationships: Relationships

  # A list of tags linked to this entity.
  tags(after: String, first: Int): TagConnection
}

# A connection to a list of items.
type RecordingConnection {
  # Information to aid in pagination.
  pageInfo: PageInfo!

  # A list of edges.
  edges: [RecordingEdge]

  # A count of the total number of items in this connection,
  # ignoring pagination.
  totalCount: Int
}

# An edge in a connection.
type RecordingEdge {
  # The item at the end of the edge
  node: Recording

  # A cursor for use in pagination
  cursor: String!

  # The relevancy score (0–100) assigned by the search engine, if
  # these results were found through a search.
  score: Int
}

# [Relationships](https://musicbrainz.org/doc/Relationships) are a
# way to represent all the different ways in which entities are connected to each
# other and to URLs outside MusicBrainz.
type Relationship {
  # The target entity.
  target: Entity!

  # The direction of the relationship.
  direction: String!

  # The type of entity on the receiving end of the relationship.
  targetType: String!

  # How the source entity was actually credited, if different
  # from its main (performance) name.
  sourceCredit: String

  # How the target entity was actually credited, if different
  # from its main (performance) name.
  targetCredit: String

  # The date on which the relationship became applicable.
  begin: Date

  # The date on which the relationship became no longer applicable.
  end: Date

  # Whether the relationship still applies.
  ended: Boolean

  # Attributes which modify the relationship. There is a [list
  # of all attributes](https://musicbrainz.org/relationship-attributes), but the
  # attributes which are available, and how they should be used, depends on the
  # relationship type.
  attributes: [String]

  # The type of relationship.
  type: String

  # The MBID associated with the value of the `type`
  # field.
  typeID: MBID
}

# A connection to a list of items.
type RelationshipConnection {
  # Information to aid in pagination.
  pageInfo: PageInfo!

  # A list of edges.
  edges: [RelationshipEdge]

  # A count of the total number of items in this connection,
  # ignoring pagination.
  totalCount: Int
}

# An edge in a connection.
type RelationshipEdge {
  # The item at the end of the edge
  node: Relationship

  # A cursor for use in pagination
  cursor: String!

  # The relevancy score (0–100) assigned by the search engine, if
  # these results were found through a search.
  score: Int
}

# Lists of entity relationships for each entity type.
type Relationships {
  # A list of relationships between these two entity types.
  areas(
    after: String
    first: Int
    before: String
    last: Int

    # Filter by the relationship direction.
    direction: String

    # Filter by the relationship type.
    type: String

    # The MBID associated with the value of the `type`
    # field.
    typeID: MBID
  ): RelationshipConnection

  # A list of relationships between these two entity types.
  artists(
    after: String
    first: Int
    before: String
    last: Int

    # Filter by the relationship direction.
    direction: String

    # Filter by the relationship type.
    type: String

    # The MBID associated with the value of the `type`
    # field.
    typeID: MBID
  ): RelationshipConnection

  # A list of relationships between these two entity types.
  events(
    after: String
    first: Int
    before: String
    last: Int

    # Filter by the relationship direction.
    direction: String

    # Filter by the relationship type.
    type: String

    # The MBID associated with the value of the `type`
    # field.
    typeID: MBID
  ): RelationshipConnection

  # A list of relationships between these two entity types.
  instruments(
    after: String
    first: Int
    before: String
    last: Int

    # Filter by the relationship direction.
    direction: String

    # Filter by the relationship type.
    type: String

    # The MBID associated with the value of the `type`
    # field.
    typeID: MBID
  ): RelationshipConnection

  # A list of relationships between these two entity types.
  labels(
    after: String
    first: Int
    before: String
    last: Int

    # Filter by the relationship direction.
    direction: String

    # Filter by the relationship type.
    type: String

    # The MBID associated with the value of the `type`
    # field.
    typeID: MBID
  ): RelationshipConnection

  # A list of relationships between these two entity types.
  places(
    after: String
    first: Int
    before: String
    last: Int

    # Filter by the relationship direction.
    direction: String

    # Filter by the relationship type.
    type: String

    # The MBID associated with the value of the `type`
    # field.
    typeID: MBID
  ): RelationshipConnection

  # A list of relationships between these two entity types.
  recordings(
    after: String
    first: Int
    before: String
    last: Int

    # Filter by the relationship direction.
    direction: String

    # Filter by the relationship type.
    type: String

    # The MBID associated with the value of the `type`
    # field.
    typeID: MBID
  ): RelationshipConnection

  # A list of relationships between these two entity types.
  releases(
    after: String
    first: Int
    before: String
    last: Int

    # Filter by the relationship direction.
    direction: String

    # Filter by the relationship type.
    type: String

    # The MBID associated with the value of the `type`
    # field.
    typeID: MBID
  ): RelationshipConnection

  # A list of relationships between these two entity types.
  releaseGroups(
    after: String
    first: Int
    before: String
    last: Int

    # Filter by the relationship direction.
    direction: String

    # Filter by the relationship type.
    type: String

    # The MBID associated with the value of the `type`
    # field.
    typeID: MBID
  ): RelationshipConnection

  # A list of relationships between these two entity types.
  series(
    after: String
    first: Int
    before: String
    last: Int

    # Filter by the relationship direction.
    direction: String

    # Filter by the relationship type.
    type: String

    # The MBID associated with the value of the `type`
    # field.
    typeID: MBID
  ): RelationshipConnection

  # A list of relationships between these two entity types.
  urls(
    after: String
    first: Int
    before: String
    last: Int

    # Filter by the relationship direction.
    direction: String

    # Filter by the relationship type.
    type: String

    # The MBID associated with the value of the `type`
    # field.
    typeID: MBID
  ): RelationshipConnection

  # A list of relationships between these two entity types.
  works(
    after: String
    first: Int
    before: String
    last: Int

    # Filter by the relationship direction.
    direction: String

    # Filter by the relationship type.
    type: String

    # The MBID associated with the value of the `type`
    # field.
    typeID: MBID
  ): RelationshipConnection
}

# A [release](https://musicbrainz.org/doc/Release) represents the
# unique release (i.e. issuing) of a product on a specific date with specific
# release information such as the country, label, barcode, packaging, etc. If you
# walk into a store and purchase an album or single, they’re each represented in
# MusicBrainz as one release.
type Release implements Node, Entity {
  # The ID of an object
  id: ID!

  # The MBID of the entity.
  mbid: MBID!

  # The official title of the entity.
  title: String

  # A comment used to help distinguish identically named entitites.
  disambiguation: String

  # [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
  # alternate names or misspellings.
  aliases: [Alias]

  # The main credited artist(s).
  artistCredit: [ArtistCredit]

  # The release events for this release.
  releaseEvents: [ReleaseEvent]

  # The [release date](https://musicbrainz.org/doc/Release/Date)
  # is the date in which a release was made available through some sort of
  # distribution mechanism.
  date: Date

  # The country in which the release was issued.
  country: String

  # The [barcode](https://en.wikipedia.org/wiki/Barcode), if the
  # release has one. The most common types found on releases are 12-digit
  # [UPCs](https://en.wikipedia.org/wiki/Universal_Product_Code) and 13-digit
  # [EANs](https://en.wikipedia.org/wiki/International_Article_Number).
  barcode: String

  # The status describes how “official” a release is.
  status: ReleaseStatus

  # The MBID associated with the value of the `status`
  # field.
  statusID: MBID

  # The physical packaging that accompanies the release. See
  # the [list of packaging](https://musicbrainz.org/doc/Release/Packaging) for more
  # information.
  packaging: String

  # The MBID associated with the value of the `packaging`
  # field.
  packagingID: MBID

  # Data quality indicates how good the data for a release is.
  # It is not a mark of how good or bad the music itself is – for that, use
  # [ratings](https://musicbrainz.org/doc/Rating_System).
  quality: String

  # A list of artists linked to this entity.
  artists(after: String, first: Int): ArtistConnection

  # A list of labels linked to this entity.
  labels(after: String, first: Int): LabelConnection

  # A list of recordings linked to this entity.
  recordings(after: String, first: Int): RecordingConnection

  # A list of release groups linked to this entity.
  releaseGroups(
    after: String
    first: Int

    # Filter by one or more release group types.
    type: [ReleaseGroupType]
  ): ReleaseGroupConnection

  # Relationships between this entity and other entitites.
  relationships: Relationships

  # A list of tags linked to this entity.
  tags(after: String, first: Int): TagConnection
}

# A connection to a list of items.
type ReleaseConnection {
  # Information to aid in pagination.
  pageInfo: PageInfo!

  # A list of edges.
  edges: [ReleaseEdge]

  # A count of the total number of items in this connection,
  # ignoring pagination.
  totalCount: Int
}

# An edge in a connection.
type ReleaseEdge {
  # The item at the end of the edge
  node: Release

  # A cursor for use in pagination
  cursor: String!

  # The relevancy score (0–100) assigned by the search engine, if
  # these results were found through a search.
  score: Int
}

# Date on which a release was issued in a country/region with a
# particular label, catalog number, barcode, and what release format was used.
type ReleaseEvent {
  area: Area
  date: Date
}

# A [release group](https://musicbrainz.org/doc/Release_Group) is
# used to group several different releases into a single logical entity. Every
# release belongs to one, and only one release group.
#
# Both release groups and releases are “albums” in a general sense, but with an
# important difference: a release is something you can buy as media such as a CD
# or a vinyl record, while a release group embraces the overall concept of an
# album – it doesn’t matter how many CDs or editions/versions it had.
type ReleaseGroup implements Node, Entity {
  # The ID of an object
  id: ID!

  # The MBID of the entity.
  mbid: MBID!

  # The official title of the entity.
  title: String

  # A comment used to help distinguish identically named entitites.
  disambiguation: String

  # [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
  # alternate names or misspellings.
  aliases: [Alias]

  # The main credited artist(s).
  artistCredit: [ArtistCredit]

  # The date of the earliest release in the group.
  firstReleaseDate: Date

  # The [type](https://musicbrainz.org/doc/Release_Group/Type)
  # of a release group describes what kind of releases the release group represents,
  # e.g. album, single, soundtrack, compilation, etc. A release group can have a
  # “main” type and an unspecified number of additional types.
  primaryType: ReleaseGroupType

  # The MBID associated with the value of the `primaryType`
  # field.
  primaryTypeID: MBID

  # Additional [types](https://musicbrainz.org/doc/Release_Group/Type)
  # that apply to this release group.
  secondaryTypes: [ReleaseGroupType]

  # The MBIDs associated with the values of the `secondaryTypes`
  # field.
  secondaryTypeIDs: [MBID]

  # A list of artists linked to this entity.
  artists(after: String, first: Int): ArtistConnection

  # A list of releases linked to this entity.
  releases(
    after: String
    first: Int

    # Filter by one or more release group types.
    type: [ReleaseGroupType]

    # Filter by one or more release statuses.
    status: [ReleaseStatus]
  ): ReleaseConnection

  # Relationships between this entity and other entitites.
  relationships: Relationships

  # A list of tags linked to this entity.
  tags(after: String, first: Int): TagConnection
}

# A connection to a list of items.
type ReleaseGroupConnection {
  # Information to aid in pagination.
  pageInfo: PageInfo!

  # A list of edges.
  edges: [ReleaseGroupEdge]

  # A count of the total number of items in this connection,
  # ignoring pagination.
  totalCount: Int
}

# An edge in a connection.
type ReleaseGroupEdge {
  # The item at the end of the edge
  node: ReleaseGroup

  # A cursor for use in pagination
  cursor: String!

  # The relevancy score (0–100) assigned by the search engine, if
  # these results were found through a search.
  score: Int
}

enum ReleaseGroupType {
  # An album, perhaps better defined as a “Long Play” (LP)
  # release, generally consists of previously unreleased material (unless this type
  # is combined with secondary types which change that, such as “Compilation”). This
  # includes album re-issues, with or without bonus tracks.
  ALBUM

  # A single typically has one main song and possibly a handful
  # of additional tracks or remixes of the main track. A single is usually named
  # after its main song.
  SINGLE

  # An EP is a so-called “Extended Play” release and often
  # contains the letters EP in the title. Generally an EP will be shorter than a
  # full length release (an LP or “Long Play”) and the tracks are usually exclusive
  # to the EP, in other words the tracks don’t come from a previously issued
  # release. EP is fairly difficult to define; usually it should only be assumed
  # that a release is an EP if the artist defines it as such.
  EP

  # Any release that does not fit any of the other categories.
  OTHER

  # An episodic release that was originally broadcast via radio,
  # television, or the Internet, including podcasts.
  BROADCAST

  # A compilation is a collection of previously released tracks
  # by one or more artists.
  COMPILATION

  # A soundtrack is the musical score to a movie, TV series,
  # stage show, computer game, etc.
  SOUNDTRACK

  # A non-music spoken word release.
  SPOKENWORD

  # An interview release contains an interview, generally with
  # an artist.
  INTERVIEW

  # An audiobook is a book read by a narrator without music.
  AUDIOBOOK

  # A release that was recorded live.
  LIVE

  # A release that was (re)mixed from previously released
  # material.
  REMIX

  # A DJ-mix is a sequence of several recordings played one
  # after the other, each one modified so that they blend together into a continuous
  # flow of music. A DJ mix release requires that the recordings be modified in some
  # manner, and the DJ who does this modification is usually (although not always)
  # credited in a fairly prominent way.
  DJMIX

  # Promotional in nature (but not necessarily free), mixtapes
  # and street albums are often released by artists to promote new artists, or
  # upcoming studio albums by prominent artists. They are also sometimes used to
  # keep fans’ attention between studio releases and are most common in rap & hip
  # hop genres. They are often not sanctioned by the artist’s label, may lack proper
  # sample or song clearances and vary widely in production and recording quality.
  # While mixtapes are generally DJ-mixed, they are distinct from commercial DJ
  # mixes (which are usually deemed compilations) and are defined by having a
  # significant proportion of new material, including original production or
  # original vocals over top of other artists’ instrumentals. They are distinct from
  # demos in that they are designed for release directly to the public and fans, not
  # to labels.
  MIXTAPE

  # A release that was recorded for limited circulation or
  # reference use rather than for general public release.
  DEMO

  # A non-album track (special case).
  NAT
}

enum ReleaseStatus {
  # Any release officially sanctioned by the artist and/or their
  # record company. (Most releases will fit into this category.)
  OFFICIAL

  # A giveaway release or a release intended to promote an
  # upcoming official release, e.g. prerelease albums or releases included with a
  # magazine.
  PROMOTION

  # An unofficial/underground release that was not sanctioned by
  # the artist and/or the record company.
  BOOTLEG

  # A pseudo-release is a duplicate release for
  # translation/transliteration purposes.
  PSEUDORELEASE
}

# A search for MusicBrainz entities using Lucene query syntax.
type SearchQuery {
  # Search for area entities matching the given query.
  areas(
    # The query terms, in Lucene search syntax. See [examples
    # and search fields](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search).
    query: String!
    after: String
    first: Int
  ): AreaConnection

  # Search for artist entities matching the given query.
  artists(
    # The query terms, in Lucene search syntax. See [examples
    # and search fields](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search).
    query: String!
    after: String
    first: Int
  ): ArtistConnection

  # Search for event entities matching the given query.
  events(
    # The query terms, in Lucene search syntax. See [examples
    # and search fields](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search).
    query: String!
    after: String
    first: Int
  ): EventConnection

  # Search for instrument entities matching the given query.
  instruments(
    # The query terms, in Lucene search syntax. See [examples
    # and search fields](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search).
    query: String!
    after: String
    first: Int
  ): InstrumentConnection

  # Search for label entities matching the given query.
  labels(
    # The query terms, in Lucene search syntax. See [examples
    # and search fields](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search).
    query: String!
    after: String
    first: Int
  ): LabelConnection

  # Search for place entities matching the given query.
  places(
    # The query terms, in Lucene search syntax. See [examples
    # and search fields](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search).
    query: String!
    after: String
    first: Int
  ): PlaceConnection

  # Search for recording entities matching the given query.
  recordings(
    # The query terms, in Lucene search syntax. See [examples
    # and search fields](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search).
    query: String!
    after: String
    first: Int
  ): RecordingConnection

  # Search for release entities matching the given query.
  releases(
    # The query terms, in Lucene search syntax. See [examples
    # and search fields](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search).
    query: String!
    after: String
    first: Int
  ): ReleaseConnection

  # Search for release group entities matching the given query.
  releaseGroups(
    # The query terms, in Lucene search syntax. See [examples
    # and search fields](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search).
    query: String!
    after: String
    first: Int
  ): ReleaseGroupConnection

  # Search for series entities matching the given query.
  series(
    # The query terms, in Lucene search syntax. See [examples
    # and search fields](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search).
    query: String!
    after: String
    first: Int
  ): SeriesConnection

  # Search for work entities matching the given query.
  works(
    # The query terms, in Lucene search syntax. See [examples
    # and search fields](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search).
    query: String!
    after: String
    first: Int
  ): WorkConnection
}

# A [series](https://musicbrainz.org/doc/Series) is a sequence of
# separate release groups, releases, recordings, works or events with a common
# theme.
type Series implements Node, Entity {
  # The ID of an object
  id: ID!

  # The MBID of the entity.
  mbid: MBID!

  # The official name of the entity.
  name: String

  # A comment used to help distinguish identically named entitites.
  disambiguation: String

  # The type primarily describes what type of entity the series
  # contains.
  type: String

  # The MBID associated with the value of the `type`
  # field.
  typeID: MBID

  # Relationships between this entity and other entitites.
  relationships: Relationships

  # A list of tags linked to this entity.
  tags(after: String, first: Int): TagConnection
}

# A connection to a list of items.
type SeriesConnection {
  # Information to aid in pagination.
  pageInfo: PageInfo!

  # A list of edges.
  edges: [SeriesEdge]

  # A count of the total number of items in this connection,
  # ignoring pagination.
  totalCount: Int
}

# An edge in a connection.
type SeriesEdge {
  # The item at the end of the edge
  node: Series

  # A cursor for use in pagination
  cursor: String!

  # The relevancy score (0–100) assigned by the search engine, if
  # these results were found through a search.
  score: Int
}

# [Tags](https://musicbrainz.org/tags) are a way to mark entities
# with extra information – for example, the genres that apply to an artist,
# release, or recording.
type Tag {
  # The tag label.
  name: String!

  # How many times this tag has been applied to the entity.
  count: Int
}

# A connection to a list of items.
type TagConnection {
  # Information to aid in pagination.
  pageInfo: PageInfo!

  # A list of edges.
  edges: [TagEdge]

  # A count of the total number of items in this connection,
  # ignoring pagination.
  totalCount: Int
}

# An edge in a connection.
type TagEdge {
  # The item at the end of the edge
  node: Tag

  # A cursor for use in pagination
  cursor: String!

  # The relevancy score (0–100) assigned by the search engine, if
  # these results were found through a search.
  score: Int
}

# A time of day, in 24-hour hh:mm notation.
scalar Time

# A [URL](https://musicbrainz.org/doc/URL) pointing to a resource
# external to MusicBrainz, i.e. an official homepage, a site where music can be
# acquired, an entry in another database, etc.
type URL implements Node, Entity {
  # The ID of an object
  id: ID!

  # The MBID of the entity.
  mbid: MBID!

  # The actual URL string.
  resource: URLString!

  # Relationships between this entity and other entitites.
  relationships: Relationships
}

# A connection to a list of items.
type URLConnection {
  # Information to aid in pagination.
  pageInfo: PageInfo!

  # A list of edges.
  edges: [URLEdge]

  # A count of the total number of items in this connection,
  # ignoring pagination.
  totalCount: Int
}

# An edge in a connection.
type URLEdge {
  # The item at the end of the edge
  node: URL

  # A cursor for use in pagination
  cursor: String!

  # The relevancy score (0–100) assigned by the search engine, if
  # these results were found through a search.
  score: Int
}

# A web address.
scalar URLString

# A [work](https://musicbrainz.org/doc/Work) is a distinct
# intellectual or artistic creation, which can be expressed in the form of one or
# more audio recordings.
type Work implements Node, Entity {
  # The ID of an object
  id: ID!

  # The MBID of the entity.
  mbid: MBID!

  # The official title of the entity.
  title: String

  # A comment used to help distinguish identically named entitites.
  disambiguation: String

  # [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
  # alternate names or misspellings.
  aliases: [Alias]

  # A list of [ISWCs](https://musicbrainz.org/doc/ISWC) assigned
  # to the work by copyright collecting agencies.
  iswcs: [String]

  # The language in which the work was originally written.
  language: String

  # The type of work.
  type: String

  # The MBID associated with the value of the `type`
  # field.
  typeID: MBID

  # A list of artists linked to this entity.
  artists(after: String, first: Int): ArtistConnection

  # Relationships between this entity and other entitites.
  relationships: Relationships

  # A list of tags linked to this entity.
  tags(after: String, first: Int): TagConnection
}

# A connection to a list of items.
type WorkConnection {
  # Information to aid in pagination.
  pageInfo: PageInfo!

  # A list of edges.
  edges: [WorkEdge]

  # A count of the total number of items in this connection,
  # ignoring pagination.
  totalCount: Int
}

# An edge in a connection.
type WorkEdge {
  # The item at the end of the edge
  node: Work

  # A cursor for use in pagination
  cursor: String!

  # The relevancy score (0–100) assigned by the search engine, if
  # these results were found through a search.
  score: Int
}
```