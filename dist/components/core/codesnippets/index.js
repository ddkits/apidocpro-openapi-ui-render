function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
import { js_beautify } from 'js-beautify';
function apidocprocodeViewer(json) {
  var collapsible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var TEMPLATES = {
    item: '<div class="json__item"><div class="json__key">%KEY%</div><div class="json__value json__value--%TYPE%">%VALUE%</div></div>',
    itemCollapsible: '<label class="json__item json__item--collapsible"><input type="checkbox" class="json__toggle"/><div class="json__key">%KEY%</div><div class="json__value json__value--type-%TYPE%">%VALUE%</div>%CHILDREN%</label>',
    itemCollapsibleOpen: '<label class="json__item json__item--collapsible"><input type="checkbox" checked class="json__toggle"/><div class="json__key">%KEY%</div><div class="json__value json__value--type-%TYPE%">%VALUE%</div>%CHILDREN%</label>'
  };
  function createItem(key, value, type) {
    var element = TEMPLATES.item.replace('%KEY%', key);
    if (type == 'string') {
      element = element.replace('%VALUE%', '"' + value + '"');
    } else {
      element = element.replace('%VALUE%', value);
    }
    element = element.replace('%TYPE%', type);
    return element;
  }
  function createCollapsibleItem(key, value, type, children) {
    var tpl = 'itemCollapsible';
    if (collapsible) {
      tpl = 'itemCollapsibleOpen';
    }
    var element = TEMPLATES[tpl].replace('%KEY%', key);
    element = element.replace('%VALUE%', type);
    element = element.replace('%TYPE%', type);
    element = element.replace('%CHILDREN%', children);
    return element;
  }
  function handleChildren(key, value, type) {
    var html = '';
    if (key.split('').length < 3) {
      key = '';
    }
    for (var item in value) {
      var _key = item,
        _val = value[item];
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
    if (key === 'example') {
      if (_typeof(value) === 'object') {
        return handleChildren(key, value, type);
      }
      return createItem(key, value, type);
    } else {
      return;
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
function codeFromPath() {
  var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var result;
  var newCodeSnippets = [];
  for (var _i = 0, _Object$entries = Object.entries(json); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      method = _Object$entries$_i[0],
      methodObj = _Object$entries$_i[1];
    var examples = methodObj['x-examples'] || methodObj.examples;
    if (examples) {
      // eslint-disable-next-line no-unused-vars
      for (var _i2 = 0, _Object$entries2 = Object.entries(examples); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          exampleName = _Object$entries2$_i[0],
          exampleObj = _Object$entries2$_i[1];
        var requestBody = exampleObj.requestBody,
          headers = exampleObj.headers,
          query = exampleObj.query;
        var snippet = "".concat(method.toUpperCase(), " ").concat(path, "\n\n").concat(JSON.stringify(requestBody, null, 2), "\n\n").concat(JSON.stringify(headers, null, 2), "\n\n").concat(JSON.stringify(query, null, 2));
        newCodeSnippets.push(js_beautify(snippet));
      }
    }
  }
  result += "<div>\n      ".concat(newCodeSnippets.map(function (snippet) {
    return /*#__PURE__*/React.createElement("pre", {
      key: snippet
    }, snippet);
  }), "\n    </div>");
  return result;
}
function responsesFromPath(method, responses) {
  return /*#__PURE__*/React.createElement("pre", null, JSON.stringify(responses.content, null, 2));
}
export { apidocprocodeViewer, codeFromPath, responsesFromPath };