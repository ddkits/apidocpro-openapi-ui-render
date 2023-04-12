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
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
export default function Header(props) {
  var _theme$styles, _theme$styles2;
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var spectitle = props.spectitle,
    specversion = props.specversion,
    version = props.version,
    specdescription = props.specdescription,
    specType = props.specType,
    specsummary = props.specsummary,
    speccontact = props.speccontact,
    specservers = props.specservers,
    specexternaldocs = props.specexternaldocs,
    theme = props.theme;
  //   const { data, type, contact, spec } = props;

  useEffect(function () {
    setLoading(false);
  }, [props]);
  return loading ? /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-sync fa-spin"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "m-0 p-3 ".concat(theme === null || theme === void 0 ? void 0 : (_theme$styles = theme.styles) === null || _theme$styles === void 0 ? void 0 : _theme$styles.header, " ").concat(theme === null || theme === void 0 ? void 0 : (_theme$styles2 = theme.styles) === null || _theme$styles2 === void 0 ? void 0 : _theme$styles2.headertext)
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-space-between p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-8 content-main"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "h3"
  }, spectitle || '', " ")), /*#__PURE__*/React.createElement("div", {
    className: "col  content-secondary text-end"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge rounded-pill bg-warning text-dark"
  }, "".concat(specType || '', "   ").concat(specversion || '')), /*#__PURE__*/React.createElement("span", {
    className: "badge rounded-pill bg-primary"
  }, version || ''))), /*#__PURE__*/React.createElement("div", {
    className: "row  p-3 small"
  }, specdescription || ''), /*#__PURE__*/React.createElement("div", {
    className: "row  p-3 small"
  }, specsummary || ''), specexternaldocs ? /*#__PURE__*/React.createElement("div", {
    className: " row col "
  }, /*#__PURE__*/React.createElement("a", {
    className: "badge rounded-pill col bg-dark text-light",
    href: specexternaldocs.url,
    key: specexternaldocs.url
  }, specexternaldocs.title || specexternaldocs.name || specexternaldocs.description || "External Link"), speccontact ? Object.keys(speccontact).map(function (key) {
    return /*#__PURE__*/React.createElement("div", {
      className: "badge rounded-pill col bg-dark text-light",
      key: "".concat(key, "-key")
    }, "".concat(key, ":  ").concat(speccontact[key]));
  }) : '') : '', specservers ? /*#__PURE__*/React.createElement("div", {
    className: "row  p-3 small"
  }, /*#__PURE__*/React.createElement("select", {
    value: specservers[0],
    onChange: function onChange(e) {
      return console.log(e.target.value);
    }
  }, specservers.map(function (x) {
    return /*#__PURE__*/React.createElement("option", {
      value: x.url,
      key: x.url
    }, x.url);
  }))) : ''));
}
Header.propTypes = {
  /** specdata props, spec contents/string/object */
  specdata: propTypes.any,
  /** spec summary */
  specsummary: propTypes.string,
  /** spec contact info */
  speccontact: propTypes.any,
  /** spec contact title */
  spectitle: propTypes.string,
  /** spec version info */
  specversion: propTypes.string,
  /** version info */
  version: propTypes.string,
  /** spec description info */
  specdescription: propTypes.string,
  /** spec type info */
  specType: propTypes.string,
  /** spec info */
  spec: propTypes.any,
  /** spec servers array */
  specservers: propTypes.array,
  /** spec externaldocs or links info */
  specexternaldocs: propTypes.any,
  theme: propTypes.object
};