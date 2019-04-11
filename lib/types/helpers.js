'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.score = exports.totalCount = exports.works = exports.tags = exports.series = exports.releaseGroups = exports.releases = exports.recordings = exports.places = exports.labels = exports.instruments = exports.events = exports.collections = exports.artists = exports.areas = exports.releaseStatus = exports.releaseGroupType = exports.rating = exports.artistCredit = exports.artistCredits = exports.aliases = exports.relationships = exports.relationship = exports.lifeSpan = exports.disambiguation = exports.title = exports.sortName = exports.name = exports.mbid = exports.id = exports.toDashed = exports.toPascal = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.toPlural = toPlural;
exports.toSingular = toSingular;
exports.toWords = toWords;
exports.resolveHyphenated = resolveHyphenated;
exports.resolveWithFallback = resolveWithFallback;
exports.fieldWithID = fieldWithID;
exports.createCollectionField = createCollectionField;
exports.connectionWithExtras = connectionWithExtras;

var _dashify = require('dashify');

var _dashify2 = _interopRequireDefault(_dashify);

var _pascalcase = require('pascalcase');

var _pascalcase2 = _interopRequireDefault(_pascalcase);

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _scalars = require('./scalars');

var _enums = require('./enums');

var _alias = require('./alias');

var _alias2 = _interopRequireDefault(_alias);

var _artistCredit = require('./artist-credit');

var _artistCredit2 = _interopRequireDefault(_artistCredit);

var _area = require('./area');

var _artist = require('./artist');

var _collection = require('./collection');

var _event = require('./event');

var _instrument = require('./instrument');

var _label = require('./label');

var _lifeSpan = require('./life-span');

var _lifeSpan2 = _interopRequireDefault(_lifeSpan);

var _place = require('./place');

var _rating = require('./rating');

var _rating2 = _interopRequireDefault(_rating);

var _recording = require('./recording');

var _relationship = require('./relationship');

var _release = require('./release');

var _releaseGroup = require('./release-group');

var _series = require('./series');

var _tag = require('./tag');

var _work = require('./work');

var _resolvers = require('../resolvers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const toPascal = exports.toPascal = _pascalcase2.default;
const toDashed = exports.toDashed = _dashify2.default;

function toPlural(name) {
  return name.endsWith('s') ? name : name + 's';
}

function toSingular(name) {
  return name.endsWith('s') && !/series/i.test(name) ? name.slice(0, -1) : name;
}

function toWords(name) {
  return toPascal(name).replace(/([^A-Z])?([A-Z]+)/g, (match, tail, head) => {
    tail = tail ? tail + ' ' : '';
    head = head.length > 1 ? head : head.toLowerCase();
    return `${tail}${head}`;
  });
}

function resolveHyphenated(obj, args, context, info) {
  const name = toDashed(info.fieldName);
  return obj[name];
}

function resolveWithFallback(keys) {
  return obj => {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key in obj) {
        return obj[key];
      }
    }
  };
}

function fieldWithID(name, config = {}) {
  config = {
    type: _graphql.GraphQLString,
    resolve: resolveHyphenated,
    ...config
  };
  const isPlural = config.type instanceof _graphql.GraphQLList;
  const singularName = isPlural ? toSingular(name) : name;
  const idName = isPlural ? `${singularName}IDs` : `${name}ID`;
  const s = isPlural ? 's' : '';
  const idConfig = {
    type: isPlural ? new _graphql.GraphQLList(_scalars.MBID) : _scalars.MBID,
    description: `The MBID${s} associated with the value${s} of the \`${name}\`
field.`,
    resolve: (entity, args, { loaders }) => {
      const fieldName = toDashed(idName);
      if (fieldName in entity) {
        return entity[fieldName];
      }
      return loaders.lookup.load([entity._type, entity.id]).then(data => data[fieldName]);
    }
  };
  return {
    [name]: config,
    [idName]: idConfig
  };
}

function createCollectionField(config) {
  const typeName = toPlural(toWords(config.type.name.slice(0, -10)));
  return {
    ...config,
    description: `The list of ${typeName} found in this collection.`
  };
}

const id = exports.id = (0, _graphqlRelay.globalIdField)();
const mbid = exports.mbid = {
  type: new _graphql.GraphQLNonNull(_scalars.MBID),
  description: 'The MBID of the entity.',
  resolve: entity => entity.id
};
const name = exports.name = {
  type: _graphql.GraphQLString,
  description: 'The official name of the entity.'
};
const sortName = exports.sortName = {
  type: _graphql.GraphQLString,
  description: `The string to use for the purpose of ordering by name (for
example, by moving articles like ‘the’ to the end or a person’s last name to
the front).`,
  resolve: resolveHyphenated
};
const title = exports.title = {
  type: _graphql.GraphQLString,
  description: 'The official title of the entity.'
};
const disambiguation = exports.disambiguation = {
  type: _graphql.GraphQLString,
  description: 'A comment used to help distinguish identically named entitites.'
};
const lifeSpan = exports.lifeSpan = {
  type: _lifeSpan2.default,
  description: `The begin and end dates of the entity’s existence. Its exact
meaning depends on the type of entity.`,
  resolve: resolveHyphenated
};

