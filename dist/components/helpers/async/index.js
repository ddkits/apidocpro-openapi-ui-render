function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
import React from 'react';
import yaml from 'js-yaml';
import { TEMPLATESASYNC, REQUESTBODY, JSONTEMPLATES } from '../../theme/noTheme/apidocpro';
import Body from '../../templates/regions/middle/Body';
import Header from '../../templates/regions/middle/Header';
import { resolveRef } from './../resolver';
import { merge } from '..';
var yamlToJson = function yamlToJson(yamlString) {
  var obj = yaml.load(yamlString);
  return obj;
};
var loopInNestedAsyncObject = function loopInNestedAsyncObject() {
  var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var collapsible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var theme = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var schemas = json.components;
  var custom = ['[[Prototype]]', 'defaultContentType'];
  var TEMPLATESNOW = theme.TEMPLATESASYNC ? theme.TEMPLATESASYNC : TEMPLATESASYNC;
  function createItem(key, value, type) {
    if (key.split('').length < 2) {
      key = '';
    }
    var element = TEMPLATESNOW.item.replaceAll('%KEY%', key);
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
    var tpl = 'itemCollapsible';
    if (key === '$ref') {
      value = resolveRef(key, schemas);
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
      key = '';
    }
    var html = '';
    for (var item in value) {
      var _key = item,
        _val = merge(value[item]);
      if (_key.split('').length < 3) {
        _key = '';
      }
      html += handleItem(_key, _val);
    }
    return createCollapsibleItem(key, value, type, html);
  }
  function handleItem(key, value) {
    var type = _typeof(value);
    if (key.split('').length < 3) {
      key = '';
    }
    if (_typeof(value) === 'object') {
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
    var result = '<section >';
    var title,
      version,
      description,
      contact,
      servers,
      license,
      specType,
      summary,
      externalDocs,
      specVersion,
      serversNow = [];
    for (var item in obj) {
      var key = item,
        value = obj[item];
      switch (key) {
        case 'openapi':
          specType = key.toUpperCase();
          specVersion = value;
          break;
        case 'swagger':
          specType = key.toUpperCase();
          specVersion = value;
          break;
        case 'asyncapi':
          specType = key.toUpperCase();
          specVersion = value;
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
    return /*#__PURE__*/React.createElement("div", {
      className: "apidocpro-details"
    }, /*#__PURE__*/React.createElement(Header, {
      spectitle: title,
      specversion: specVersion,
      version: version,
      specdescription: description,
      specType: specType,
      speccontact: contact,
      spec: json,
      specservers: [],
      speclicense: license,
      specsummary: summary,
      specexternaldocs: externalDocs || [],
      theme: theme
    }), /*#__PURE__*/React.createElement(Body, {
      data: result.replaceAll('undefined', ''),
      servers: servers,
      spec: json,
      theme: theme,
      collapsible: collapsible
    }));
  }
  return parseObject(json);
};
function jsonViewerAsync(json) {
  var collapsible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var theme = arguments.length > 2 ? arguments[2] : undefined;
  var TEMPLATESNOW = theme !== null && theme !== void 0 && theme.JSONTEMPLATES ? theme === null || theme === void 0 ? void 0 : theme.JSONTEMPLATES : JSONTEMPLATES;
  function createItem(key, value, type) {
    var element = TEMPLATESNOW.item;
    if (type == 'string') {
      element = element.replace('%VALUE%', '"' + value + '"').replace('%KEY%', "".concat(key, ": "));
    } else {
      element = element.replace('%VALUE%', value).replace('%KEY%', key);
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
        _val = merge(value[item]);
      html += handleItem(_key, _val);
    }
    return createCollapsibleItem(key, value, type, html);
  }
  function handleItem(key, value) {
    var type = _typeof(value);
    if (key.split('').length < 3) {
      key = '';
    }
    if (_typeof(value) === 'object') {
      return handleChildren(key, value, type);
    } else if (typeof value === 'string') {
      return createItem(key, value, type);
    }
  }
  function parseObject(obj) {
    var _result = '<div class="json">';
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
  var collapsible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var theme = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var custom = ['type', '[[Prototype]]', 'tags'];
  var TEMPLATESNOW = theme.REQUESTBODY ? theme.REQUESTBODY : REQUESTBODY;
  function createItem(key, value, type) {
    var desc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var html = '';
    var element = TEMPLATESNOW.item;
    if (type == 'string') {
      element = element.replace('%VALUE%', '"' + value + '"').replace('%KEY%', "".concat(key, ": "));
    } else {
      element = element.replace('%VALUE%', value).replace('%KEY%', key);
    }
    element = element.replaceAll('%TYPE%', type);
    element = element.replaceAll('%DESC%', desc);
    html += element;
    return html;
  }
  function createCollapsibleItem(key, value, type, children) {
    var desc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
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
        _val = merge(value[item]);
      html += handleItem(_key, _val);
    }
    result += createCollapsibleItem(key, value, type, html);
    return result;
  }
  function handleItem(key, value) {
    var _result = '';
    var type = _typeof(value);
    var desc = value['description'] || value['summary'] || '';
    if (type === 'object') {
      _result += handleChildren(key, value, type, desc);
    } else if (type === 'string') {
      _result += createItem(key, value, type, desc);
    }
    return _result;
  }
  function parseObject(obj) {
    var idLabel = obj ? obj !== null && obj !== void 0 && obj.summary ? obj === null || obj === void 0 ? void 0 : obj.summary : obj !== null && obj !== void 0 && obj.description ? obj === null || obj === void 0 ? void 0 : obj.description : obj !== null && obj !== void 0 && obj.operationId ? obj === null || obj === void 0 ? void 0 : obj.operationId : Math.random() : Math.random();
    var href = idLabel.replaceAll(' ', '_').replaceAll('.', '').replaceAll('{', '').replaceAll('}', '').replaceAll('/', '_');
    var _result = "<section class=\"container-fluid border p-3\" id=\"".concat(href, "\">");
    for (var item in obj) {
      var key = item,
        value = obj[item];
      var desc = value['description'] ? value['description'] : value['summary'] ? value['summary'] : '';
      _result += handleItem(key, value, desc);
    }
    _result += '</tbody></table>';
    return _result;
  }
  var _result = '';
  Object.keys(JSON.parse(JSON.stringify(json, 'utf8'))).forEach(function (type, xds) {
    var result = "<details class=\"treeview ".concat(xds, "\" ").concat(collapsible ? 'open' : '', "><summary>").concat(type, "  %TYPERESULTS%</summary>");
    var element = '';
    Object.keys(json[type]).forEach(function (schema, xds2) {
      var _json$type, _json$type2;
      result += "<details class=\"p-3 ".concat(xds, " ").concat(xds2, "\" ").concat(collapsible ? 'open' : '', "><summary>").concat(schema, "</summary><p>").concat((_json$type = json[type]) !== null && _json$type !== void 0 && _json$type.description ? (_json$type2 = json[type]) === null || _json$type2 === void 0 ? void 0 : _json$type2.description : '', "</p>");
      Object.keys(json[type][schema]).forEach(function (key, xds3) {
        if (!custom.includes(key)) {
          var _json$type$schema$key, _json$type$schema$key2;
          result += "<details class=\"p-3 ".concat(xds, " ").concat(xds2, " ").concat(xds3, "\" ").concat(collapsible ? 'open' : '', "><summary>").concat(key, "</summary><p>").concat((_json$type$schema$key = json[type][schema][key]) !== null && _json$type$schema$key !== void 0 && _json$type$schema$key.description ? (_json$type$schema$key2 = json[type][schema][key]) === null || _json$type$schema$key2 === void 0 ? void 0 : _json$type$schema$key2.description : '', "</p>").concat(parseObject(json[type][schema][key]), " </details>");
        } else {
          element = JSON.stringify(json[type][schema][key]);
        }
      });
      result += "</details>";
    });
    result += "</details></section>";
    _result += result.replaceAll('%TYPERESULTS%', element);
  });
  return _result;
}
export { yamlToJson, loopInNestedAsyncObject, jsonViewerAsync, requestBodyViewerAsync };