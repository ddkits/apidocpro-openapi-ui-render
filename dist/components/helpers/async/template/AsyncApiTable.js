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
import { loopInNestedAsyncObject } from '..';
import Header from '../../../templates/regions/middle/Header';
import propTypes from 'prop-types';
import Body from '../../../templates/regions/middle/Body';
export default function AsyncApiTable(props) {
  var data = props.data,
    collapsible = props.collapsible,
    theme = props.theme;
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    spec = _useState2[0],
    setSpec = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    channels = _useState4[0],
    setchannels = _useState4[1];
  var _useState5 = useState([]),
    _useState6 = _slicedToArray(_useState5, 2),
    components = _useState6[0],
    setcomponents = _useState6[1];
  var _useState7 = useState([]),
    _useState8 = _slicedToArray(_useState7, 2),
    servers = _useState8[0],
    setservers = _useState8[1];
  var _useState9 = useState([]),
    _useState10 = _slicedToArray(_useState9, 2),
    info = _useState10[0],
    setinfo = _useState10[1];
  var _useState11 = useState(''),
    _useState12 = _slicedToArray(_useState11, 2),
    final = _useState12[0],
    setfinal = _useState12[1];
  var prepareBody = function prepareBody() {
    var _final = '';
    _final += /*#__PURE__*/React.createElement("details", {
      className: "p-2"
    }, /*#__PURE__*/React.createElement("summary", null, "Servers"), /*#__PURE__*/React.createElement("div", {
      className: "apidocpro-async-body"
    }, loopInNestedAsyncObject(servers, false)));
    _final += /*#__PURE__*/React.createElement("details", {
      className: "p-2"
    }, /*#__PURE__*/React.createElement("summary", null, "Channels"), /*#__PURE__*/React.createElement("div", {
      className: "apidocpro-async-body"
    }));
    _final += /*#__PURE__*/React.createElement("details", {
      className: "p-2"
    }, /*#__PURE__*/React.createElement("summary", null, "Components"), /*#__PURE__*/React.createElement("div", {
      className: "apidocpro-async-body"
    }, /*#__PURE__*/React.createElement("ul", null, components.schemas && Object.entries(components.schemas).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        schema = _ref2[1];
      return /*#__PURE__*/React.createElement("li", {
        key: name
      }, /*#__PURE__*/React.createElement("strong", null, name), /*#__PURE__*/React.createElement("pre", null, JSON.stringify(schema, null, 2)));
    }))));
    setfinal(loopInNestedAsyncObject(data, collapsible, theme));
  };
  useEffect(function () {
    setchannels(data['channels'] || data.channels || []);
    setcomponents(data['components'] || data.components || []);
    setservers(data['servers'] || data.servers || []);
    setinfo(data['info'] || data.info || []);
    setTimeout(function () {
      setSpec(data);
      prepareBody();
    }, 500);
  }, [data]);
  if (!spec) {
    return /*#__PURE__*/React.createElement("div", {
      className: "container justify-content-center"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-sync fa-spin"
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "apidocpro-async"
  }, info && /*#__PURE__*/React.createElement(Header, {
    spectitle: info.title,
    specversion: info.version,
    specdescription: info.description,
    specType: 'ASYNCAPI',
    speccontact: '',
    spec: info
  }), /*#__PURE__*/React.createElement(Body, {
    data: JSON.stringify(final),
    servers: servers,
    spec: spec,
    collapsible: collapsible
  }));
}
AsyncApiTable.propTypes = {
  /** Spec contents as object, to validate AsyncAPI */
  data: propTypes.any,
  theme: propTypes.object,
  collapsible: propTypes.bool
};