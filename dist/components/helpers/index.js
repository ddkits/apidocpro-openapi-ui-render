function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/**
 * API Doc Pro helpers
 * By Sam Ayoub
 */
import React from 'react';
import yaml from 'js-yaml';
import { TEMPLATES, REQUESTBODY, JSONTEMPLATES } from '../templates/theme/noTheme/apidocpro';
import Body from '../templates/regions/middle/Body';
import Header from '../templates/regions/middle/Header';
import { jsonExample, yamlExample } from './examples';
import { loopInNestedObjectPaths } from './pathsHelper';
import { resolveRef } from './resolver';
/**
 * yamlToJson
 * @param {string/object} yamlString
 * @returns
 */
var yamlToJson = function yamlToJson(yamlString) {
  var obj = yaml.load(yamlString);
  return obj;
};
function merge(schema) {
  if (schema !== null && schema !== void 0 && schema.allOf || schema !== null && schema !== void 0 && schema.oneOf) {
    var sch = (schema === null || schema === void 0 ? void 0 : schema.allOf) || (schema === null || schema === void 0 ? void 0 : schema.oneOf);
    // merge all properties
    var properties = sch.reduce(function (acc, curr) {
      var _merge;
      var result = (_merge = merge(curr)) === null || _merge === void 0 ? void 0 : _merge.properties;
      return _objectSpread(_objectSpread({}, acc), result);
    });
    return {
      properties: properties
    };
  } else {
    return schema;
  }
}

/**
 * loopInNestedObject
 * @param {spec} json
 * @param {boolean} collapsible
 * @param {object} theme
 * @returns
 */
var loopInNestedObject = function loopInNestedObject() {
  var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var collapsible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var theme = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var schemas = json.components;
  var custom = ['tags', 'operationId', 'description', 'summary', 'responses', 'method', 'schema', '[[Prototype]]', ''];
  var TEMPLATESNOW = theme.TEMPLATES ? theme.TEMPLATES : TEMPLATES;
  function createItem(key, value, type) {
    var element = TEMPLATESNOW.item.replaceAll('%KEY%', (value === null || value === void 0 ? void 0 : value.title) || (value === null || value === void 0 ? void 0 : value.name) || (value === null || value === void 0 ? void 0 : value.summary) || (value === null || value === void 0 ? void 0 : value.description) || key);
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
    var _value, _value2, _value3, _value4;
    var tpl = 'itemCollapsible';
    if (key === '$ref') {
      value = resolveRef(key, schemas);
    }
    if (collapsible) {
      tpl = 'itemCollapsibleOpen';
    }
    var element = TEMPLATESNOW[tpl].replaceAll('%KEY%', ((_value = value) === null || _value === void 0 ? void 0 : _value.title) || ((_value2 = value) === null || _value2 === void 0 ? void 0 : _value2.name) || ((_value3 = value) === null || _value3 === void 0 ? void 0 : _value3.summary) || ((_value4 = value) === null || _value4 === void 0 ? void 0 : _value4.description) || key || '');
    element = element.replaceAll('%VALUE%', type).replaceAll('%KEY%', key);
    element = element.replaceAll('%TYPE%', type);
    element = element.replaceAll('%CHILDREN%', children);
    return element;
  }
  function handleChildren(key, value, type) {
    var html = '';
    if (key.split('').length < 3) {
      key = '';
    }
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
    var paths = '',
      components = '';
    if (key == 'info') {
      return {
        title: value['title'] || '',
        version: value['version'] || '',
        contact: value['contact'] || [],
        description: value['description'] || '',
        summary: value['summary'] || '',
        servers: value['servers'] || [],
        license: value['license'] || ''
      };
    } else {
      switch (key) {
        case 'openapi':
        case 'swagger':
        case 'async':
        case 'tags':
          return;
        case 'components':
          components = '';
          if (_typeof(value) === 'object') {
            for (var item1 in value) {
              var key1 = item1,
                value1 = value[item1];
              var res = loopInNestedObjectPaths(value1, collapsible, key1, schemas, theme);
              components += "".concat(res);
            }
          }
          return components;
        case 'paths':
          paths = '';
          if (_typeof(value) === 'object') {
            for (var item in value) {
              var _key2 = item,
                _value5 = value[item];
              var _res = loopInNestedObjectPaths(_value5, collapsible, _key2, schemas, theme);
              paths += "".concat(_res);
            }
          }
          return paths;
        default:
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
    }
  }
  function parseObject(obj) {
    if (obj.length === 0) {
      return;
    }
    var result = '<section class="apidocpro">';
    var title, version, description, contact, servers, license, specType, summary, externalDocs;
    for (var item in obj) {
      var key = item,
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
    return /*#__PURE__*/React.createElement("div", {
      className: "apidocpro-details"
    }, /*#__PURE__*/React.createElement(Header, {
      spectitle: title,
      specversion: version,
      specdescription: description,
      specType: specType,
      speccontact: contact,
      spec: json,
      specservers: servers || [],
      speclicense: license,
      specsummary: summary,
      specexternaldocs: externalDocs || []
    }), /*#__PURE__*/React.createElement(Body, {
      data: result.replaceAll('undefined', ''),
      servers: servers,
      spec: json,
      collapsible: collapsible
    }));
  }
  return parseObject(json);
};

/**
 * jsonViewer
 * @param {spec} json
 * @param {boolean} collapsible
 * @param {object} theme
 * @returns
 */
function jsonViewer(json) {
  var collapsible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var theme = arguments.length > 2 ? arguments[2] : undefined;
  var TEMPLATESNOW = theme.JSONTEMPLATES ? theme.JSONTEMPLATES : JSONTEMPLATES;
  function createItem(key, value, type) {
    if (key.split('').length < 3) {
      key = type.toUpperCase();
    }
    var element = TEMPLATESNOW.item.replaceAll('%KEY%', key);
    if (type == 'string') {
      element = element.replaceAll('%VALUE%', '"' + value + '"');
    } else {
      element = element.replaceAll('%VALUE%', value);
    }
    element = element.replaceAll('%TYPE%', type);
    return element;
  }
  function createCollapsibleItem(key, value, type, children) {
    if (key.split('').length < 3) {
      key = type.toUpperCase();
    }
    var tpl = 'itemCollapsible';
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
    if (key.split('').length < 3) {
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

/**
 * requestBodyViewer
 * @param {spec} json
 * @param {boolean} collapsible
 * @param {object} theme
 * @returns
 */
function requestBodyViewer(json) {
  var collapsible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var theme = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var custom = ['type', '[[Prototype]]', 'tags'];
  var TEMPLATESNOW = theme.REQUESTBODY ? theme.REQUESTBODY : REQUESTBODY;
  function createItem(key, value, type) {
    var desc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var html = '';
    if (key.split('').length < 3) {
      key = '';
    }
    var element = TEMPLATESNOW.item.replaceAll('%KEY%', key);
    if (type === 'string') {
      element = element.replaceAll('%VALUE%', '"' + value + '"');
    } else {
      element = element.replaceAll('%VALUE%', value);
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
    if (key.split('').length < 3) {
      key = '';
    }
    for (var item in value) {
      var _key = item,
        _val = merge(value[item]);
      if (_key.split('').length < 3) {
        _key = '';
      }
      if (_val !== '') {
        html += handleItem(_key, _val);
      }
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
    var _result = '<table class="align-top table table-responsive "><tbody>';
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
    result += "</details>";
    _result += result.replaceAll('%TYPERESULTS%', element);
  });
  return _result;
}
export { yamlToJson, jsonExample, yamlExample, loopInNestedObject, jsonViewer, requestBodyViewer, merge };