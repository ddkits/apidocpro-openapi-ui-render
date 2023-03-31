"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TryItOut;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.promise.js");
/**
 * Sends a POST request to create a new user with the given data
 *
 * @param {Object} userData - The data for the new user
 * @returns {Promise} A Promise that resolves with the created user's data
 */
function TryItOut(method, url, body) {
  const options = {
    method: "".concat(method.toUpperCase()),
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  return fetch(url, options).then(response => response.json()).then(data => {
    // handle successful response
    return data;
  }).catch(error => {
    // handle error
    console.error(error);
  });
}