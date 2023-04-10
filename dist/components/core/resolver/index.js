function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
function resolveRefs(document) {
  var regex = /^#\/([a-zA-Z0-9-_/]+)$/;
  var resolveRef = function resolveRef(obj, ref) {
    var match = ref.match(regex);
    if (match) {
      var parts = match[1].split('/');
      var value = obj;
      var _iterator = _createForOfIteratorHelper(parts),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var part = _step.value;
          value = value[part];
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return value;
    }
    return undefined;
  };
  var resolve = function resolve(obj) {
    if (_typeof(obj) === 'object' && obj !== null) {
      if ('$ref' in obj) {
        var refValue = resolveRef(document, obj['$ref']);
        if (refValue !== undefined) {
          return resolve(refValue);
        }
      } else {
        for (var key in obj) {
          obj[key] = resolve(obj[key]);
        }
      }
    }
    return obj;
  };
  return resolve(document);
}
var removeProptype = function removeProptype(json) {
  var jsonStr = JSON.stringify(json);
  var jsonObj = JSON.parse(jsonStr);
  var newObj = {};
  for (var prop in jsonObj) {
    // eslint-disable-next-line no-prototype-builtins
    if (jsonObj.hasOwnProperty(prop) && prop !== '__proto__') {
      newObj[prop] = jsonObj[prop];
    }
  }
  var newJsonStr = JSON.parse(JSON.stringify(newObj));
  return newJsonStr;
};
export { resolveRefs, removeProptype };