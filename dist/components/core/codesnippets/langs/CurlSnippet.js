"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.curlSnippet = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/esnext.string.replace-all.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const curlSnippet = function curlSnippet() {
  let spec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let id = '';
  let desc = '';
  if (!method || !path) {
    return '';
  }
  const generateCurl = () => {
    var _spec$servers$, _operation$requestBod, _operation$requestBod2, _operation$requestBod3;
    if (!method === '') {
      return '';
    }
    id = path.replaceAll(' ', '_').replaceAll('.', '_').replaceAll('{', '_').replaceAll('}', '_').replaceAll('/', '-').replaceAll(',', '_');
    const operation = spec.paths[path][method];
    const url = spec !== null && spec !== void 0 && spec.servers && spec !== null && spec !== void 0 && spec.servers[0] ? (spec === null || spec === void 0 ? void 0 : (_spec$servers$ = spec.servers[0]) === null || _spec$servers$ === void 0 ? void 0 : _spec$servers$.url) + path : 'http://localhost' + path;
    const parameters = operation.parameters ? operation.parameters : [];
    desc = operation !== null && operation !== void 0 && (_operation$requestBod = operation.requestBody) !== null && _operation$requestBod !== void 0 && _operation$requestBod.description ? operation === null || operation === void 0 ? void 0 : (_operation$requestBod2 = operation.requestBody) === null || _operation$requestBod2 === void 0 ? void 0 : _operation$requestBod2.description : '';
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    let queryParams = {};
    let body = operation !== null && operation !== void 0 && operation.requestBody && operation !== null && operation !== void 0 && operation.requestBody['content'] && operation !== null && operation !== void 0 && operation.requestBody['content']['application/json'] ? operation === null || operation === void 0 ? void 0 : (_operation$requestBod3 = operation.requestBody['content']['application/json']) === null || _operation$requestBod3 === void 0 ? void 0 : _operation$requestBod3.schema['properties'] : {};
    parameters.forEach(parameter => {
      if (parameter.in === 'query') {
        queryParams[parameter.name] = parameter.default;
      } else if (parameter.in === 'header') {
        headers['--header ' + parameter.name] = parameter.default;
      } else if (parameter.in === 'body') {
        body = parameter.schema;
      }
    });
    const curlCommand = "curl --location --request ".concat(method, " \n '").concat(url, "' \n ").concat(JSON.stringify(headers, null, 2), " \n    \n ").concat(body ? "--data-raw  ".concat(JSON.stringify(body, null, 2)) : '');
    return curlCommand;
  };
  const result = "".concat(generateCurl());
  const final = "<div class=\"col-md-12 maxw-100 text-left\"><b>".concat(path, " CuRL Example</b><p>").concat(desc, "</p><div class=\"shadow-sm bg-dark text-light maxw-100 rounded \"><pre class=\"border  text-left\" >").concat(result, "</pre></div></div>");

  //   const parentElement = document.getElementById('apidocpro-rightregion');
  //   const pre = document.createElement('div');
  //   pre.setAttribute('class', 'text-left p-1 mt-5');
  //   pre.setAttribute('id', `apidocpro-rightregion-${id}`);
  //   pre.innerHTML = final;
  //   parentElement?.appendChild(pre);
  return final;
};
exports.curlSnippet = curlSnippet;