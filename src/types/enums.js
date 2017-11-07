import { GraphQLEnumType } from 'graphql/type'

export const ArtistType = new GraphQLEnumType({
  name: 'ArtistType',
  description: `A type used to describe artists, e.g. person, group, character,
etc.`,
  values: {
    PERSON: {
      name: 'Person',
      description: 'This indicates an individual person.',
      value: 'Person'
    },
    GROUP: {
      name: 'Group',
      description: `This indicates a group of people that may or may not have a
distinctive name.`,
      value: 'Group'
    },
    ORCHESTRA: {
      name: 'Orchestra',
      description:
        'This indicates an orchestra (a large instrumental ensemble).',
      value: 'Orchestra'
    },
    CHOIR: {
      name: 'Choir',
      description: 'This indicates a choir/chorus (a large vocal ensemble).',
      value: 'Choir'
    },
    CHARACTER: {
      name: 'Character',
      description: 'This indicates an individual fictional character.',
      value: 'Character'
    },
    OTHER: {
      name: 'Other',
      description: 'An artist which does not fit into the other categories.',
      value: 'Other'
    }
  }
})

export const CoverArtImageSize = new GraphQLEnumType({
  name: 'CoverArtImageSize',
  description: `The image sizes that may be requested at the [Cover Art
Archive](https://musicbrainz.org/doc/Cover_Art_Archive).`,
  values: {
    SMALL: {
      name: 'Small',
      description: 'A maximum dimension of 250px.',
      value: 250
    },
    LARGE: {
      name: 'Large',
      description: 'A maximum dimension of 500px.',
      value: 500
    },
    FULL: {
      name: 'Full',
      description: 'The image’s original dimensions, with no maximum.',
      value: null
    }
  }
})

export const ReleaseStatus = new GraphQLEnumType({
  name: 'ReleaseStatus',
  description: `A type used to describe the status of releases, e.g. official,
bootleg, etc.`,
  values: {
    OFFICIAL: {
      name: 'Official',
      description: `Any release officially sanctioned by the artist and/or their
record company. (Most releases will fit into this category.)`,
      value: 'Official'
    },
    PROMOTION: {
      name: 'Promotion',
      description: `A giveaway release or a release intended to promote an
upcoming official release, e.g. prerelease albums or releases included with a
magazine.`,
      value: 'Promotion'
    },
    BOOTLEG: {
      name: 'Bootleg',
      description: `An unofficial/underground release that was not sanctioned by
the artist and/or the record company.`,
      value: 'Bootleg'
    },
    PSEUDORELEASE: {
      name: 'Pseudo-Release',
      description: `A pseudo-release is a duplicate release for
translation/transliteration purposes.`,
      value: 'Pseudo-Release'
    }
  }
})

export const ReleaseGroupType = new GraphQLEnumType({
  name: 'ReleaseGroupType',
  description: `A type used to describe release groups, e.g. album, single, EP,
etc.`,
  values: {
    ALBUM: {
      name: 'Album',
      description: `An album, perhaps better defined as a “Long Play” (LP)
release, generally consists of previously unreleased material (unless this type
is combined with secondary types which change that, such as “Compilation”). This
includes album re-issues, with or without bonus tracks.`,
      value: 'Album'
    },
    SINGLE: {
      name: 'Single',
      description: `A single typically has one main song and possibly a handful
of additional tracks or remixes of the main track. A single is usually named
after its main song.`,
      value: 'Single'
    },
    EP: {
      name: 'EP',
      description: `An EP is a so-called “Extended Play” release and often
contains the letters EP in the title. Generally an EP will be shorter than a
full length release (an LP or “Long Play”) and the tracks are usually exclusive
to the EP, in other words the tracks don’t come from a previously issued
release. EP is fairly difficult to define; usually it should only be assumed
that a release is an EP if the artist defines it as such.`,
      value: 'EP'
    },
    OTHER: {
      name: 'Other',
      description: 'Any release that does not fit any of the other categories.',
      value: 'Other'
    },
    BROADCAST: {
      name: 'Broadcast',
      description: `An episodic release that was originally broadcast via radio,
television, or the Internet, including podcasts.`,
      value: 'Broadcast'
    },
    COMPILATION: {
      name: 'Compilation',
      description: `A compilation is a collection of previously released tracks
by one or more artists.`,
      value: 'Compilation'
    },
    SOUNDTRACK: {
      name: 'Soundtrack',
      description: `A soundtrack is the musical score to a movie, TV series,
stage show, computer game, etc.`,
      value: 'Soundtrack'
    },
    SPOKENWORD: {
      name: 'Spoken Word',
      description: 'A non-music spoken word release.',
      value: 'Spoken Word'
    },
    INTERVIEW: {
      name: 'Interview',
      description: `An interview release contains an interview, generally with
an artist.`,
      value: 'Interview'
    },
    AUDIOBOOK: {
      name: 'Audiobook',
      description: 'An audiobook is a book read by a narrator without music.',
      value: 'Audiobook'
    },
    LIVE: {
      name: 'Live',
      description: 'A release that was recorded live.',
      value: 'Live'
    },
    REMIX: {
      name: 'Remix',
      description: `A release that was (re)mixed from previously released
material.`,
      value: 'Remix'
    },
    DJMIX: {
      name: 'DJ-mix',
      description: `A DJ-mix is a sequence of several recordings played one
after the other, each one modified so that they blend together into a continuous
flow of music. A DJ mix release requires that the recordings be modified in some
manner, and the DJ who does this modification is usually (although not always)
credited in a fairly prominent way.`,
      value: 'DJ-mix'
    },
    MIXTAPE: {
      name: 'Mixtape/Street',
      description: `Promotional in nature (but not necessarily free), mixtapes
and street albums are often released by artists to promote new artists, or
upcoming studio albums by prominent artists. They are also sometimes used to
keep fans’ attention between studio releases and are most common in rap & hip
hop genres. They are often not sanctioned by the artist’s label, may lack proper
sample or song clearances and vary widely in production and recording quality.
While mixtapes are generally DJ-mixed, they are distinct from commercial DJ
mixes (which are usually deemed compilations) and are defined by having a
significant proportion of new material, including original production or
original vocals over top of other artists’ instrumentals. They are distinct from
demos in that they are designed for release directly to the public and fans, not
to labels.`,
      value: 'Mixtape/Street'
    },
    DEMO: {
      name: 'Demo',
      description: `A release that was recorded for limited circulation or
reference use rather than for general public release.`,
      value: 'Demo'
    },
    NAT: {
      name: 'Non-Album Track',
      description: 'A non-album track (special case).',
      value: 'NAT'
    }
  }
})
