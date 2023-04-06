"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonViewerAsync = jsonViewerAsync;
exports.loopInNestedAsyncObject = void 0;
exports.requestBodyViewerAsync = requestBodyViewerAsync;
exports.yamlToJson = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/esnext.string.replace-all.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireDefault(require("react"));
var _jsYaml = _interopRequireDefault(require("js-yaml"));
var _apidocpro = require("../../templates/theme/default/apidocpro");
var _Body = _interopRequireDefault(require("../../templates/regions/middle/Body"));
var _Header = _interopRequireDefault(require("../../templates/regions/middle/Header"));
var _resolver = require("./../resolver");
var _ = require("..");
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
/**
 * API Doc Pro helpers
 * By Sam Ayoub
 */

const yamlToJson = yamlString => {
  const obj = _jsYaml.default.load(yamlString);
  return obj;
};
exports.yamlToJson = yamlToJson;
const loopInNestedAsyncObject = function loopInNestedAsyncObject() {
  let json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let collapsible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let theme = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const schemas = json.components;
  const custom = ['[[Prototype]]', ''];
  const TEMPLATESNOW = theme.TEMPLATESASYNC ? theme.TEMPLATESASYNC : _apidocpro.TEMPLATESASYNC;
  function createItem(key, value, type) {
    if (key.split('').length < 2) {
      key = type.toUpperCase();
    }
    let element = TEMPLATESNOW.item.replaceAll('%KEY%', key);
    if (type == 'string') {
      element = element.replaceAll('%VALUE%', '"' + value + '"').replaceAll('%KEY%', key);
    } else {
      if (value) {
        element = element.replaceAll('%VALUE%', JSON.parse(value)).replaceAll('%KEY%', key);
      } else {
        element = element.replaceAll('%VALUE%', value).replaceAll('%KEY%', key);
      }
    }
    element = element.replaceAll('%TYPE%', type);
    return element;
  }
  function createCollapsibleItem(key, value, type, children) {
    if (key.split('').length < 2) {
      key = type.toUpperCase();
    }
    var tpl = 'itemCollapsible';
    if (key === '$ref') {
      value = (0, _resolver.resolveRef)(key, schemas);
    }
    if (collapsible) {
      tpl = 'itemCollapsibleOpen';
    }
    var element = TEMPLATESNOW[tpl].replaceAll('%KEY%', key);
    element = element.replaceAll('%VALUE%', type).replaceAll('%KEY%', key);
    element = element.replaceAll('%TYPE%', type);
    element = element.replaceAll('%CHILDREN%', children);
    return element;
  }
  function handleChildren(key, value, type) {
    if (key.split('').length < 2) {
      key = type.toUpperCase();
    }
    var html = '';
    for (var item in value) {
      var _key = item,
        _val = (0, _.merge)(value[item]);
      html += handleItem(_key, _val);
    }
    return createCollapsibleItem(key, value, type, html);
  }
  function handleItem(key, value) {
    var type = typeof value;
    if (typeof value === 'object') {
      return handleChildren(key, value, type);
    }
    if (!custom.includes(key)) {
      return createItem(key, value, type);
    } else {
      return;
    }
  }
  function parseObject(obj) {
    if (obj.length === 0) {
      return;
    }
    let result = '<section>';
    let title, version, description, contact, servers, license, specType, summary, externalDocs;
    for (var item in obj) {
      let key = item,
        value = obj[item];
      switch (key) {
        case 'openapi':
          specType = key.toUpperCase();
          break;
        case 'swagger':
          specType = key.toUpperCase();
          break;
        case 'async':
          specType = key.toUpperCase();
          break;
        case 'info':
          title = value['title'];
          version = value['version'];
          description = value['description'];
          summary = value['summary'];
          contact = value['contact'];
          license = value['license'];
          break;
        case 'contact':
          contact = value;
          break;
        case 'servers':
          servers = value;
          break;
        case 'externalDocs':
          externalDocs = value;
          break;
        default:
          if (!custom.includes(key)) {
            result += handleItem(key, value);
          }
          break;
      }
    }
    result += '</section>';
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "apidocpro-details"
    }, /*#__PURE__*/_react.default.createElement(_Body.default, {
      data: result,
      servers: servers,
      spec: json,
      collapsible: collapsible
    }));
  }
  return parseObject(json);
};
exports.loopInNestedAsyncObject = loopInNestedAsyncObject;
function jsonViewerAsync(json) {
  let collapsible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let theme = arguments.length > 2 ? arguments[2] : undefined;
  const TEMPLATESNOW = theme.JSONTEMPLATES ? theme.JSONTEMPLATES : _apidocpro.JSONTEMPLATES;
  function createItem(key, value, type) {
    var element = TEMPLATESNOW.item.replaceAll('%KEY%', key);
    if (key.split('').length < 2) {
      key = type.toUpperCase();
    }
    if (type == 'string') {
      element = element.replaceAll('%VALUE%', '"' + value + '"');
    } else {
      element = element.replaceAll('%VALUE%', value);
    }
    element = element.replaceAll('%TYPE%', type);
    return element;
  }
  function createCollapsibleItem(key, value, type, children) {
    var tpl = 'itemCollapsible';
    if (key.split('').length < 2) {
      key = type.toUpperCase();
    }
    if (collapsible) {
      tpl = 'itemCollapsibleOpen';
    }
    var element = TEMPLATESNOW[tpl].replaceAll('%KEY%', key);
    element = element.replaceAll('%VALUE%', type);
    element = element.replaceAll('%TYPE%', type);
    element = element.replaceAll('%CHILDREN%', children);
    return element;
  }
  function handleChildren(key, value, type) {
    var html = '';
    if (key.split('').length < 2) {
      key = type.toUpperCase();
    }
    for (var item in value) {
      var _key = item,
        _val = (0, _.merge)(value[item]);
      html += handleItem(_key, _val);
    }
    return createCollapsibleItem(key, value, type, html);
  }
  function handleItem(key, value) {
    var type = typeof value;
    if (typeof value === 'object') {
      return handleChildren(key, value, type);
    } else if (typeof value === 'string') {
      return createItem(key, value, type);
    }
  }
  function parseObject(obj) {
    let _result = '<div class="json">';
    for (var item in obj) {
      var key = item,
        value = obj[item];
      _result += handleItem(key, value);
    }
    _result += '</div>';
    return _result;
  }
  return parseObject(json);
}
function requestBodyViewerAsync(json) {
  let collapsible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let theme = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const custom = ['type', '[[Prototype]]', 'tags'];
  const TEMPLATESNOW = theme.REQUESTBODY ? theme.REQUESTBODY : _apidocpro.REQUESTBODY;
  function createItem(key, value, type) {
    let desc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    let html = '';
    if (key !== '') {
      var element = TEMPLATESNOW.item.replaceAll('%KEY%', key);
      if (type === 'string') {
        element = element.replaceAll('%VALUE%', '"' + value + '"');
      } else {
        element = element.replaceAll('%VALUE%', value);
      }
      element = element.replaceAll('%TYPE%', type);
      element = element.replaceAll('%DESC%', desc);
      html += element;
    }
    return html;
  }
  function createCollapsibleItem(key, value, type, children) {
    let desc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
    var tpl = 'itemCollapsible';
    if (collapsible) {
      tpl = 'itemCollapsibleOpen';
    }
    var element = TEMPLATESNOW[tpl].replaceAll('%KEY%', key).replaceAll('%DESC%', desc);
    element = element.replaceAll('%VALUE%', type);
    element = element.replaceAll('%TYPE%', type);
    element = element.replaceAll('%CHILDREN%', children);
    return element;
  }
  function handleChildren(key, value, type) {
    var html = '';
    var result = '';
    for (var item in value) {
      var _key = item,
        _val = (0, _.merge)(value[item]);
      html += handleItem(_key, _val);
    }
    result += createCollapsibleItem(key, value, type, html);
    return result;
  }
  function handleItem(key, value) {
    let _result = '';
    var type = typeof value;
    let desc = value['description'] || value['summary'] || '';
    if (type === 'object') {
      _result += handleChildren(key, value, type, desc);
    } else if (type === 'string') {
      _result += createItem(key, value, type, desc);
    }
    return _result;
  }
  function parseObject(obj) {
    let _result = '<table class="align-top table table-responsive "><tbody>';
    for (var item in obj) {
      var key = item,
        value = obj[item];
      let desc = value['description'] ? value['description'] : value['summary'] ? value['summary'] : '';
      _result += handleItem(key, value, desc);
    }
    _result += '</tbody></table>';
    return _result;
  }
  let _result = '';
  Object.keys(JSON.parse(JSON.stringify(json, 'utf8'))).forEach((type, xds) => {
    let result = "<details class=\"treeview ".concat(xds, "\" ").concat(collapsible ? 'open' : '', "><summary>").concat(type, "  %TYPERESULTS%</summary>");
    let element = '';
    Object.keys(json[type]).forEach((schema, xds2) => {
      var _json$type, _json$type2;
      result += "<details class=\"p-3 ".concat(xds, " ").concat(xds2, "\" ").concat(collapsible ? 'open' : '', "><summary>").concat(schema, "</summary><p>").concat((_json$type = json[type]) !== null && _json$type !== void 0 && _json$type.description ? (_json$type2 = json[type]) === null || _json$type2 === void 0 ? void 0 : _json$type2.description : '', "</p>");
      Object.keys(json[type][schema]).forEach((key, xds3) => {
        if (!custom.includes(key)) {
          var _json$type$schema$key, _json$type$schema$key2;
          result += "<details class=\"p-3 ".concat(xds, " ").concat(xds2, " ").concat(xds3, "\" ").concat(collapsible ? 'open' : '', "><summary>").concat(key, "</summary><p>").concat((_json$type$schema$key = json[type][schema][key]) !== null && _json$type$schema$key !== void 0 && _json$type$schema$key.description ? (_json$type$schema$key2 = json[type][schema][key]) === null || _json$type$schema$key2 === void 0 ? void 0 : _json$type$schema$key2.description : '', "</p>").concat(parseObject(json[type][schema][key]), " </details>");
        } else {
          element = JSON.stringify(json[type][schema][key]);
        }
      });
      result += "</details>";
    });
    result += "</details>";
    _result += result.replaceAll('%TYPERESULTS%', element);
  });
  return _result;
}