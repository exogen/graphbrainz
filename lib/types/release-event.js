'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = require('graphql/type');

var _scalars = require('./scalars');

var _area = require('./area');

var _area2 = _interopRequireDefault(_area);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _type.GraphQLObjectType({
  name: 'ReleaseEvent',
  description: `The date on which a release was issued in a country/region with
a particular label, catalog number, barcode, and format.`,
  fields: () => ({
    area: { type: _area2.default },
    date: { type: _scalars.DateType }
  })
});