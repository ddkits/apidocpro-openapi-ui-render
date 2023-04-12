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
import { loopInNestedObject } from '../../helpers';
import { loopInNestedAsyncObject } from '../../helpers/async';
export default function MiddleRegion(props) {
  // eslint-disable-next-line react/prop-types
  var data = props.data,
    openCollapse = props.openCollapse,
    theme = props.theme,
    resolved = props.resolved,
    spectype = props.spectype;
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  useEffect(function () {
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
    }, 50);
  }, [openCollapse]);
  useEffect(function () {
    setLoading(false);
  }, []);
  return loading ? /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-sync fa-spin"
  })) : /*#__PURE__*/React.createElement("div", {
    id: "middle-region",
    className: "text-start "
  }, data ? spectype === 'openapi' ? loopInNestedObject(resolved, openCollapse ? openCollapse : false, theme) : loopInNestedAsyncObject(resolved, openCollapse ? openCollapse : false, theme) : /*#__PURE__*/React.createElement("div", {
    className: "alert alert-danger"
  }, "ApiDocPro UI render only support OS 2.x, 3.x and Async 2.x, the spec been passed is none\n          of them, or having syntax's problems"));
}
MiddleRegion.propTypes = {
  data: propTypes.any,
  openCollapse: propTypes.bool,
  theme: propTypes.object,
  resolved: propTypes.any,
  spectype: propTypes.string
};