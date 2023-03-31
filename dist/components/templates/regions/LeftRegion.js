"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LeftRegion;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/esnext.string.replace-all.js");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _leftside = require("../../core/leftside");
var _reactScroll = require("react-scroll");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable no-unused-vars */

// eslint-disable-next-line no-unused-vars
function LeftRegion(props) {
  const {
    data
  } = props;
  const [menuData, setMenuData] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    setMenuData((0, _leftside.createMenuItems)(data));
  }, [data]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: " pt-5 mt-5 sticky-top",
    id: "nav-bar"
  }, /*#__PURE__*/_react.default.createElement("nav", {
    className: "sidenav"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "main-buttons "
  }, Object.keys(menuData).map(key => {
    return /*#__PURE__*/_react.default.createElement("li", {
      key: key
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-circle active-icon",
      id: key,
      title: "".concat(key),
      "data-bs-original-title": "".concat(key)
    }), key, /*#__PURE__*/_react.default.createElement("ul", {
      className: "hidden"
    }, Object.keys(menuData[key]).map((menuItem, xds) => {
      var _menuData$key$menuIte, _menuData$key$menuIte2, _menuData$key$menuIte3;
      const idLabel = ((_menuData$key$menuIte = menuData[key][menuItem]) === null || _menuData$key$menuIte === void 0 ? void 0 : _menuData$key$menuIte.summary) || ((_menuData$key$menuIte2 = menuData[key][menuItem]) === null || _menuData$key$menuIte2 === void 0 ? void 0 : _menuData$key$menuIte2.description) || ((_menuData$key$menuIte3 = menuData[key][menuItem]) === null || _menuData$key$menuIte3 === void 0 ? void 0 : _menuData$key$menuIte3.operationId) || key;
      const href = idLabel.replaceAll(' ', '_').replaceAll('.', '').replaceAll('{', '').replaceAll('}', '');
      return /*#__PURE__*/_react.default.createElement(_reactScroll.Link, {
        activeClass: "active",
        smooth: true,
        spy: true,
        to: "".concat(href),
        key: menuData[key][menuItem] + xds
      }, /*#__PURE__*/_react.default.createElement("li", {
        id: "".concat(href, "-link")
      }, menuData[key][menuItem].method, " - ", menuData[key][menuItem].summary), ' ');
    })));
  }))));
}
LeftRegion.propTypes = {
  data: _propTypes.default.object,
  resolved: _propTypes.default.any,
  theme: _propTypes.default.object
};