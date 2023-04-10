function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable no-unused-vars */
var groupedMenu = function groupedMenu() {
  var dataNow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var newMenuData = [];
  Object.keys(dataNow).forEach(function (x, value) {
    var element = dataNow[x];
    var key = element.tag || element.tags[0] || 'other';
    var index = newMenuData.findIndex(function (x) {
      return x.summary === dataNow[x].summary && x.method === dataNow[x].method;
    });
    if (!newMenuData[key]) {
      newMenuData[key] = [element];
    } else if (index === -1) {
      newMenuData[key].push(element);
    }
  });
  return newMenuData;
};
var createMenuItems = function createMenuItems(data) {
  var parsedSpec = data;
  if (parsedSpec.paths) {
    var newMenuData = [];
    for (var _i = 0, _Object$entries = Object.entries(parsedSpec.paths); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        path = _Object$entries$_i[0],
        pathObj = _Object$entries$_i[1];
      var menuItem = {
        tag: '',
        path: path,
        method: '',
        tags: [],
        summary: '',
        description: '',
        item: {}
      };
      // eslint-disable-next-line no-unused-vars
      for (var _i2 = 0, _Object$entries2 = Object.entries(pathObj); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          method = _Object$entries2$_i[0],
          methodObj = _Object$entries2$_i[1];
        menuItem.method = method.toUpperCase();
        menuItem.tags.push(method.toUpperCase());
        menuItem.tag = methodObj.tags && methodObj.tags[0] ? methodObj.tags[0] : 'Other';
        menuItem.summary = methodObj.summary ? methodObj.summary : path;
        menuItem.description = methodObj.description ? methodObj.description : 'N/A';
        menuItem.item = methodObj;
      }
      newMenuData.push(menuItem);
    }
    return groupedMenu(newMenuData.filter(function (x) {
      return x;
    }));
  }
};
export { createMenuItems };