"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeProptype = void 0;
exports.resolveRefs = resolveRefs;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.json.stringify.js");
/* eslint-disable no-prototype-builtins */
function resolveRefs(document) {
  const regex = /^#\/([a-zA-Z0-9-_/]+)$/;
  const resolveRef = (obj, ref) => {
    const match = ref.match(regex);
    if (match) {
      const parts = match[1].split('/');
      let value = obj;
      for (const part of parts) {
        value = value[part];
      }
      return value;
    }
    return undefined;
  };
  const resolve = obj => {
    if (typeof obj === 'object' && obj !== null) {
      if ('$ref' in obj) {
        const refValue = resolveRef(document, obj['$ref']);
        if (refValue !== undefined) {
          return resolve(refValue);
        }
      } else {
        for (const key in obj) {
          obj[key] = resolve(obj[key]);
        }
      }
    }
    return obj;
  };
  return resolve(document);
}
const removeProptype = json => {
  const jsonStr = JSON.stringify(json);
  let jsonObj = JSON.parse(jsonStr);
  let newObj = {};
  for (let prop in jsonObj) {
    // eslint-disable-next-line no-prototype-builtins
    if (jsonObj.hasOwnProperty(prop) && prop !== '__proto__') {
      newObj[prop] = jsonObj[prop];
    }
  }
  let newJsonStr = JSON.parse(JSON.stringify(newObj));
  return newJsonStr;
};
exports.removeProptype = removeProptype;