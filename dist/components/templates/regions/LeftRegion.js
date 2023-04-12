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
import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { createAsyncMenuItems, createMenuItems } from '../../core/leftside';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

// eslint-disable-next-line no-unused-vars
export default function LeftRegion(props) {
  var _theme$styles, _theme$styles2;
  var data = props.data,
    spectype = props.spectype,
    theme = props.theme;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    menuData = _useState2[0],
    setMenuData = _useState2[1];
  useEffect(function () {
    if (data && spectype !== 'asyncapi') {
      var final = createMenuItems(data);
      setMenuData(final);
    } else {
      setMenuData([]);
    }
    // else {
    //   if (data && spectype !== 'asyncapi') {
    //     const final = createAsyncMenuItems(data);
    //     setMenuData(final);
    //   }
    // }
  }, [data]);
  return /*#__PURE__*/React.createElement("div", {
    className: " pt-5 mt-5",
    id: "nav-bar"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "sidenav ".concat(theme === null || theme === void 0 ? void 0 : (_theme$styles = theme.styles) === null || _theme$styles === void 0 ? void 0 : _theme$styles.apinav, " ").concat(theme === null || theme === void 0 ? void 0 : (_theme$styles2 = theme.styles) === null || _theme$styles2 === void 0 ? void 0 : _theme$styles2.apinavtext)
  }, /*#__PURE__*/React.createElement("ul", {
    className: "main-buttons "
  }, menuData && Object.keys(menuData).map(function (key) {
    var _theme$styles3, _theme$styles4, _theme$styles5;
    return /*#__PURE__*/React.createElement("li", {
      key: key
    }, theme !== null && theme !== void 0 && (_theme$styles3 = theme.styles) !== null && _theme$styles3 !== void 0 && _theme$styles3.icon ? /*#__PURE__*/React.createElement("i", {
      className: "fa fa-circle active-icon",
      id: key,
      title: "".concat(key),
      "data-bs-original-title": "".concat(key)
    }) : '', key, /*#__PURE__*/React.createElement("ul", {
      className: "hidden ".concat(theme === null || theme === void 0 ? void 0 : (_theme$styles4 = theme.styles) === null || _theme$styles4 === void 0 ? void 0 : _theme$styles4.apinavsmc, " ").concat(theme === null || theme === void 0 ? void 0 : (_theme$styles5 = theme.styles) === null || _theme$styles5 === void 0 ? void 0 : _theme$styles5.apinavsmctext)
    }, Object.keys(menuData[key]).map(function (menuItem, xds) {
      var _menuData$key$menuIte, _menuData$key$menuIte2, _menuData$key$menuIte3, _theme$styles6, _theme$styles7;
      var idLabel = ((_menuData$key$menuIte = menuData[key][menuItem]) === null || _menuData$key$menuIte === void 0 ? void 0 : _menuData$key$menuIte.summary) || ((_menuData$key$menuIte2 = menuData[key][menuItem]) === null || _menuData$key$menuIte2 === void 0 ? void 0 : _menuData$key$menuIte2.description) || ((_menuData$key$menuIte3 = menuData[key][menuItem]) === null || _menuData$key$menuIte3 === void 0 ? void 0 : _menuData$key$menuIte3.operationId) || key;
      var href = idLabel.replaceAll(' ', '_').replaceAll('.', '').replaceAll('{', '').replaceAll('}', '').replaceAll('/', '_');
      return /*#__PURE__*/React.createElement(Link, {
        activeClass: "active",
        className: "".concat(theme === null || theme === void 0 ? void 0 : (_theme$styles6 = theme.styles) === null || _theme$styles6 === void 0 ? void 0 : _theme$styles6.apinavsmc, " ").concat(theme === null || theme === void 0 ? void 0 : (_theme$styles7 = theme.styles) === null || _theme$styles7 === void 0 ? void 0 : _theme$styles7.apinavsmctext),
        smooth: true,
        spy: true,
        to: "".concat(href),
        key: menuData[key][menuItem] + xds
      }, /*#__PURE__*/React.createElement("li", {
        id: "".concat(href, "-link")
      }, menuData[key][menuItem].method, " - ", menuData[key][menuItem].summary), ' ');
    })));
  }))));
}
LeftRegion.propTypes = {
  data: propTypes.any,
  spectype: propTypes.string,
  resolved: propTypes.any,
  theme: propTypes.object
};