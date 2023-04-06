"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methodRequestBody = methodRequestBody;
var _helpers = require("../../helpers");
var _CurlSnippet = _interopRequireDefault(require("./langs/CurlSnippet"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

function methodRequestBody(spec, path, server, reqtype, description, method) {
  let result = '<section class="container-fluid d-block ">';
  let properties = [];
  let typeNow = '';
  let descriptionNow = description ? description : '';

  // Extract the properties from the schema
  Object.keys(spec).map(key => {
    switch (key) {
      case 'content':
        result += (0, _helpers.requestBodyViewer)(spec[key], true);
        break;
      case 'description':
      case 'summary':
        descriptionNow = spec[key];
        break;
      default:
        break;
    }
  });
  return "".concat(result, "</section>");
}