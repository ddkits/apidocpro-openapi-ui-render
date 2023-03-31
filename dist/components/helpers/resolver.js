"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveRef = resolveRef;
require("core-js/modules/web.dom-collections.iterator.js");
function resolveRef(ref, schema) {
  // Split the ref into its components
  const components = ref.split('/').filter(c => c !== '');

  // Resolve each component of the ref
  let resolved = schema;
  for (const component of components) {
    resolved = resolved[component];
  }
  return resolved;
}