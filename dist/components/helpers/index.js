"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "jsonExample", {
  enumerable: true,
  get: function get() {
    return _examples.jsonExample;
  }
});
exports.jsonViewer = jsonViewer;
exports.loopInNestedObject = void 0;
exports.merge = merge;
exports.requestBodyViewer = requestBodyViewer;
Object.defineProperty(exports, "yamlExample", {
  enumerable: true,
  get: function get() {
    return _examples.yamlExample;
  }
});
exports.yamlToJson = void 0;
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/esnext.string.replace-all.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireDefault(require("react"));
var _jsYaml = _interopRequireDefault(require("js-yaml"));
var _apidocpro = require("../templates/theme/noTheme/apidocpro");
var _Body = _interopRequireDefault(require("../templates/regions/middle/Body"));
var _Header = _interopRequireDefault(require("../templates/regions/middle/Header"));
var _examples = require("./examples");
var _pathsHelper = require("./pathsHelper");
var _resolver = require("./resolver");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * yamlToJson
 * @param {string/object} yamlString
 * @returns
 */
const yamlToJson = yamlString => {
  const obj = _jsYaml.default.load(yamlString);
  return obj;
};
exports.yamlToJson = yamlToJson;
function merge(schema) {
  if (schema !== null && schema !== void 0 && schema.allOf || schema !== null && schema !== void 0 && schema.oneOf) {
    const sch = (schema === null || schema === void 0 ? void 0 : schema.allOf) || (schema === null || schema === void 0 ? void 0 : schema.oneOf);
    // merge all properties
    const properties = sch.reduce((acc, curr) => {
      var _merge;
      const result = (_merge = merge(curr)) === null || _merge === void 0 ? void 0 : _merge.properties;
      return _objectSpread(_objectSpread({}, acc), result);
    });
    return {
      properties
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
const loopInNestedObject = function loopInNestedObject() {
  let json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let collapsible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let theme = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const schemas = json.components;
  const custom = ['tags', 'operationId', 'description', 'summary', 'responses', 'method', 'schema', '[[Prototype]]', ''];
  const TEMPLATESNOW = theme.TEMPLATES ? theme.TEMPLATES : _apidocpro.TEMPLATES;
  function createItem(key, value, type) {
    let element = TEMPLATESNOW.item.replaceAll('%KEY%', (value === null || value === void 0 ? void 0 : value.title) || (value === null || value === void 0 ? void 0 : value.name) || (value === null || value === void 0 ? void 0 : value.summary) || (value === null || value === void 0 ? void 0 : value.description) || key);
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
      value = (0, _resolver.resolveRef)(key, schemas);
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
    var type = typeof value;
    let paths = '',
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
          if (typeof value === 'object') {
            for (var item1 in value) {
              let key1 = item1,
                value1 = value[item1];
              const res = (0, _pathsHelper.loopInNestedObjectPaths)(value1, collapsible, key1, schemas, theme);
              components += "".concat(res);
            }
          }
          return components;
        case 'paths':
          paths = '';
          if (typeof value === 'object') {
            for (var item in value) {
              let key1 = item,
                value1 = value[item];
              const res = (0, _pathsHelper.loopInNestedObjectPaths)(value1, collapsible, key1, schemas, theme);
              paths += "".concat(res);
            }
          }
          return paths;
        default:
          if (key.split('').length < 3) {
            key = '';
          }
          if (typeof value === 'object') {
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
    let result = '<section class="apidocpro">';
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
    }, /*#__PURE__*/_react.default.createElement(_Header.default, {
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
    }), /*#__PURE__*/_react.default.createElement(_Body.default, {
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
exports.loopInNestedObject = loopInNestedObject;
function jsonViewer(json) {
  let collapsible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let theme = arguments.length > 2 ? arguments[2] : undefined;
  const TEMPLATESNOW = theme.JSONTEMPLATES ? theme.JSONTEMPLATES : _apidocpro.JSONTEMPLATES;
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
    var type = typeof value;
    if (key.split('').length < 3) {
      key = '';
    }
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

/**
 * requestBodyViewer
 * @param {spec} json
 * @param {boolean} collapsible
 * @param {object} theme
 * @returns
 */
function requestBodyViewer(json) {
  let collapsible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let theme = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const custom = ['type', '[[Prototype]]', 'tags'];
  const TEMPLATESNOW = theme.REQUESTBODY ? theme.REQUESTBODY : _apidocpro.REQUESTBODY;
  function createItem(key, value, type) {
    let desc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    let html = '';
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