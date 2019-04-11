'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadExtension = loadExtension;
function loadExtension(extensionModule) {
  let extension;
  if (typeof extensionModule === 'string') {
    extension = require(extensionModule);
  } else {
    extension = extensionModule;
  }
  if (extension == null || typeof extension !== 'object') {
    throw new Error(`Expected ${extensionModule} to export an extension but instead ` + `got: ${extension}`);
  } else if (extension.default) {
    // ECMAScript module interop.
    extension = extension.default;
  }
  return extension;
}