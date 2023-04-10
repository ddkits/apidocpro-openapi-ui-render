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
// import { responsesFromPath } from '../core/codesnippets';
import React from 'react';
import { merge } from '.';
import { methodRequestBody } from '../core/codesnippets/methodRequestBody';
import { methodResponses } from '../core/codesnippets/methodResponses';
import { PATHS, TABS } from '../templates/theme/noTheme/apidocpro';
import { parametersTable } from './assets/parameters';
import { resolveRef } from './resolver';

/* eslint-disable no-unused-vars */

var loopInNestedObjectPaths = function loopInNestedObjectPaths() {
  var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var collapsible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var mainKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var schemas = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var theme = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var custom = ['tags', 'components', 'description', 'summary', 'methods', 'method', 'parameters', 'responses', 'requestBody', 'paths', 'x-examples', 'examples', 'security', 'method', 'operationId'];
  var PATHSNOW = theme.PATHS ? theme.PATHS : PATHS;
  var TABSNOW = theme.TABS ? theme.TABS : TABS;
  function createItem(key, value, type) {
    if (value !== '') {
      var element = PATHSNOW.item.replaceAll('%KEY%', key);
      if (key === '$ref') {
        value = resolveRef(value, schemas);
      }
      if (type == 'string') {
        element = element.replaceAll('%VALUE%', '"' + value + '"').replaceAll('%KEY%', key);
      } else {
        element = element.replaceAll('%VALUE%', value).replaceAll('%KEY%', key);
      }
      element = element.replaceAll('%TYPE%', type.toUpperCase()).replaceAll('%KEY%', key);
      if (!custom.includes(key)) {
        return element;
      }
    } else {
      return '';
    }
  }
  function createCollapsibleItem(key, value, type, children) {
    var tpl = 'itemCollapsible';
    if (!custom.includes(key)) {
      tpl = 'itemCollapsibleOpen';
    } else if (collapsible) {
      tpl = 'itemCollapsibleOpen';
    }
    var element = PATHS[tpl].replaceAll('%KEY%', (value === null || value === void 0 ? void 0 : value.title) || (value === null || value === void 0 ? void 0 : value.name) || (value === null || value === void 0 ? void 0 : value.summary) || (value === null || value === void 0 ? void 0 : value.description) || key || 'unknown');
    element = element.replaceAll('%VALUE%', type.toUpperCase()).replaceAll('%KEY%', key);
    element = element.replaceAll('%TYPE%', type.toUpperCase()).replaceAll('%KEY%', key);
    element = element.replaceAll('%CHILDREN%', children);
    return element;
  }
  var handleChildren = function handleChildren(key, value, type) {
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
      if (_key == 'parameters') {
        var res = parametersTable(_val);
        html += "<hr><h4 class=\"p-3\">Parameters</h4>".concat(res);
      } else if (_key === 'responses') {
        var _res = methodResponses(_val, theme, schemas, key + Math.random());
        html += "<hr><h4 class=\"p-3\">Responses</h4>".concat(_res);
      } else if (_key === 'requestBody') {
        var _res2 = methodRequestBody(_val, mainKey, '', '', '', _key);
        html += "<hr><h4 class=\"p-3\">Request body</h4>".concat(_res2);
      } else if (!custom.includes(_key)) {
        html += handleItem(_key, _val);
      } else {
        continue;
      }
    }
    return createCollapsibleItem(key, value, type, html.replaceAll(' , ', ''));
  };
  function handleItem(key, value) {
    var type = _typeof(value);
    if (_typeof(value) === 'object') {
      return handleChildren(key, value, type);
    } else if (!custom.includes(key)) {
      return createItem(key, value, type);
    } else {
      return '';
    }
  }
  function parseObject(obj) {
    var opIdKeyBefore = Math.random();
    var opIdKey = 0 + opIdKeyBefore;
    var idLabel = obj ? obj !== null && obj !== void 0 && obj.summary ? obj === null || obj === void 0 ? void 0 : obj.summary : obj !== null && obj !== void 0 && obj.description ? obj === null || obj === void 0 ? void 0 : obj.description : obj !== null && obj !== void 0 && obj.operationId ? obj === null || obj === void 0 ? void 0 : obj.operationId : mainKey : opIdKey;
    var href = idLabel.replaceAll(' ', '_').replaceAll('.', '').replaceAll('{', '').replaceAll('}', '').replaceAll('/', '_');
    var _result = "<section class=\"container-fluid border p-3\" id=\"".concat(href, "\"><details ").concat(collapsible && collapsible ? 'open' : '', "><summary>\n    <b class=\"apidocpro-").concat(mainKey.replaceAll('/', '-'), "-parent\">").concat(mainKey, "</b>\n    <span class=\"pull right\">").concat(obj['summary'] ? obj['summary'] : '', "</span>\n    </summary>\n    <span class=\"apidocpro-").concat(mainKey.replaceAll('/', '-'), "-parent-description\">").concat(obj['description'] ? obj['description'] : '', "</span>\n    <div class=\"container-fluid\">\n    ").concat(TABSNOW.tabsStart.replaceAll('%TABSID%', 'nav-tab'), "\n ");
    var activeTab = 'show active';
    // Create tabs
    Object.keys(obj).map(function (item) {
      var key = item,
        value = obj[item];
      if (custom.includes(key)) {
        return '';
      }
      var idLabel = (value === null || value === void 0 ? void 0 : value.summary) || (value === null || value === void 0 ? void 0 : value.description) || (value === null || value === void 0 ? void 0 : value.operationId) || item + opIdKey || opIdKey;
      var href = idLabel.replaceAll(' ', '_').replaceAll('.', '').replaceAll('{', '').replaceAll('}', '').replaceAll(',', '');
      _result += TABSNOW.tabLink.replaceAll('%TABID%', href).replaceAll('%ACTIVE%', activeTab).replaceAll('%TABLABEL%', key.toUpperCase().replaceAll(' , ', '').replaceAll('\n,\n', ''));
      activeTab = '';
      opIdKey++;
    });
    _result += TABSNOW.tabsLinksEnd;
    var active = 'show active';
    opIdKey = 0 + opIdKeyBefore;
    Object.keys(obj).map(function (item) {
      var _obj$item;
      var key1 = item,
        value1 = obj[item];
      var responses;
      var idLabel = (value1 === null || value1 === void 0 ? void 0 : value1.summary) || (value1 === null || value1 === void 0 ? void 0 : value1.description) || (value1 === null || value1 === void 0 ? void 0 : value1.operationId) || item + opIdKey || opIdKey;
      var href = idLabel.replaceAll(' ', '_').replaceAll('.', '').replaceAll('{', '').replaceAll('}', '').replaceAll(',', '');
      if (custom.includes(key1) || value1.length === 0) {
        return '';
      }
      if (!custom.includes(key1)) {
        responses = handleItem(key1, value1);
      }
      var content = " <div >\n    <div  class=\"bold apidocpro__method--".concat(item, "\">").concat(item, "\n    </div><b>Summary</b> ").concat(obj[item].summary || '', "\n    <div class=\"bold smaller \" >").concat(((_obj$item = obj[item]) === null || _obj$item === void 0 ? void 0 : _obj$item.description) || '', "\n    ").concat(responses ? responses : '', "\n    </div></div  class=\" shadow-sm p-3 mb-1 col-md-12 pt-3 rounded \">");
      _result += TABSNOW.tabContent.replaceAll('%TABID%', href).replaceAll('%ACTIVE%', active).replaceAll('%TABCONTENT%', content.replaceAll(' , ', '').replaceAll('\n,\n', ''));
      active = '';
      opIdKey++;
    });
    _result += TABSNOW.tabsEnd;
    _result += '</div></div></details></section>';
    return _result;
  }
  return parseObject(json);
};
export { loopInNestedObjectPaths };