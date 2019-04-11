'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendContext = extendContext;
exports.createContext = createContext;

var _loaders = require('./loaders');

var _loaders2 = _interopRequireDefault(_loaders);

var _extensions = require('./extensions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('graphbrainz:context');

function extendContext(extension, context, options) {
  if (extension.extendContext) {
    if (typeof extension.extendContext === 'function') {
      debug(`Extending context via a function from the “${extension.name}” extension.`);
      context = extension.extendContext(context, options);
    } else {
      throw new Error(`Extension “${extension.name}” contains an invalid \`extendContext\` ` + `value: ${extension.extendContext}`);
    }
  }
  return context;
}

function createContext(options = {}) {
  const { client } = options;
  const loaders = (0, _loaders2.default)(client);
  const context = { client, loaders };
  const { extensions = [] } = options;
  return extensions.reduce((context, extension) => {
    return extendContext((0, _extensions.loadExtension)(extension), context, options);
  }, context);
}