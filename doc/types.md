# Schema Types

You may also be interested in the [schema in GraphQL syntax](schema.md).

<details><summary>**Table of Contents**</summary><p><ul>
  <li>[Query](#fixme)</li>
  <li>[Objects](#fixme)<ul>
    <li>[Alias](#fixme)</li>
    <li>[Area](#fixme)</li>
    <li>[AreaConnection](#fixme)</li>
    <li>[AreaEdge](#fixme)</li>
    <li>[Artist](#fixme)</li>
    <li>[ArtistConnection](#fixme)</li>
    <li>[ArtistCredit](#fixme)</li>
    <li>[ArtistEdge](#fixme)</li>
    <li>[BrowseQuery](#fixme)</li>
    <li>[Coordinates](#fixme)</li>
    <li>[Event](#fixme)</li>
    <li>[EventConnection](#fixme)</li>
    <li>[EventEdge](#fixme)</li>
    <li>[Instrument](#fixme)</li>
    <li>[InstrumentConnection](#fixme)</li>
    <li>[InstrumentEdge](#fixme)</li>
    <li>[Label](#fixme)</li>
    <li>[LabelConnection](#fixme)</li>
    <li>[LabelEdge](#fixme)</li>
    <li>[LifeSpan](#fixme)</li>
    <li>[LookupQuery](#fixme)</li>
    <li>[PageInfo](#fixme)</li>
    <li>[Place](#fixme)</li>
    <li>[PlaceConnection](#fixme)</li>
    <li>[PlaceEdge](#fixme)</li>
    <li>[Recording](#fixme)</li>
    <li>[RecordingConnection](#fixme)</li>
    <li>[RecordingEdge](#fixme)</li>
    <li>[Relationship](#fixme)</li>
    <li>[RelationshipConnection](#fixme)</li>
    <li>[RelationshipEdge](#fixme)</li>
    <li>[Relationships](#fixme)</li>
    <li>[Release](#fixme)</li>
    <li>[ReleaseConnection](#fixme)</li>
    <li>[ReleaseEdge](#fixme)</li>
    <li>[ReleaseEvent](#fixme)</li>
    <li>[ReleaseGroup](#fixme)</li>
    <li>[ReleaseGroupConnection](#fixme)</li>
    <li>[ReleaseGroupEdge](#fixme)</li>
    <li>[SearchQuery](#fixme)</li>
    <li>[Series](#fixme)</li>
    <li>[SeriesConnection](#fixme)</li>
    <li>[SeriesEdge](#fixme)</li>
    <li>[Tag](#fixme)</li>
    <li>[TagConnection](#fixme)</li>
    <li>[TagEdge](#fixme)</li>
    <li>[URL](#fixme)</li>
    <li>[URLConnection](#fixme)</li>
    <li>[URLEdge](#fixme)</li>
    <li>[Work](#fixme)</li>
    <li>[WorkConnection](#fixme)</li>
    <li>[WorkEdge](#fixme)</li>
  </ul></li>
  <li>[Enums](#fixme)<ul>
    <li>[ReleaseGroupType](#fixme)</li>
    <li>[ReleaseStatus](#fixme)</li>
  </ul></li>
  <li>[Scalars](#fixme)<ul>
    <li>[Boolean](#fixme)</li>
    <li>[Date](#fixme)</li>
    <li>[Degrees](#fixme)</li>
    <li>[ID](#fixme)</li>
    <li>[IPI](#fixme)</li>
    <li>[Int](#fixme)</li>
    <li>[MBID](#fixme)</li>
    <li>[String](#fixme)</li>
    <li>[Time](#fixme)</li>
    <li>[URLString](#fixme)</li>
  </ul></li>
  <li>[Interfaces](#fixme)<ul>
    <li>[Entity](#fixme)</li>
    <li>[Node](#fixme)</li>
  </ul></li>
</ul></p></details>

## Query 
The query root, from which multiple types of MusicBrainz
requests can be made.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**node**</td>
    <td valign="top">[Node](#fixme)</td>
    <td>Fetches an object given its ID</td>
  </tr>
  <tr>
    <td align="right" valign="top">id</td>
    <td valign="top">[ID](#fixme)!</td>
    <td>The ID of an object</td>
  </tr>
  <tr>
    <td valign="top">**lookup**</td>
    <td valign="top">[LookupQuery](#fixme)</td>
    <td>Perform a lookup of a MusicBrainz entity by its MBID.</td>
  </tr>
  <tr>
    <td valign="top">**browse**</td>
    <td valign="top">[BrowseQuery](#fixme)</td>
    <td>Browse all MusicBrainz entities directly linked to another entity.</td>
  </tr>
  <tr>
    <td valign="top">**search**</td>
    <td valign="top">[SearchQuery](#fixme)</td>
    <td>Search for MusicBrainz entities using Lucene query syntax.</td>
  </tr>
</tbody></table>

## Objects

### Alias

[Aliases](https://musicbrainz.org/doc/Aliases) are variant names
that are mostly used as search help: if a search matches an entity’s alias, the
entity will be given as a result – even if the actual name wouldn’t be. They are
available for artists, labels, and works.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**name**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The aliased name of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**sortName**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The string to use for the purpose of ordering by name (for
example, by moving articles like ‘the’ to the end or a person’s last name to
the front).</td>
  </tr>
  <tr>
    <td valign="top">**locale**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The locale (language and/or country) in which the alias is
used.</td>
  </tr>
  <tr>
    <td valign="top">**primary**</td>
    <td valign="top">[Boolean](#fixme)</td>
    <td>Whether this is the main alias for the entity in the
specified locale (this could mean the most recent or the most common).</td>
  </tr>
  <tr>
    <td valign="top">**type**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The type or purpose of the alias – whether it is a variant,
search hint, etc.</td>
  </tr>
  <tr>
    <td valign="top">**typeID**</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
</tbody></table>

### Area

[Areas](https://musicbrainz.org/doc/Area) are geographic regions
or settlements (countries, cities, or the like).

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**id**</td>
    <td valign="top">[ID](#fixme)!</td>
    <td>The ID of an object</td>
  </tr>
  <tr>
    <td valign="top">**mbid**</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**name**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The official name of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**sortName**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The string to use for the purpose of ordering by name (for
example, by moving articles like ‘the’ to the end or a person’s last name to
the front).</td>
  </tr>
  <tr>
    <td valign="top">**disambiguation**</td>
    <td valign="top">[String](#fixme)</td>
    <td>A comment used to help distinguish identically named entitites.</td>
  </tr>
  <tr>
    <td valign="top">**aliases**</td>
    <td valign="top">[[Alias](#fixme)]</td>
    <td><a href="https://musicbrainz.org/doc/Aliases">Aliases</a> are used to store
alternate names or misspellings.</td>
  </tr>
  <tr>
    <td valign="top">**isoCodes**</td>
    <td valign="top">[[String](#fixme)]</td>
    <td><a href="https://en.wikipedia.org/wiki/ISO_3166">ISO 3166 codes</a> are
the codes assigned by ISO to countries and subdivisions.</td>
  </tr>
  <tr>
    <td valign="top">**artists**</td>
    <td valign="top">[ArtistConnection](#fixme)</td>
    <td>A list of artists linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**events**</td>
    <td valign="top">[EventConnection](#fixme)</td>
    <td>A list of events linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**labels**</td>
    <td valign="top">[LabelConnection](#fixme)</td>
    <td>A list of labels linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**places**</td>
    <td valign="top">[PlaceConnection](#fixme)</td>
    <td>A list of places linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**releases**</td>
    <td valign="top">[ReleaseConnection](#fixme)</td>
    <td>A list of releases linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[[ReleaseGroupType](#fixme)]</td>
    <td>Filter by one or more release group types.</td>
  </tr>
  <tr>
    <td align="right" valign="top">status</td>
    <td valign="top">[[ReleaseStatus](#fixme)]</td>
    <td>Filter by one or more release statuses.</td>
  </tr>
  <tr>
    <td valign="top">**relationships**</td>
    <td valign="top">[Relationships](#fixme)</td>
    <td>Relationships between this entity and other entitites.</td>
  </tr>
  <tr>
    <td valign="top">**tags**</td>
    <td valign="top">[TagConnection](#fixme)</td>
    <td>A list of tags linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
</tbody></table>

### AreaConnection

A connection to a list of items.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**pageInfo**</td>
    <td valign="top">[PageInfo](#fixme)!</td>
    <td>Information to aid in pagination.</td>
  </tr>
  <tr>
    <td valign="top">**edges**</td>
    <td valign="top">[[AreaEdge](#fixme)]</td>
    <td>A list of edges.</td>
  </tr>
  <tr>
    <td valign="top">**totalCount**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>A count of the total number of items in this connection,
ignoring pagination.</td>
  </tr>
</tbody></table>

### AreaEdge

An edge in a connection.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**node**</td>
    <td valign="top">[Area](#fixme)</td>
    <td>The item at the end of the edge</td>
  </tr>
  <tr>
    <td valign="top">**cursor**</td>
    <td valign="top">[String](#fixme)!</td>
    <td>A cursor for use in pagination</td>
  </tr>
  <tr>
    <td valign="top">**score**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>The relevancy score (0–100) assigned by the search engine, if
these results were found through a search.</td>
  </tr>
</tbody></table>

### Artist

An [artist](https://musicbrainz.org/doc/Artist) is generally a
musician, group of musicians, or other music professional (like a producer or
engineer). Occasionally, it can also be a non-musical person (like a
photographer, an illustrator, or a poet whose writings are set to music), or
even a fictional character.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**id**</td>
    <td valign="top">[ID](#fixme)!</td>
    <td>The ID of an object</td>
  </tr>
  <tr>
    <td valign="top">**mbid**</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**name**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The official name of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**sortName**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The string to use for the purpose of ordering by name (for
example, by moving articles like ‘the’ to the end or a person’s last name to
the front).</td>
  </tr>
  <tr>
    <td valign="top">**disambiguation**</td>
    <td valign="top">[String](#fixme)</td>
    <td>A comment used to help distinguish identically named entitites.</td>
  </tr>
  <tr>
    <td valign="top">**aliases**</td>
    <td valign="top">[[Alias](#fixme)]</td>
    <td><a href="https://musicbrainz.org/doc/Aliases">Aliases</a> are used to store
alternate names or misspellings.</td>
  </tr>
  <tr>
    <td valign="top">**country**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The country with which an artist is primarily identified. It
is often, but not always, its birth/formation country.</td>
  </tr>
  <tr>
    <td valign="top">**area**</td>
    <td valign="top">[Area](#fixme)</td>
    <td>The area with which an artist is primarily identified. It
is often, but not always, its birth/formation country.</td>
  </tr>
  <tr>
    <td valign="top">**beginArea**</td>
    <td valign="top">[Area](#fixme)</td>
    <td>The area in which an artist began their career (or where
were born, if the artist is a person).</td>
  </tr>
  <tr>
    <td valign="top">**endArea**</td>
    <td valign="top">[Area](#fixme)</td>
    <td>The area in which an artist ended their career (or where
they died, if the artist is a person).</td>
  </tr>
  <tr>
    <td valign="top">**lifeSpan**</td>
    <td valign="top">[LifeSpan](#fixme)</td>
    <td>The begin and end dates of the entity’s existence. Its exact
meaning depends on the type of entity.</td>
  </tr>
  <tr>
    <td valign="top">**gender**</td>
    <td valign="top">[String](#fixme)</td>
    <td>Whether a person or character identifies as male, female, or
neither. Groups do not have genders.</td>
  </tr>
  <tr>
    <td valign="top">**genderID**</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>gender</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**type**</td>
    <td valign="top">[String](#fixme)</td>
    <td>Whether an artist is a person, a group, or something else.</td>
  </tr>
  <tr>
    <td valign="top">**typeID**</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**recordings**</td>
    <td valign="top">[RecordingConnection](#fixme)</td>
    <td>A list of recordings linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**releases**</td>
    <td valign="top">[ReleaseConnection](#fixme)</td>
    <td>A list of releases linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[[ReleaseGroupType](#fixme)]</td>
    <td>Filter by one or more release group types.</td>
  </tr>
  <tr>
    <td align="right" valign="top">status</td>
    <td valign="top">[[ReleaseStatus](#fixme)]</td>
    <td>Filter by one or more release statuses.</td>
  </tr>
  <tr>
    <td valign="top">**releaseGroups**</td>
    <td valign="top">[ReleaseGroupConnection](#fixme)</td>
    <td>A list of release groups linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[[ReleaseGroupType](#fixme)]</td>
    <td>Filter by one or more release group types.</td>
  </tr>
  <tr>
    <td valign="top">**works**</td>
    <td valign="top">[WorkConnection](#fixme)</td>
    <td>A list of works linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**relationships**</td>
    <td valign="top">[Relationships](#fixme)</td>
    <td>Relationships between this entity and other entitites.</td>
  </tr>
  <tr>
    <td valign="top">**tags**</td>
    <td valign="top">[TagConnection](#fixme)</td>
    <td>A list of tags linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
</tbody></table>

### ArtistConnection

A connection to a list of items.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**pageInfo**</td>
    <td valign="top">[PageInfo](#fixme)!</td>
    <td>Information to aid in pagination.</td>
  </tr>
  <tr>
    <td valign="top">**edges**</td>
    <td valign="top">[[ArtistEdge](#fixme)]</td>
    <td>A list of edges.</td>
  </tr>
  <tr>
    <td valign="top">**totalCount**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>A count of the total number of items in this connection,
ignoring pagination.</td>
  </tr>
</tbody></table>

### ArtistCredit

[Artist credits](https://musicbrainz.org/doc/Artist_Credits)
indicate who is the main credited artist (or artists) for releases, release
groups, tracks and recordings, and how they are credited. They consist of
artists, with (optionally) their names as credited in the specific release,
track, etc., and join phrases between them.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**artist**</td>
    <td valign="top">[Artist](#fixme)</td>
    <td>The entity representing the artist referenced in the
credits.</td>
  </tr>
  <tr>
    <td valign="top">**name**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The name of the artist as credited in the specific release,
track, etc.</td>
  </tr>
  <tr>
    <td valign="top">**joinPhrase**</td>
    <td valign="top">[String](#fixme)</td>
    <td>Join phrases might include words and/or punctuation to
separate artist names as they appear on the release, track, etc.</td>
  </tr>
</tbody></table>

### ArtistEdge

An edge in a connection.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**node**</td>
    <td valign="top">[Artist](#fixme)</td>
    <td>The item at the end of the edge</td>
  </tr>
  <tr>
    <td valign="top">**cursor**</td>
    <td valign="top">[String](#fixme)!</td>
    <td>A cursor for use in pagination</td>
  </tr>
  <tr>
    <td valign="top">**score**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>The relevancy score (0–100) assigned by the search engine, if
these results were found through a search.</td>
  </tr>
</tbody></table>

### BrowseQuery

A query for all MusicBrainz entities directly linked to another
entity.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**areas**</td>
    <td valign="top">[AreaConnection](#fixme)</td>
    <td>Browse area entities linked to the given arguments.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">collection</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a collection in which the entity is found.</td>
  </tr>
  <tr>
    <td valign="top">**artists**</td>
    <td valign="top">[ArtistConnection](#fixme)</td>
    <td>Browse artist entities linked to the given arguments.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">area</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of an area to which the entity is linked.</td>
  </tr>
  <tr>
    <td align="right" valign="top">collection</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a collection in which the entity is found.</td>
  </tr>
  <tr>
    <td align="right" valign="top">recording</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a recording to which the entity is linked.</td>
  </tr>
  <tr>
    <td align="right" valign="top">release</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a release to which the entity is linked.</td>
  </tr>
  <tr>
    <td align="right" valign="top">releaseGroup</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a release group to which the entity is linked.</td>
  </tr>
  <tr>
    <td align="right" valign="top">work</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a work to which the artist is linked.</td>
  </tr>
  <tr>
    <td valign="top">**events**</td>
    <td valign="top">[EventConnection](#fixme)</td>
    <td>Browse event entities linked to the given arguments.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">area</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of an area to which the entity is linked.</td>
  </tr>
  <tr>
    <td align="right" valign="top">artist</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of an artist to which the entity is linked.</td>
  </tr>
  <tr>
    <td align="right" valign="top">collection</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a collection in which the entity is found.</td>
  </tr>
  <tr>
    <td align="right" valign="top">place</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a place to which the event is linked.</td>
  </tr>
  <tr>
    <td valign="top">**labels**</td>
    <td valign="top">[LabelConnection](#fixme)</td>
    <td>Browse label entities linked to the given arguments.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">area</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of an area to which the entity is linked.</td>
  </tr>
  <tr>
    <td align="right" valign="top">collection</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a collection in which the entity is found.</td>
  </tr>
  <tr>
    <td align="right" valign="top">release</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a release to which the entity is linked.</td>
  </tr>
  <tr>
    <td valign="top">**places**</td>
    <td valign="top">[PlaceConnection](#fixme)</td>
    <td>Browse place entities linked to the given arguments.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">area</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of an area to which the entity is linked.</td>
  </tr>
  <tr>
    <td align="right" valign="top">collection</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a collection in which the entity is found.</td>
  </tr>
  <tr>
    <td valign="top">**recordings**</td>
    <td valign="top">[RecordingConnection](#fixme)</td>
    <td>Browse recording entities linked to the given arguments.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">artist</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of an artist to which the entity is linked.</td>
  </tr>
  <tr>
    <td align="right" valign="top">collection</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a collection in which the entity is found.</td>
  </tr>
  <tr>
    <td align="right" valign="top">release</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a release to which the entity is linked.</td>
  </tr>
  <tr>
    <td valign="top">**releases**</td>
    <td valign="top">[ReleaseConnection](#fixme)</td>
    <td>Browse release entities linked to the given arguments.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">area</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of an area to which the entity is linked.</td>
  </tr>
  <tr>
    <td align="right" valign="top">artist</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of an artist to which the entity is linked.</td>
  </tr>
  <tr>
    <td align="right" valign="top">collection</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a collection in which the entity is found.</td>
  </tr>
  <tr>
    <td align="right" valign="top">label</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a label to which the release is linked.</td>
  </tr>
  <tr>
    <td align="right" valign="top">track</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a track that is included in the release.</td>
  </tr>
  <tr>
    <td align="right" valign="top">trackArtist</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of an artist that appears on a track in the
release, but is not included in the credits for the release itself.</td>
  </tr>
  <tr>
    <td align="right" valign="top">recording</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a recording to which the entity is linked.</td>
  </tr>
  <tr>
    <td align="right" valign="top">releaseGroup</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a release group to which the entity is linked.</td>
  </tr>
  <tr>
    <td valign="top">**releaseGroups**</td>
    <td valign="top">[ReleaseGroupConnection](#fixme)</td>
    <td>Browse release group entities linked to the given arguments.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">artist</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of an artist to which the entity is linked.</td>
  </tr>
  <tr>
    <td align="right" valign="top">collection</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a collection in which the entity is found.</td>
  </tr>
  <tr>
    <td align="right" valign="top">release</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a release to which the entity is linked.</td>
  </tr>
  <tr>
    <td valign="top">**works**</td>
    <td valign="top">[WorkConnection](#fixme)</td>
    <td>Browse work entities linked to the given arguments.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">artist</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of an artist to which the entity is linked.</td>
  </tr>
  <tr>
    <td align="right" valign="top">collection</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID of a collection in which the entity is found.</td>
  </tr>
  <tr>
    <td valign="top">**urls**</td>
    <td valign="top">[URLConnection](#fixme)</td>
    <td>Browse URL entities linked to the given arguments.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">resource</td>
    <td valign="top">[URLString](#fixme)</td>
    <td>The web address for which to browse URL entities.</td>
  </tr>
</tbody></table>

### Coordinates

Geographic coordinates described with latitude and longitude.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**latitude**</td>
    <td valign="top">[Degrees](#fixme)</td>
    <td>The north–south position of a point on the Earth’s surface.</td>
  </tr>
  <tr>
    <td valign="top">**longitude**</td>
    <td valign="top">[Degrees](#fixme)</td>
    <td>The east–west position of a point on the Earth’s surface.</td>
  </tr>
</tbody></table>

### Event

An [event](https://musicbrainz.org/doc/Event) refers to an
organised event which people can attend, and is relevant to MusicBrainz.
Generally this means live performances, like concerts and festivals.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**id**</td>
    <td valign="top">[ID](#fixme)!</td>
    <td>The ID of an object</td>
  </tr>
  <tr>
    <td valign="top">**mbid**</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**name**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The official name of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**disambiguation**</td>
    <td valign="top">[String](#fixme)</td>
    <td>A comment used to help distinguish identically named entitites.</td>
  </tr>
  <tr>
    <td valign="top">**aliases**</td>
    <td valign="top">[[Alias](#fixme)]</td>
    <td><a href="https://musicbrainz.org/doc/Aliases">Aliases</a> are used to store
alternate names or misspellings.</td>
  </tr>
  <tr>
    <td valign="top">**lifeSpan**</td>
    <td valign="top">[LifeSpan](#fixme)</td>
    <td>The begin and end dates of the entity’s existence. Its exact
meaning depends on the type of entity.</td>
  </tr>
  <tr>
    <td valign="top">**time**</td>
    <td valign="top">[Time](#fixme)</td>
    <td>The start time of the event.</td>
  </tr>
  <tr>
    <td valign="top">**cancelled**</td>
    <td valign="top">[Boolean](#fixme)</td>
    <td>Whether or not the event took place.</td>
  </tr>
  <tr>
    <td valign="top">**setlist**</td>
    <td valign="top">[String](#fixme)</td>
    <td>A list of songs performed, optionally including links to
artists and works. See the <a href="https://musicbrainz.org/doc/Event/Setlist">setlist documentation</a>
for syntax and examples.</td>
  </tr>
  <tr>
    <td valign="top">**type**</td>
    <td valign="top">[String](#fixme)</td>
    <td>What kind of event the event is, e.g. concert, festival, etc.</td>
  </tr>
  <tr>
    <td valign="top">**typeID**</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**relationships**</td>
    <td valign="top">[Relationships](#fixme)</td>
    <td>Relationships between this entity and other entitites.</td>
  </tr>
  <tr>
    <td valign="top">**tags**</td>
    <td valign="top">[TagConnection](#fixme)</td>
    <td>A list of tags linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
</tbody></table>

### EventConnection

A connection to a list of items.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**pageInfo**</td>
    <td valign="top">[PageInfo](#fixme)!</td>
    <td>Information to aid in pagination.</td>
  </tr>
  <tr>
    <td valign="top">**edges**</td>
    <td valign="top">[[EventEdge](#fixme)]</td>
    <td>A list of edges.</td>
  </tr>
  <tr>
    <td valign="top">**totalCount**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>A count of the total number of items in this connection,
ignoring pagination.</td>
  </tr>
</tbody></table>

### EventEdge

An edge in a connection.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**node**</td>
    <td valign="top">[Event](#fixme)</td>
    <td>The item at the end of the edge</td>
  </tr>
  <tr>
    <td valign="top">**cursor**</td>
    <td valign="top">[String](#fixme)!</td>
    <td>A cursor for use in pagination</td>
  </tr>
  <tr>
    <td valign="top">**score**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>The relevancy score (0–100) assigned by the search engine, if
these results were found through a search.</td>
  </tr>
</tbody></table>

### Instrument

[Instruments](https://musicbrainz.org/doc/Instrument) are
devices created or adapted to make musical sounds. Instruments are primarily
used in relationships between two other entities.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**id**</td>
    <td valign="top">[ID](#fixme)!</td>
    <td>The ID of an object</td>
  </tr>
  <tr>
    <td valign="top">**mbid**</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**name**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The official name of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**disambiguation**</td>
    <td valign="top">[String](#fixme)</td>
    <td>A comment used to help distinguish identically named entitites.</td>
  </tr>
  <tr>
    <td valign="top">**aliases**</td>
    <td valign="top">[[Alias](#fixme)]</td>
    <td><a href="https://musicbrainz.org/doc/Aliases">Aliases</a> are used to store
alternate names or misspellings.</td>
  </tr>
  <tr>
    <td valign="top">**description**</td>
    <td valign="top">[String](#fixme)</td>
    <td>A brief description of the main characteristics of the
instrument.</td>
  </tr>
  <tr>
    <td valign="top">**type**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The type categorises the instrument by the way the sound is
created, similar to the <a href="https://en.wikipedia.org/wiki/Hornbostel%E2%80%93Sachs">Hornbostel-Sachs</a>
classification.</td>
  </tr>
  <tr>
    <td valign="top">**typeID**</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**relationships**</td>
    <td valign="top">[Relationships](#fixme)</td>
    <td>Relationships between this entity and other entitites.</td>
  </tr>
  <tr>
    <td valign="top">**tags**</td>
    <td valign="top">[TagConnection](#fixme)</td>
    <td>A list of tags linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
</tbody></table>

### InstrumentConnection

A connection to a list of items.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**pageInfo**</td>
    <td valign="top">[PageInfo](#fixme)!</td>
    <td>Information to aid in pagination.</td>
  </tr>
  <tr>
    <td valign="top">**edges**</td>
    <td valign="top">[[InstrumentEdge](#fixme)]</td>
    <td>A list of edges.</td>
  </tr>
  <tr>
    <td valign="top">**totalCount**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>A count of the total number of items in this connection,
ignoring pagination.</td>
  </tr>
</tbody></table>

### InstrumentEdge

An edge in a connection.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**node**</td>
    <td valign="top">[Instrument](#fixme)</td>
    <td>The item at the end of the edge</td>
  </tr>
  <tr>
    <td valign="top">**cursor**</td>
    <td valign="top">[String](#fixme)!</td>
    <td>A cursor for use in pagination</td>
  </tr>
  <tr>
    <td valign="top">**score**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>The relevancy score (0–100) assigned by the search engine, if
these results were found through a search.</td>
  </tr>
</tbody></table>

### Label

[Labels](https://musicbrainz.org/doc/Label) represent mostly
(but not only) imprints. To a lesser extent, a label entity may be created to
represent a record company.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**id**</td>
    <td valign="top">[ID](#fixme)!</td>
    <td>The ID of an object</td>
  </tr>
  <tr>
    <td valign="top">**mbid**</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**name**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The official name of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**sortName**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The string to use for the purpose of ordering by name (for
example, by moving articles like ‘the’ to the end or a person’s last name to
the front).</td>
  </tr>
  <tr>
    <td valign="top">**disambiguation**</td>
    <td valign="top">[String](#fixme)</td>
    <td>A comment used to help distinguish identically named entitites.</td>
  </tr>
  <tr>
    <td valign="top">**aliases**</td>
    <td valign="top">[[Alias](#fixme)]</td>
    <td><a href="https://musicbrainz.org/doc/Aliases">Aliases</a> are used to store
alternate names or misspellings.</td>
  </tr>
  <tr>
    <td valign="top">**country**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The country of origin for the label.</td>
  </tr>
  <tr>
    <td valign="top">**area**</td>
    <td valign="top">[Area](#fixme)</td>
    <td>The area in which the label is based.</td>
  </tr>
  <tr>
    <td valign="top">**lifeSpan**</td>
    <td valign="top">[LifeSpan](#fixme)</td>
    <td>The begin and end dates of the entity’s existence. Its exact
meaning depends on the type of entity.</td>
  </tr>
  <tr>
    <td valign="top">**labelCode**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>The <a href="https://musicbrainz.org/doc/Label/Label_Code">“LC” code</a>
of the label.</td>
  </tr>
  <tr>
    <td valign="top">**ipis**</td>
    <td valign="top">[[IPI](#fixme)]</td>
    <td>List of IPI (interested party information) codes for the
label.</td>
  </tr>
  <tr>
    <td valign="top">**type**</td>
    <td valign="top">[String](#fixme)</td>
    <td>A type describing the main activity of the label, e.g.
imprint, production, distributor, rights society, etc.</td>
  </tr>
  <tr>
    <td valign="top">**typeID**</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**releases**</td>
    <td valign="top">[ReleaseConnection](#fixme)</td>
    <td>A list of releases linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[[ReleaseGroupType](#fixme)]</td>
    <td>Filter by one or more release group types.</td>
  </tr>
  <tr>
    <td align="right" valign="top">status</td>
    <td valign="top">[[ReleaseStatus](#fixme)]</td>
    <td>Filter by one or more release statuses.</td>
  </tr>
  <tr>
    <td valign="top">**relationships**</td>
    <td valign="top">[Relationships](#fixme)</td>
    <td>Relationships between this entity and other entitites.</td>
  </tr>
  <tr>
    <td valign="top">**tags**</td>
    <td valign="top">[TagConnection](#fixme)</td>
    <td>A list of tags linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
</tbody></table>

### LabelConnection

A connection to a list of items.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**pageInfo**</td>
    <td valign="top">[PageInfo](#fixme)!</td>
    <td>Information to aid in pagination.</td>
  </tr>
  <tr>
    <td valign="top">**edges**</td>
    <td valign="top">[[LabelEdge](#fixme)]</td>
    <td>A list of edges.</td>
  </tr>
  <tr>
    <td valign="top">**totalCount**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>A count of the total number of items in this connection,
ignoring pagination.</td>
  </tr>
</tbody></table>

### LabelEdge

An edge in a connection.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**node**</td>
    <td valign="top">[Label](#fixme)</td>
    <td>The item at the end of the edge</td>
  </tr>
  <tr>
    <td valign="top">**cursor**</td>
    <td valign="top">[String](#fixme)!</td>
    <td>A cursor for use in pagination</td>
  </tr>
  <tr>
    <td valign="top">**score**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>The relevancy score (0–100) assigned by the search engine, if
these results were found through a search.</td>
  </tr>
</tbody></table>

### LifeSpan

Fields indicating the begin and end date of an entity’s
lifetime, including whether it has ended (even if the date is unknown).

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**begin**</td>
    <td valign="top">[Date](#fixme)</td>
    <td>The start date of the entity’s life span.</td>
  </tr>
  <tr>
    <td valign="top">**end**</td>
    <td valign="top">[Date](#fixme)</td>
    <td>The end date of the entity’s life span.</td>
  </tr>
  <tr>
    <td valign="top">**ended**</td>
    <td valign="top">[Boolean](#fixme)</td>
    <td>Whether or not the entity’s life span has ended.</td>
  </tr>
</tbody></table>

### LookupQuery

A lookup of an individual MusicBrainz entity by its MBID.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**area**</td>
    <td valign="top">[Area](#fixme)</td>
    <td>Look up a specific area by its MBID.</td>
  </tr>
  <tr>
    <td align="right" valign="top">mbid</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**artist**</td>
    <td valign="top">[Artist](#fixme)</td>
    <td>Look up a specific artist by its MBID.</td>
  </tr>
  <tr>
    <td align="right" valign="top">mbid</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**event**</td>
    <td valign="top">[Event](#fixme)</td>
    <td>Look up a specific event by its MBID.</td>
  </tr>
  <tr>
    <td align="right" valign="top">mbid</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**instrument**</td>
    <td valign="top">[Instrument](#fixme)</td>
    <td>Look up a specific instrument by its MBID.</td>
  </tr>
  <tr>
    <td align="right" valign="top">mbid</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**label**</td>
    <td valign="top">[Label](#fixme)</td>
    <td>Look up a specific label by its MBID.</td>
  </tr>
  <tr>
    <td align="right" valign="top">mbid</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**place**</td>
    <td valign="top">[Place](#fixme)</td>
    <td>Look up a specific place by its MBID.</td>
  </tr>
  <tr>
    <td align="right" valign="top">mbid</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**recording**</td>
    <td valign="top">[Recording](#fixme)</td>
    <td>Look up a specific recording by its MBID.</td>
  </tr>
  <tr>
    <td align="right" valign="top">mbid</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**release**</td>
    <td valign="top">[Release](#fixme)</td>
    <td>Look up a specific release by its MBID.</td>
  </tr>
  <tr>
    <td align="right" valign="top">mbid</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**releaseGroup**</td>
    <td valign="top">[ReleaseGroup](#fixme)</td>
    <td>Look up a specific release group by its MBID.</td>
  </tr>
  <tr>
    <td align="right" valign="top">mbid</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**series**</td>
    <td valign="top">[Series](#fixme)</td>
    <td>Look up a specific series by its MBID.</td>
  </tr>
  <tr>
    <td align="right" valign="top">mbid</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**url**</td>
    <td valign="top">[URL](#fixme)</td>
    <td>Look up a specific URL by its MBID.</td>
  </tr>
  <tr>
    <td align="right" valign="top">mbid</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**work**</td>
    <td valign="top">[Work](#fixme)</td>
    <td>Look up a specific work by its MBID.</td>
  </tr>
  <tr>
    <td align="right" valign="top">mbid</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
</tbody></table>

### PageInfo

Information about pagination in a connection.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**hasNextPage**</td>
    <td valign="top">[Boolean](#fixme)!</td>
    <td>When paginating forwards, are there more items?</td>
  </tr>
  <tr>
    <td valign="top">**hasPreviousPage**</td>
    <td valign="top">[Boolean](#fixme)!</td>
    <td>When paginating backwards, are there more items?</td>
  </tr>
  <tr>
    <td valign="top">**startCursor**</td>
    <td valign="top">[String](#fixme)</td>
    <td>When paginating backwards, the cursor to continue.</td>
  </tr>
  <tr>
    <td valign="top">**endCursor**</td>
    <td valign="top">[String](#fixme)</td>
    <td>When paginating forwards, the cursor to continue.</td>
  </tr>
</tbody></table>

### Place

A [place](https://musicbrainz.org/doc/Place) is a venue, studio
or other place where music is performed, recorded, engineered, etc.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**id**</td>
    <td valign="top">[ID](#fixme)!</td>
    <td>The ID of an object</td>
  </tr>
  <tr>
    <td valign="top">**mbid**</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**name**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The official name of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**disambiguation**</td>
    <td valign="top">[String](#fixme)</td>
    <td>A comment used to help distinguish identically named entitites.</td>
  </tr>
  <tr>
    <td valign="top">**aliases**</td>
    <td valign="top">[[Alias](#fixme)]</td>
    <td><a href="https://musicbrainz.org/doc/Aliases">Aliases</a> are used to store
alternate names or misspellings.</td>
  </tr>
  <tr>
    <td valign="top">**address**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The address describes the location of the place using the
standard addressing format for the country it is located in.</td>
  </tr>
  <tr>
    <td valign="top">**area**</td>
    <td valign="top">[Area](#fixme)</td>
    <td>The area entity representing the area, such as the city, in
which the place is located.</td>
  </tr>
  <tr>
    <td valign="top">**coordinates**</td>
    <td valign="top">[Coordinates](#fixme)</td>
    <td>The geographic coordinates of the place.</td>
  </tr>
  <tr>
    <td valign="top">**lifeSpan**</td>
    <td valign="top">[LifeSpan](#fixme)</td>
    <td>The begin and end dates of the entity’s existence. Its exact
meaning depends on the type of entity.</td>
  </tr>
  <tr>
    <td valign="top">**type**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The type categorises the place based on its primary
function.</td>
  </tr>
  <tr>
    <td valign="top">**typeID**</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**events**</td>
    <td valign="top">[EventConnection](#fixme)</td>
    <td>A list of events linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**relationships**</td>
    <td valign="top">[Relationships](#fixme)</td>
    <td>Relationships between this entity and other entitites.</td>
  </tr>
  <tr>
    <td valign="top">**tags**</td>
    <td valign="top">[TagConnection](#fixme)</td>
    <td>A list of tags linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
</tbody></table>

### PlaceConnection

A connection to a list of items.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**pageInfo**</td>
    <td valign="top">[PageInfo](#fixme)!</td>
    <td>Information to aid in pagination.</td>
  </tr>
  <tr>
    <td valign="top">**edges**</td>
    <td valign="top">[[PlaceEdge](#fixme)]</td>
    <td>A list of edges.</td>
  </tr>
  <tr>
    <td valign="top">**totalCount**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>A count of the total number of items in this connection,
ignoring pagination.</td>
  </tr>
</tbody></table>

### PlaceEdge

An edge in a connection.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**node**</td>
    <td valign="top">[Place](#fixme)</td>
    <td>The item at the end of the edge</td>
  </tr>
  <tr>
    <td valign="top">**cursor**</td>
    <td valign="top">[String](#fixme)!</td>
    <td>A cursor for use in pagination</td>
  </tr>
  <tr>
    <td valign="top">**score**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>The relevancy score (0–100) assigned by the search engine, if
these results were found through a search.</td>
  </tr>
</tbody></table>

### Recording

A [recording](https://musicbrainz.org/doc/Recording) is an
entity in MusicBrainz which can be linked to tracks on releases. Each track must
always be associated with a single recording, but a recording can be linked to
any number of tracks.

A recording represents distinct audio that has been used to produce at least one
released track through copying or mastering. A recording itself is never
produced solely through copying or mastering.

Generally, the audio represented by a recording corresponds to the audio at a
stage in the production process before any final mastering but after any editing
or mixing.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**id**</td>
    <td valign="top">[ID](#fixme)!</td>
    <td>The ID of an object</td>
  </tr>
  <tr>
    <td valign="top">**mbid**</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**title**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The official title of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**disambiguation**</td>
    <td valign="top">[String](#fixme)</td>
    <td>A comment used to help distinguish identically named entitites.</td>
  </tr>
  <tr>
    <td valign="top">**aliases**</td>
    <td valign="top">[[Alias](#fixme)]</td>
    <td><a href="https://musicbrainz.org/doc/Aliases">Aliases</a> are used to store
alternate names or misspellings.</td>
  </tr>
  <tr>
    <td valign="top">**artistCredit**</td>
    <td valign="top">[[ArtistCredit](#fixme)]</td>
    <td>The main credited artist(s).</td>
  </tr>
  <tr>
    <td valign="top">**length**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>An approximation to the length of the recording, calculated
from the lengths of the tracks using it.</td>
  </tr>
  <tr>
    <td valign="top">**video**</td>
    <td valign="top">[Boolean](#fixme)</td>
    <td>Whether this is a video recording.</td>
  </tr>
  <tr>
    <td valign="top">**artists**</td>
    <td valign="top">[ArtistConnection](#fixme)</td>
    <td>A list of artists linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**releases**</td>
    <td valign="top">[ReleaseConnection](#fixme)</td>
    <td>A list of releases linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[[ReleaseGroupType](#fixme)]</td>
    <td>Filter by one or more release group types.</td>
  </tr>
  <tr>
    <td align="right" valign="top">status</td>
    <td valign="top">[[ReleaseStatus](#fixme)]</td>
    <td>Filter by one or more release statuses.</td>
  </tr>
  <tr>
    <td valign="top">**relationships**</td>
    <td valign="top">[Relationships](#fixme)</td>
    <td>Relationships between this entity and other entitites.</td>
  </tr>
  <tr>
    <td valign="top">**tags**</td>
    <td valign="top">[TagConnection](#fixme)</td>
    <td>A list of tags linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
</tbody></table>

### RecordingConnection

A connection to a list of items.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**pageInfo**</td>
    <td valign="top">[PageInfo](#fixme)!</td>
    <td>Information to aid in pagination.</td>
  </tr>
  <tr>
    <td valign="top">**edges**</td>
    <td valign="top">[[RecordingEdge](#fixme)]</td>
    <td>A list of edges.</td>
  </tr>
  <tr>
    <td valign="top">**totalCount**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>A count of the total number of items in this connection,
ignoring pagination.</td>
  </tr>
</tbody></table>

### RecordingEdge

An edge in a connection.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**node**</td>
    <td valign="top">[Recording](#fixme)</td>
    <td>The item at the end of the edge</td>
  </tr>
  <tr>
    <td valign="top">**cursor**</td>
    <td valign="top">[String](#fixme)!</td>
    <td>A cursor for use in pagination</td>
  </tr>
  <tr>
    <td valign="top">**score**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>The relevancy score (0–100) assigned by the search engine, if
these results were found through a search.</td>
  </tr>
</tbody></table>

### Relationship

[Relationships](https://musicbrainz.org/doc/Relationships) are a
way to represent all the different ways in which entities are connected to each
other and to URLs outside MusicBrainz.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**target**</td>
    <td valign="top">[Entity](#fixme)!</td>
    <td>The target entity.</td>
  </tr>
  <tr>
    <td valign="top">**direction**</td>
    <td valign="top">[String](#fixme)!</td>
    <td>The direction of the relationship.</td>
  </tr>
  <tr>
    <td valign="top">**targetType**</td>
    <td valign="top">[String](#fixme)!</td>
    <td>The type of entity on the receiving end of the relationship.</td>
  </tr>
  <tr>
    <td valign="top">**sourceCredit**</td>
    <td valign="top">[String](#fixme)</td>
    <td>How the source entity was actually credited, if different
from its main (performance) name.</td>
  </tr>
  <tr>
    <td valign="top">**targetCredit**</td>
    <td valign="top">[String](#fixme)</td>
    <td>How the target entity was actually credited, if different
from its main (performance) name.</td>
  </tr>
  <tr>
    <td valign="top">**begin**</td>
    <td valign="top">[Date](#fixme)</td>
    <td>The date on which the relationship became applicable.</td>
  </tr>
  <tr>
    <td valign="top">**end**</td>
    <td valign="top">[Date](#fixme)</td>
    <td>The date on which the relationship became no longer applicable.</td>
  </tr>
  <tr>
    <td valign="top">**ended**</td>
    <td valign="top">[Boolean](#fixme)</td>
    <td>Whether the relationship still applies.</td>
  </tr>
  <tr>
    <td valign="top">**attributes**</td>
    <td valign="top">[[String](#fixme)]</td>
    <td>Attributes which modify the relationship. There is a <a href="https://musicbrainz.org/relationship-attributes">list
of all attributes</a>, but the
attributes which are available, and how they should be used, depends on the
relationship type.</td>
  </tr>
  <tr>
    <td valign="top">**type**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The type of relationship.</td>
  </tr>
  <tr>
    <td valign="top">**typeID**</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
</tbody></table>

### RelationshipConnection

A connection to a list of items.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**pageInfo**</td>
    <td valign="top">[PageInfo](#fixme)!</td>
    <td>Information to aid in pagination.</td>
  </tr>
  <tr>
    <td valign="top">**edges**</td>
    <td valign="top">[[RelationshipEdge](#fixme)]</td>
    <td>A list of edges.</td>
  </tr>
  <tr>
    <td valign="top">**totalCount**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>A count of the total number of items in this connection,
ignoring pagination.</td>
  </tr>
</tbody></table>

### RelationshipEdge

An edge in a connection.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**node**</td>
    <td valign="top">[Relationship](#fixme)</td>
    <td>The item at the end of the edge</td>
  </tr>
  <tr>
    <td valign="top">**cursor**</td>
    <td valign="top">[String](#fixme)!</td>
    <td>A cursor for use in pagination</td>
  </tr>
  <tr>
    <td valign="top">**score**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>The relevancy score (0–100) assigned by the search engine, if
these results were found through a search.</td>
  </tr>
</tbody></table>

### Relationships

Lists of entity relationships for each entity type.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**areas**</td>
    <td valign="top">[RelationshipConnection](#fixme)</td>
    <td>A list of relationships between these two entity types.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">before</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">last</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">direction</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship direction.</td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship type.</td>
  </tr>
  <tr>
    <td align="right" valign="top">typeID</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**artists**</td>
    <td valign="top">[RelationshipConnection](#fixme)</td>
    <td>A list of relationships between these two entity types.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">before</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">last</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">direction</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship direction.</td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship type.</td>
  </tr>
  <tr>
    <td align="right" valign="top">typeID</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**events**</td>
    <td valign="top">[RelationshipConnection](#fixme)</td>
    <td>A list of relationships between these two entity types.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">before</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">last</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">direction</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship direction.</td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship type.</td>
  </tr>
  <tr>
    <td align="right" valign="top">typeID</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**instruments**</td>
    <td valign="top">[RelationshipConnection](#fixme)</td>
    <td>A list of relationships between these two entity types.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">before</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">last</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">direction</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship direction.</td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship type.</td>
  </tr>
  <tr>
    <td align="right" valign="top">typeID</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**labels**</td>
    <td valign="top">[RelationshipConnection](#fixme)</td>
    <td>A list of relationships between these two entity types.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">before</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">last</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">direction</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship direction.</td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship type.</td>
  </tr>
  <tr>
    <td align="right" valign="top">typeID</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**places**</td>
    <td valign="top">[RelationshipConnection](#fixme)</td>
    <td>A list of relationships between these two entity types.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">before</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">last</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">direction</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship direction.</td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship type.</td>
  </tr>
  <tr>
    <td align="right" valign="top">typeID</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**recordings**</td>
    <td valign="top">[RelationshipConnection](#fixme)</td>
    <td>A list of relationships between these two entity types.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">before</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">last</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">direction</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship direction.</td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship type.</td>
  </tr>
  <tr>
    <td align="right" valign="top">typeID</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**releases**</td>
    <td valign="top">[RelationshipConnection](#fixme)</td>
    <td>A list of relationships between these two entity types.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">before</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">last</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">direction</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship direction.</td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship type.</td>
  </tr>
  <tr>
    <td align="right" valign="top">typeID</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**releaseGroups**</td>
    <td valign="top">[RelationshipConnection](#fixme)</td>
    <td>A list of relationships between these two entity types.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">before</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">last</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">direction</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship direction.</td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship type.</td>
  </tr>
  <tr>
    <td align="right" valign="top">typeID</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**series**</td>
    <td valign="top">[RelationshipConnection](#fixme)</td>
    <td>A list of relationships between these two entity types.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">before</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">last</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">direction</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship direction.</td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship type.</td>
  </tr>
  <tr>
    <td align="right" valign="top">typeID</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**urls**</td>
    <td valign="top">[RelationshipConnection](#fixme)</td>
    <td>A list of relationships between these two entity types.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">before</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">last</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">direction</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship direction.</td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship type.</td>
  </tr>
  <tr>
    <td align="right" valign="top">typeID</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**works**</td>
    <td valign="top">[RelationshipConnection](#fixme)</td>
    <td>A list of relationships between these two entity types.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">before</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">last</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">direction</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship direction.</td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[String](#fixme)</td>
    <td>Filter by the relationship type.</td>
  </tr>
  <tr>
    <td align="right" valign="top">typeID</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
</tbody></table>

### Release

A [release](https://musicbrainz.org/doc/Release) represents the
unique release (i.e. issuing) of a product on a specific date with specific
release information such as the country, label, barcode, packaging, etc. If you
walk into a store and purchase an album or single, they’re each represented in
MusicBrainz as one release.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**id**</td>
    <td valign="top">[ID](#fixme)!</td>
    <td>The ID of an object</td>
  </tr>
  <tr>
    <td valign="top">**mbid**</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**title**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The official title of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**disambiguation**</td>
    <td valign="top">[String](#fixme)</td>
    <td>A comment used to help distinguish identically named entitites.</td>
  </tr>
  <tr>
    <td valign="top">**aliases**</td>
    <td valign="top">[[Alias](#fixme)]</td>
    <td><a href="https://musicbrainz.org/doc/Aliases">Aliases</a> are used to store
alternate names or misspellings.</td>
  </tr>
  <tr>
    <td valign="top">**artistCredit**</td>
    <td valign="top">[[ArtistCredit](#fixme)]</td>
    <td>The main credited artist(s).</td>
  </tr>
  <tr>
    <td valign="top">**releaseEvents**</td>
    <td valign="top">[[ReleaseEvent](#fixme)]</td>
    <td>The release events for this release.</td>
  </tr>
  <tr>
    <td valign="top">**date**</td>
    <td valign="top">[Date](#fixme)</td>
    <td>The <a href="https://musicbrainz.org/doc/Release/Date">release date</a>
is the date in which a release was made available through some sort of
distribution mechanism.</td>
  </tr>
  <tr>
    <td valign="top">**country**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The country in which the release was issued.</td>
  </tr>
  <tr>
    <td valign="top">**barcode**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The <a href="https://en.wikipedia.org/wiki/Barcode">barcode</a>, if the
release has one. The most common types found on releases are 12-digit
<a href="https://en.wikipedia.org/wiki/Universal_Product_Code">UPCs</a> and 13-digit
<a href="https://en.wikipedia.org/wiki/International_Article_Number">EANs</a>.</td>
  </tr>
  <tr>
    <td valign="top">**status**</td>
    <td valign="top">[ReleaseStatus](#fixme)</td>
    <td>The status describes how “official” a release is.</td>
  </tr>
  <tr>
    <td valign="top">**statusID**</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>status</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**packaging**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The physical packaging that accompanies the release. See
the <a href="https://musicbrainz.org/doc/Release/Packaging">list of packaging</a> for more
information.</td>
  </tr>
  <tr>
    <td valign="top">**packagingID**</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>packaging</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**quality**</td>
    <td valign="top">[String](#fixme)</td>
    <td>Data quality indicates how good the data for a release is.
It is not a mark of how good or bad the music itself is – for that, use
<a href="https://musicbrainz.org/doc/Rating_System">ratings</a>.</td>
  </tr>
  <tr>
    <td valign="top">**artists**</td>
    <td valign="top">[ArtistConnection](#fixme)</td>
    <td>A list of artists linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**labels**</td>
    <td valign="top">[LabelConnection](#fixme)</td>
    <td>A list of labels linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**recordings**</td>
    <td valign="top">[RecordingConnection](#fixme)</td>
    <td>A list of recordings linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**releaseGroups**</td>
    <td valign="top">[ReleaseGroupConnection](#fixme)</td>
    <td>A list of release groups linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[[ReleaseGroupType](#fixme)]</td>
    <td>Filter by one or more release group types.</td>
  </tr>
  <tr>
    <td valign="top">**relationships**</td>
    <td valign="top">[Relationships](#fixme)</td>
    <td>Relationships between this entity and other entitites.</td>
  </tr>
  <tr>
    <td valign="top">**tags**</td>
    <td valign="top">[TagConnection](#fixme)</td>
    <td>A list of tags linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
</tbody></table>

### ReleaseConnection

A connection to a list of items.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**pageInfo**</td>
    <td valign="top">[PageInfo](#fixme)!</td>
    <td>Information to aid in pagination.</td>
  </tr>
  <tr>
    <td valign="top">**edges**</td>
    <td valign="top">[[ReleaseEdge](#fixme)]</td>
    <td>A list of edges.</td>
  </tr>
  <tr>
    <td valign="top">**totalCount**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>A count of the total number of items in this connection,
ignoring pagination.</td>
  </tr>
</tbody></table>

### ReleaseEdge

An edge in a connection.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**node**</td>
    <td valign="top">[Release](#fixme)</td>
    <td>The item at the end of the edge</td>
  </tr>
  <tr>
    <td valign="top">**cursor**</td>
    <td valign="top">[String](#fixme)!</td>
    <td>A cursor for use in pagination</td>
  </tr>
  <tr>
    <td valign="top">**score**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>The relevancy score (0–100) assigned by the search engine, if
these results were found through a search.</td>
  </tr>
</tbody></table>

### ReleaseEvent

Date on which a release was issued in a country/region with a
particular label, catalog number, barcode, and what release format was used.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**area**</td>
    <td valign="top">[Area](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**date**</td>
    <td valign="top">[Date](#fixme)</td>
    <td></td>
  </tr>
</tbody></table>

### ReleaseGroup

A [release group](https://musicbrainz.org/doc/Release_Group) is
used to group several different releases into a single logical entity. Every
release belongs to one, and only one release group.

Both release groups and releases are “albums” in a general sense, but with an
important difference: a release is something you can buy as media such as a CD
or a vinyl record, while a release group embraces the overall concept of an
album – it doesn’t matter how many CDs or editions/versions it had.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**id**</td>
    <td valign="top">[ID](#fixme)!</td>
    <td>The ID of an object</td>
  </tr>
  <tr>
    <td valign="top">**mbid**</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**title**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The official title of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**disambiguation**</td>
    <td valign="top">[String](#fixme)</td>
    <td>A comment used to help distinguish identically named entitites.</td>
  </tr>
  <tr>
    <td valign="top">**aliases**</td>
    <td valign="top">[[Alias](#fixme)]</td>
    <td><a href="https://musicbrainz.org/doc/Aliases">Aliases</a> are used to store
alternate names or misspellings.</td>
  </tr>
  <tr>
    <td valign="top">**artistCredit**</td>
    <td valign="top">[[ArtistCredit](#fixme)]</td>
    <td>The main credited artist(s).</td>
  </tr>
  <tr>
    <td valign="top">**firstReleaseDate**</td>
    <td valign="top">[Date](#fixme)</td>
    <td>The date of the earliest release in the group.</td>
  </tr>
  <tr>
    <td valign="top">**primaryType**</td>
    <td valign="top">[ReleaseGroupType](#fixme)</td>
    <td>The <a href="https://musicbrainz.org/doc/Release_Group/Type">type</a>
of a release group describes what kind of releases the release group represents,
e.g. album, single, soundtrack, compilation, etc. A release group can have a
“main” type and an unspecified number of additional types.</td>
  </tr>
  <tr>
    <td valign="top">**primaryTypeID**</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>primaryType</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**secondaryTypes**</td>
    <td valign="top">[[ReleaseGroupType](#fixme)]</td>
    <td>Additional <a href="https://musicbrainz.org/doc/Release_Group/Type">types</a>
that apply to this release group.</td>
  </tr>
  <tr>
    <td valign="top">**secondaryTypeIDs**</td>
    <td valign="top">[[MBID](#fixme)]</td>
    <td>The MBIDs associated with the values of the <code>secondaryTypes</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**artists**</td>
    <td valign="top">[ArtistConnection](#fixme)</td>
    <td>A list of artists linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**releases**</td>
    <td valign="top">[ReleaseConnection](#fixme)</td>
    <td>A list of releases linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">type</td>
    <td valign="top">[[ReleaseGroupType](#fixme)]</td>
    <td>Filter by one or more release group types.</td>
  </tr>
  <tr>
    <td align="right" valign="top">status</td>
    <td valign="top">[[ReleaseStatus](#fixme)]</td>
    <td>Filter by one or more release statuses.</td>
  </tr>
  <tr>
    <td valign="top">**relationships**</td>
    <td valign="top">[Relationships](#fixme)</td>
    <td>Relationships between this entity and other entitites.</td>
  </tr>
  <tr>
    <td valign="top">**tags**</td>
    <td valign="top">[TagConnection](#fixme)</td>
    <td>A list of tags linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
</tbody></table>

### ReleaseGroupConnection

A connection to a list of items.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**pageInfo**</td>
    <td valign="top">[PageInfo](#fixme)!</td>
    <td>Information to aid in pagination.</td>
  </tr>
  <tr>
    <td valign="top">**edges**</td>
    <td valign="top">[[ReleaseGroupEdge](#fixme)]</td>
    <td>A list of edges.</td>
  </tr>
  <tr>
    <td valign="top">**totalCount**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>A count of the total number of items in this connection,
ignoring pagination.</td>
  </tr>
</tbody></table>

### ReleaseGroupEdge

An edge in a connection.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**node**</td>
    <td valign="top">[ReleaseGroup](#fixme)</td>
    <td>The item at the end of the edge</td>
  </tr>
  <tr>
    <td valign="top">**cursor**</td>
    <td valign="top">[String](#fixme)!</td>
    <td>A cursor for use in pagination</td>
  </tr>
  <tr>
    <td valign="top">**score**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>The relevancy score (0–100) assigned by the search engine, if
these results were found through a search.</td>
  </tr>
</tbody></table>

### SearchQuery

A search for MusicBrainz entities using Lucene query syntax.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**areas**</td>
    <td valign="top">[AreaConnection](#fixme)</td>
    <td>Search for area entities matching the given query.</td>
  </tr>
  <tr>
    <td align="right" valign="top">query</td>
    <td valign="top">[String](#fixme)!</td>
    <td>The query terms, in Lucene search syntax. See <a href="https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search">examples
and search fields</a>.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**artists**</td>
    <td valign="top">[ArtistConnection](#fixme)</td>
    <td>Search for artist entities matching the given query.</td>
  </tr>
  <tr>
    <td align="right" valign="top">query</td>
    <td valign="top">[String](#fixme)!</td>
    <td>The query terms, in Lucene search syntax. See <a href="https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search">examples
and search fields</a>.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**events**</td>
    <td valign="top">[EventConnection](#fixme)</td>
    <td>Search for event entities matching the given query.</td>
  </tr>
  <tr>
    <td align="right" valign="top">query</td>
    <td valign="top">[String](#fixme)!</td>
    <td>The query terms, in Lucene search syntax. See <a href="https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search">examples
and search fields</a>.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**instruments**</td>
    <td valign="top">[InstrumentConnection](#fixme)</td>
    <td>Search for instrument entities matching the given query.</td>
  </tr>
  <tr>
    <td align="right" valign="top">query</td>
    <td valign="top">[String](#fixme)!</td>
    <td>The query terms, in Lucene search syntax. See <a href="https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search">examples
and search fields</a>.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**labels**</td>
    <td valign="top">[LabelConnection](#fixme)</td>
    <td>Search for label entities matching the given query.</td>
  </tr>
  <tr>
    <td align="right" valign="top">query</td>
    <td valign="top">[String](#fixme)!</td>
    <td>The query terms, in Lucene search syntax. See <a href="https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search">examples
and search fields</a>.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**places**</td>
    <td valign="top">[PlaceConnection](#fixme)</td>
    <td>Search for place entities matching the given query.</td>
  </tr>
  <tr>
    <td align="right" valign="top">query</td>
    <td valign="top">[String](#fixme)!</td>
    <td>The query terms, in Lucene search syntax. See <a href="https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search">examples
and search fields</a>.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**recordings**</td>
    <td valign="top">[RecordingConnection](#fixme)</td>
    <td>Search for recording entities matching the given query.</td>
  </tr>
  <tr>
    <td align="right" valign="top">query</td>
    <td valign="top">[String](#fixme)!</td>
    <td>The query terms, in Lucene search syntax. See <a href="https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search">examples
and search fields</a>.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**releases**</td>
    <td valign="top">[ReleaseConnection](#fixme)</td>
    <td>Search for release entities matching the given query.</td>
  </tr>
  <tr>
    <td align="right" valign="top">query</td>
    <td valign="top">[String](#fixme)!</td>
    <td>The query terms, in Lucene search syntax. See <a href="https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search">examples
and search fields</a>.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**releaseGroups**</td>
    <td valign="top">[ReleaseGroupConnection](#fixme)</td>
    <td>Search for release group entities matching the given query.</td>
  </tr>
  <tr>
    <td align="right" valign="top">query</td>
    <td valign="top">[String](#fixme)!</td>
    <td>The query terms, in Lucene search syntax. See <a href="https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search">examples
and search fields</a>.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**series**</td>
    <td valign="top">[SeriesConnection](#fixme)</td>
    <td>Search for series entities matching the given query.</td>
  </tr>
  <tr>
    <td align="right" valign="top">query</td>
    <td valign="top">[String](#fixme)!</td>
    <td>The query terms, in Lucene search syntax. See <a href="https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search">examples
and search fields</a>.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**works**</td>
    <td valign="top">[WorkConnection](#fixme)</td>
    <td>Search for work entities matching the given query.</td>
  </tr>
  <tr>
    <td align="right" valign="top">query</td>
    <td valign="top">[String](#fixme)!</td>
    <td>The query terms, in Lucene search syntax. See <a href="https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2/Search">examples
and search fields</a>.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
</tbody></table>

### Series

A [series](https://musicbrainz.org/doc/Series) is a sequence of
separate release groups, releases, recordings, works or events with a common
theme.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**id**</td>
    <td valign="top">[ID](#fixme)!</td>
    <td>The ID of an object</td>
  </tr>
  <tr>
    <td valign="top">**mbid**</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**name**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The official name of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**disambiguation**</td>
    <td valign="top">[String](#fixme)</td>
    <td>A comment used to help distinguish identically named entitites.</td>
  </tr>
  <tr>
    <td valign="top">**type**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The type primarily describes what type of entity the series
contains.</td>
  </tr>
  <tr>
    <td valign="top">**typeID**</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**relationships**</td>
    <td valign="top">[Relationships](#fixme)</td>
    <td>Relationships between this entity and other entitites.</td>
  </tr>
  <tr>
    <td valign="top">**tags**</td>
    <td valign="top">[TagConnection](#fixme)</td>
    <td>A list of tags linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
</tbody></table>

### SeriesConnection

A connection to a list of items.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**pageInfo**</td>
    <td valign="top">[PageInfo](#fixme)!</td>
    <td>Information to aid in pagination.</td>
  </tr>
  <tr>
    <td valign="top">**edges**</td>
    <td valign="top">[[SeriesEdge](#fixme)]</td>
    <td>A list of edges.</td>
  </tr>
  <tr>
    <td valign="top">**totalCount**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>A count of the total number of items in this connection,
ignoring pagination.</td>
  </tr>
</tbody></table>

### SeriesEdge

An edge in a connection.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**node**</td>
    <td valign="top">[Series](#fixme)</td>
    <td>The item at the end of the edge</td>
  </tr>
  <tr>
    <td valign="top">**cursor**</td>
    <td valign="top">[String](#fixme)!</td>
    <td>A cursor for use in pagination</td>
  </tr>
  <tr>
    <td valign="top">**score**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>The relevancy score (0–100) assigned by the search engine, if
these results were found through a search.</td>
  </tr>
</tbody></table>

### Tag

[Tags](https://musicbrainz.org/tags) are a way to mark entities
with extra information – for example, the genres that apply to an artist,
release, or recording.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**name**</td>
    <td valign="top">[String](#fixme)!</td>
    <td>The tag label.</td>
  </tr>
  <tr>
    <td valign="top">**count**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>How many times this tag has been applied to the entity.</td>
  </tr>
</tbody></table>

### TagConnection

A connection to a list of items.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**pageInfo**</td>
    <td valign="top">[PageInfo](#fixme)!</td>
    <td>Information to aid in pagination.</td>
  </tr>
  <tr>
    <td valign="top">**edges**</td>
    <td valign="top">[[TagEdge](#fixme)]</td>
    <td>A list of edges.</td>
  </tr>
  <tr>
    <td valign="top">**totalCount**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>A count of the total number of items in this connection,
ignoring pagination.</td>
  </tr>
</tbody></table>

### TagEdge

An edge in a connection.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**node**</td>
    <td valign="top">[Tag](#fixme)</td>
    <td>The item at the end of the edge</td>
  </tr>
  <tr>
    <td valign="top">**cursor**</td>
    <td valign="top">[String](#fixme)!</td>
    <td>A cursor for use in pagination</td>
  </tr>
  <tr>
    <td valign="top">**score**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>The relevancy score (0–100) assigned by the search engine, if
these results were found through a search.</td>
  </tr>
</tbody></table>

### URL

A [URL](https://musicbrainz.org/doc/URL) pointing to a resource
external to MusicBrainz, i.e. an official homepage, a site where music can be
acquired, an entry in another database, etc.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**id**</td>
    <td valign="top">[ID](#fixme)!</td>
    <td>The ID of an object</td>
  </tr>
  <tr>
    <td valign="top">**mbid**</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**resource**</td>
    <td valign="top">[URLString](#fixme)!</td>
    <td>The actual URL string.</td>
  </tr>
  <tr>
    <td valign="top">**relationships**</td>
    <td valign="top">[Relationships](#fixme)</td>
    <td>Relationships between this entity and other entitites.</td>
  </tr>
</tbody></table>

### URLConnection

A connection to a list of items.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**pageInfo**</td>
    <td valign="top">[PageInfo](#fixme)!</td>
    <td>Information to aid in pagination.</td>
  </tr>
  <tr>
    <td valign="top">**edges**</td>
    <td valign="top">[[URLEdge](#fixme)]</td>
    <td>A list of edges.</td>
  </tr>
  <tr>
    <td valign="top">**totalCount**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>A count of the total number of items in this connection,
ignoring pagination.</td>
  </tr>
</tbody></table>

### URLEdge

An edge in a connection.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**node**</td>
    <td valign="top">[URL](#fixme)</td>
    <td>The item at the end of the edge</td>
  </tr>
  <tr>
    <td valign="top">**cursor**</td>
    <td valign="top">[String](#fixme)!</td>
    <td>A cursor for use in pagination</td>
  </tr>
  <tr>
    <td valign="top">**score**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>The relevancy score (0–100) assigned by the search engine, if
these results were found through a search.</td>
  </tr>
</tbody></table>

### Work

A [work](https://musicbrainz.org/doc/Work) is a distinct
intellectual or artistic creation, which can be expressed in the form of one or
more audio recordings.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**id**</td>
    <td valign="top">[ID](#fixme)!</td>
    <td>The ID of an object</td>
  </tr>
  <tr>
    <td valign="top">**mbid**</td>
    <td valign="top">[MBID](#fixme)!</td>
    <td>The MBID of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**title**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The official title of the entity.</td>
  </tr>
  <tr>
    <td valign="top">**disambiguation**</td>
    <td valign="top">[String](#fixme)</td>
    <td>A comment used to help distinguish identically named entitites.</td>
  </tr>
  <tr>
    <td valign="top">**aliases**</td>
    <td valign="top">[[Alias](#fixme)]</td>
    <td><a href="https://musicbrainz.org/doc/Aliases">Aliases</a> are used to store
alternate names or misspellings.</td>
  </tr>
  <tr>
    <td valign="top">**iswcs**</td>
    <td valign="top">[[String](#fixme)]</td>
    <td>A list of <a href="https://musicbrainz.org/doc/ISWC">ISWCs</a> assigned
to the work by copyright collecting agencies.</td>
  </tr>
  <tr>
    <td valign="top">**language**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The language in which the work was originally written.</td>
  </tr>
  <tr>
    <td valign="top">**type**</td>
    <td valign="top">[String](#fixme)</td>
    <td>The type of work.</td>
  </tr>
  <tr>
    <td valign="top">**typeID**</td>
    <td valign="top">[MBID](#fixme)</td>
    <td>The MBID associated with the value of the <code>type</code>
field.</td>
  </tr>
  <tr>
    <td valign="top">**artists**</td>
    <td valign="top">[ArtistConnection](#fixme)</td>
    <td>A list of artists linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td valign="top">**relationships**</td>
    <td valign="top">[Relationships](#fixme)</td>
    <td>Relationships between this entity and other entitites.</td>
  </tr>
  <tr>
    <td valign="top">**tags**</td>
    <td valign="top">[TagConnection](#fixme)</td>
    <td>A list of tags linked to this entity.</td>
  </tr>
  <tr>
    <td align="right" valign="top">after</td>
    <td valign="top">[String](#fixme)</td>
    <td></td>
  </tr>
  <tr>
    <td align="right" valign="top">first</td>
    <td valign="top">[Int](#fixme)</td>
    <td></td>
  </tr>
</tbody></table>

### WorkConnection

A connection to a list of items.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**pageInfo**</td>
    <td valign="top">[PageInfo](#fixme)!</td>
    <td>Information to aid in pagination.</td>
  </tr>
  <tr>
    <td valign="top">**edges**</td>
    <td valign="top">[[WorkEdge](#fixme)]</td>
    <td>A list of edges.</td>
  </tr>
  <tr>
    <td valign="top">**totalCount**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>A count of the total number of items in this connection,
ignoring pagination.</td>
  </tr>
</tbody></table>

### WorkEdge

An edge in a connection.

<table><thead>
  <th>Field&nbsp;/&nbsp;Argument</th><th>Type</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**node**</td>
    <td valign="top">[Work](#fixme)</td>
    <td>The item at the end of the edge</td>
  </tr>
  <tr>
    <td valign="top">**cursor**</td>
    <td valign="top">[String](#fixme)!</td>
    <td>A cursor for use in pagination</td>
  </tr>
  <tr>
    <td valign="top">**score**</td>
    <td valign="top">[Int](#fixme)</td>
    <td>The relevancy score (0–100) assigned by the search engine, if
these results were found through a search.</td>
  </tr>
</tbody></table>

## Enums

### ReleaseGroupType

<table><thead>
  <th>Value</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**ALBUM**</td>
    <td>An album, perhaps better defined as a “Long Play” (LP)
release, generally consists of previously unreleased material (unless this type
is combined with secondary types which change that, such as “Compilation”). This
includes album re-issues, with or without bonus tracks.</td>
  </tr>
  <tr>
    <td valign="top">**SINGLE**</td>
    <td>A single typically has one main song and possibly a handful
of additional tracks or remixes of the main track. A single is usually named
after its main song.</td>
  </tr>
  <tr>
    <td valign="top">**EP**</td>
    <td>An EP is a so-called “Extended Play” release and often
contains the letters EP in the title. Generally an EP will be shorter than a
full length release (an LP or “Long Play”) and the tracks are usually exclusive
to the EP, in other words the tracks don’t come from a previously issued
release. EP is fairly difficult to define; usually it should only be assumed
that a release is an EP if the artist defines it as such.</td>
  </tr>
  <tr>
    <td valign="top">**OTHER**</td>
    <td>Any release that does not fit any of the other categories.</td>
  </tr>
  <tr>
    <td valign="top">**BROADCAST**</td>
    <td>An episodic release that was originally broadcast via radio,
television, or the Internet, including podcasts.</td>
  </tr>
  <tr>
    <td valign="top">**COMPILATION**</td>
    <td>A compilation is a collection of previously released tracks
by one or more artists.</td>
  </tr>
  <tr>
    <td valign="top">**SOUNDTRACK**</td>
    <td>A soundtrack is the musical score to a movie, TV series,
stage show, computer game, etc.</td>
  </tr>
  <tr>
    <td valign="top">**SPOKENWORD**</td>
    <td>A non-music spoken word release.</td>
  </tr>
  <tr>
    <td valign="top">**INTERVIEW**</td>
    <td>An interview release contains an interview, generally with
an artist.</td>
  </tr>
  <tr>
    <td valign="top">**AUDIOBOOK**</td>
    <td>An audiobook is a book read by a narrator without music.</td>
  </tr>
  <tr>
    <td valign="top">**LIVE**</td>
    <td>A release that was recorded live.</td>
  </tr>
  <tr>
    <td valign="top">**REMIX**</td>
    <td>A release that was (re)mixed from previously released
material.</td>
  </tr>
  <tr>
    <td valign="top">**DJMIX**</td>
    <td>A DJ-mix is a sequence of several recordings played one
after the other, each one modified so that they blend together into a continuous
flow of music. A DJ mix release requires that the recordings be modified in some
manner, and the DJ who does this modification is usually (although not always)
credited in a fairly prominent way.</td>
  </tr>
  <tr>
    <td valign="top">**MIXTAPE**</td>
    <td>Promotional in nature (but not necessarily free), mixtapes
and street albums are often released by artists to promote new artists, or
upcoming studio albums by prominent artists. They are also sometimes used to
keep fans’ attention between studio releases and are most common in rap &amp; hip
hop genres. They are often not sanctioned by the artist’s label, may lack proper
sample or song clearances and vary widely in production and recording quality.
While mixtapes are generally DJ-mixed, they are distinct from commercial DJ
mixes (which are usually deemed compilations) and are defined by having a
significant proportion of new material, including original production or
original vocals over top of other artists’ instrumentals. They are distinct from
demos in that they are designed for release directly to the public and fans, not
to labels.</td>
  </tr>
  <tr>
    <td valign="top">**DEMO**</td>
    <td>A release that was recorded for limited circulation or
reference use rather than for general public release.</td>
  </tr>
  <tr>
    <td valign="top">**NAT**</td>
    <td>A non-album track (special case).</td>
  </tr>
</tbody></table>

### ReleaseStatus

<table><thead>
  <th>Value</th><th>Description</th>
</thead><tbody>
  <tr>
    <td valign="top">**OFFICIAL**</td>
    <td>Any release officially sanctioned by the artist and/or their
record company. (Most releases will fit into this category.)</td>
  </tr>
  <tr>
    <td valign="top">**PROMOTION**</td>
    <td>A giveaway release or a release intended to promote an
upcoming official release, e.g. prerelease albums or releases included with a
magazine.</td>
  </tr>
  <tr>
    <td valign="top">**BOOTLEG**</td>
    <td>An unofficial/underground release that was not sanctioned by
the artist and/or the record company.</td>
  </tr>
  <tr>
    <td valign="top">**PSEUDORELEASE**</td>
    <td>A pseudo-release is a duplicate release for
translation/transliteration purposes.</td>
  </tr>
</tbody></table>

## Scalars

### Boolean

The `Boolean` scalar type represents `true` or `false`.

### Date

Year, month (optional), and day (optional) in YYYY-MM-DD format.

### Degrees

Decimal degrees, used for latitude and longitude.

### ID

The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.

### IPI

An [IPI](https://musicbrainz.org/doc/IPI) (interested party
information) code is an identifying number assigned by the CISAC database for
musical rights management.

### Int

The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 

### MBID

The MBID scalar represents MusicBrainz identifiers, which are
36-character UUIDs.

### String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.

### Time

A time of day, in 24-hour hh:mm notation.

### URLString

A web address.


## Interfaces

### Entity

An entity in the MusicBrainz schema.

### Node

An object with an ID

