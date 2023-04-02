"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Header;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.description.js");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function Header(props) {
  const [loading, setLoading] = (0, _react.useState)(true);
  const {
    spectitle,
    specversion,
    specdescription,
    specType,
    specsummary,
    speccontact,
    specservers,
    specexternaldocs
  } = props;
  //   const { data, type, contact, spec } = props;

  (0, _react.useEffect)(() => {
    setLoading(false);
  }, [props]);
  return loading ? /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa-solid fa-sync fa-spin"
  })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "m-0 p-3 bg-light text-dark"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex justify-space-between p-3"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-8 content-main"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "h3"
  }, spectitle || '', " ")), /*#__PURE__*/_react.default.createElement("div", {
    className: "col  content-secondary text-end"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "badge rounded-pill bg-warning text-dark"
  }, specType || ''), /*#__PURE__*/_react.default.createElement("span", {
    className: "badge rounded-pill bg-primary"
  }, specversion || ''))), /*#__PURE__*/_react.default.createElement("div", {
    className: "row  p-3 small"
  }, specdescription || ''), /*#__PURE__*/_react.default.createElement("div", {
    className: "row  p-3 small"
  }, specsummary || ''), specexternaldocs ? /*#__PURE__*/_react.default.createElement("div", {
    className: " row col "
  }, /*#__PURE__*/_react.default.createElement("a", {
    className: "badge rounded-pill col bg-dark text-light",
    href: specexternaldocs.url,
    key: specexternaldocs.url
  }, specexternaldocs.title || specexternaldocs.name || specexternaldocs.description || "External Link"), speccontact ? Object.keys(speccontact).map(key => /*#__PURE__*/_react.default.createElement("div", {
    className: "badge rounded-pill col bg-dark text-light",
    key: "".concat(key, "-key")
  }, "".concat(key, ":  ").concat(speccontact[key]))) : '') : '', specservers ? /*#__PURE__*/_react.default.createElement("div", {
    className: "row  p-3 small"
  }, /*#__PURE__*/_react.default.createElement("select", {
    value: specservers[0],
    onChange: e => console.log(e.target.value)
  }, specservers.map(x => /*#__PURE__*/_react.default.createElement("option", {
    value: x.url,
    key: x.url
  }, x.url)))) : ''));
}
Header.propTypes = {
  specdata: _propTypes.default.any,
  specsummary: _propTypes.default.string,
  speccontact: _propTypes.default.any,
  spectitle: _propTypes.default.string,
  specversion: _propTypes.default.string,
  specdescription: _propTypes.default.string,
  specType: _propTypes.default.string,
  spec: _propTypes.default.any,
  specservers: _propTypes.default.array,
  specexternaldocs: _propTypes.default.any
};