function linkedQuery(connectionType, { args, ...config } = {}) {
  const typeName = toPlural(toWords(connectionType.name.slice(0, -10)));
  return {
    type: connectionType,
    description: `A list of ${typeName} linked to this entity.`,
    args: {
      ...args,
      ..._graphqlRelay.forwardConnectionArgs
    },
    resolve: _resolvers.resolveLinked,
    ...config
  };
}

const relationship = exports.relationship = {
  type: _relationship.RelationshipConnection,
  description: 'A list of relationships between these two entity types.',
  args: {
    direction: {
      type: _graphql.GraphQLString,
      description: 'Filter by the relationship direction.'
    },
    ...fieldWithID('type', {
      description: 'Filter by the relationship type.'
    }),
    ..._graphqlRelay.connectionArgs
  },
  resolve: _resolvers.resolveRelationship
};

const relationships = exports.relationships = {
  type: new _graphql.GraphQLObjectType({
    name: 'Relationships',
    description: 'Lists of entity relationships for each entity type.',
    fields: () => ({
      areas: relationship,
      artists: relationship,
      events: relationship,
      instruments: relationship,
      labels: relationship,
      places: relationship,
      recordings: relationship,
      releases: relationship,
      releaseGroups: relationship,
      series: relationship,
      urls: relationship,
      works: relationship
    })
  }),
  description: 'Relationships between this entity and other entitites.',
  resolve: (entity, args, { loaders }, info) => {
    let promise;
    if (entity.relations != null) {
      promise = _promise2.default.resolve(entity);
    } else {
      const entityType = toDashed(info.parentType.name);
      const id = entity.id;
      const params = (0, _resolvers.includeRelationships)({}, info);
      promise = loaders.lookup.load([entityType, id, params]);
    }
    return promise.then(entity => entity.relations);
  }
};

const aliases = exports.aliases = {
  type: new _graphql.GraphQLList(_alias2.default),
  description: `[Aliases](https://musicbrainz.org/doc/Aliases) are used to store
alternate names or misspellings.`,
  resolve: (0, _resolvers.createSubqueryResolver)()
};

const artistCredits = exports.artistCredits = {
  type: new _graphql.GraphQLList(_artistCredit2.default),
  description: 'The main credited artist(s).',
  resolve: (0, _resolvers.createSubqueryResolver)({
    inc: 'artist-credits',
    key: 'artist-credit'
  })
};

const artistCredit = exports.artistCredit = {
  ...artistCredits,
  deprecationReason: `The \`artistCredit\` field has been renamed to
\`artistCredits\`, since it is a list of credits and is referred to in the
plural form throughout the MusicBrainz documentation. This field is deprecated
and will be removed in a major release in the future. Use the equivalent
\`artistCredits\` field.`
};

const rating = exports.rating = {
  type: _rating2.default,
  description: 'The rating users have given to this entity.',
  resolve: (0, _resolvers.createSubqueryResolver)({ inc: 'ratings' })
};

const releaseGroupType = exports.releaseGroupType = {
  type: new _graphql.GraphQLList(_enums.ReleaseGroupType),
  description: 'Filter by one or more release group types.'
};

const releaseStatus = exports.releaseStatus = {
  type: new _graphql.GraphQLList(_enums.ReleaseStatus),
  description: 'Filter by one or more release statuses.'
};

const areas = exports.areas = linkedQuery(_area.AreaConnection);
const artists = exports.artists = linkedQuery(_artist.ArtistConnection);
const collections = exports.collections = linkedQuery(_collection.CollectionConnection, {
  description: 'A list of collections containing this entity.'
});
const events = exports.events = linkedQuery(_event.EventConnection);
const instruments = exports.instruments = linkedQuery(_instrument.InstrumentConnection);
const labels = exports.labels = linkedQuery(_label.LabelConnection);
const places = exports.places = linkedQuery(_place.PlaceConnection);
const recordings = exports.recordings = linkedQuery(_recording.RecordingConnection);
const releases = exports.releases = linkedQuery(_release.ReleaseConnection, {
  args: {
    type: releaseGroupType,
    status: releaseStatus
  }
});
const releaseGroups = exports.releaseGroups = linkedQuery(_releaseGroup.ReleaseGroupConnection, {
  args: {
    type: releaseGroupType
  }
});
const series = exports.series = linkedQuery(_series.SeriesConnection);
const tags = exports.tags = linkedQuery(_tag.TagConnection, {
  resolve: (0, _resolvers.createSubqueryResolver)({}, (value = [], args) => {
    const connection = (0, _graphqlRelay.connectionFromArray)(value, args);
    return {
      nodes: connection.edges.map(edge => edge.node),
      totalCount: value.length,
      ...connection
    };
  })
});
const works = exports.works = linkedQuery(_work.WorkConnection);

const totalCount = exports.totalCount = {
  type: _graphql.GraphQLInt,
  description: `A count of the total number of items in this connection,
ignoring pagination.`
};

const score = exports.score = {
  type: _graphql.GraphQLInt,
  description: `The relevancy score (0–100) assigned by the search engine, if
these results were found through a search.`
};

function connectionWithExtras(nodeType) {
  return (0, _graphqlRelay.connectionDefinitions)({
    nodeType,
    connectionFields: () => ({
      nodes: {
        type: new _graphql.GraphQLList(nodeType),
        description: `A list of nodes in the connection (without going through the
\`edges\` field).`
      },
      totalCount
    }),
    edgeFields: () => ({ score })
  }).connectionType;
}