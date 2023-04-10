/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable no-unused-vars */
import React from 'react';
import { codeRequestSetup } from '../codeRequestSetup';

/**
 * curlSnippet
 * @param {spec} spec
 * @param {string} path
 * @param {string} method
 * @param {string} type
 * @param {object} theme
 * @returns
 */
export var curlSnippet = function curlSnippet() {
  var spec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'openapi';
  var theme = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var id = '';
  var desc = '';
  var generateCurl = function generateCurl() {
    var _spec$servers$, _operation$requestBod, _operation$requestBod2, _operation$requestBod3;
    if (!method === '') {
      return '';
    }
    id = path.replaceAll(' ', '_').replaceAll('.', '_').replaceAll('{', '_').replaceAll('}', '_').replaceAll('/', '-').replaceAll(',', '_');
    var operation = spec.paths[path][method];
    var url = spec !== null && spec !== void 0 && spec.servers && spec !== null && spec !== void 0 && spec.servers[0] ? (spec === null || spec === void 0 ? void 0 : (_spec$servers$ = spec.servers[0]) === null || _spec$servers$ === void 0 ? void 0 : _spec$servers$.url) + path : 'http://localhost' + path;
    var parameters = operation.parameters ? operation.parameters : [];
    desc = operation !== null && operation !== void 0 && (_operation$requestBod = operation.requestBody) !== null && _operation$requestBod !== void 0 && _operation$requestBod.description ? operation === null || operation === void 0 ? void 0 : (_operation$requestBod2 = operation.requestBody) === null || _operation$requestBod2 === void 0 ? void 0 : _operation$requestBod2.description : '';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    var queryParams = {};
    var body = operation !== null && operation !== void 0 && operation.requestBody && operation !== null && operation !== void 0 && operation.requestBody['content'] && operation !== null && operation !== void 0 && operation.requestBody['content']['application/json'] ? operation === null || operation === void 0 ? void 0 : (_operation$requestBod3 = operation.requestBody['content']['application/json']) === null || _operation$requestBod3 === void 0 ? void 0 : _operation$requestBod3.schema['properties'] : {};
    parameters.forEach(function (parameter) {
      if (parameter.in === 'query') {
        queryParams[parameter.name] = parameter.default;
      } else if (parameter.in === 'header') {
        headers['--header ' + parameter.name] = parameter.default;
      } else if (parameter.in === 'body') {
        body = parameter.schema;
      }
    });
    var curlCommand = "curl --location --request ".concat(method, " \n '").concat(url, "' \n ").concat(JSON.stringify(headers, null, 2), " \n    \n ").concat(body ? "--data-raw  ".concat(JSON.stringify(body, null, 2)) : '');
    return curlCommand;
  };
  if (!method || !path) {
    return '';
  }
  var result;
  switch (type) {
    case 'openapi':
    case 'swagger':
      result = "".concat(generateCurl());
      break;
    case 'asyncapi':
      result = "".concat(codeRequestSetup(spec, theme));
      break;
    default:
      break;
  }
  var final = "<div class=\"col-md-12 maxw-100 text-left\"><b>".concat(path, " CuRL Example</b><p>").concat(desc, "</p><div class=\"shadow-sm bg-dark text-light maxw-100 rounded \"><pre class=\"border  text-left\" >").concat(result, "</pre></div></div>");

  //   const parentElement = document.getElementById('apidocpro-rightregion');
  //   const pre = document.createElement('div');
  //   pre.setAttribute('class', 'text-left p-1 mt-5');
  //   pre.setAttribute('id', `apidocpro-rightregion-${id}`);
  //   pre.innerHTML = final;
  //   parentElement?.appendChild(pre);
  return final;
};