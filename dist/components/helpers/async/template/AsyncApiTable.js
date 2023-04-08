"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AsyncApiTable;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.symbol.description.js");
var _react = _interopRequireWildcard(require("react"));
var _ = require("..");
var _Header = _interopRequireDefault(require("../../../templates/regions/middle/Header"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Body = _interopRequireDefault(require("../../../templates/regions/middle/Body"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable no-unused-vars */

function AsyncApiTable(props) {
  const {
    data,
    collapsible,
    theme
  } = props;
  const [spec, setSpec] = (0, _react.useState)(null);
  const [channels, setchannels] = (0, _react.useState)([]);
  const [components, setcomponents] = (0, _react.useState)([]);
  const [servers, setservers] = (0, _react.useState)([]);
  const [info, setinfo] = (0, _react.useState)([]);
  const [final, setfinal] = (0, _react.useState)('');
  const prepareBody = () => {
    let _final = '';
    _final += /*#__PURE__*/_react.default.createElement("details", {
      className: "p-2"
    }, /*#__PURE__*/_react.default.createElement("summary", null, "Servers"), /*#__PURE__*/_react.default.createElement("div", {
      className: "apidocpro-async-body"
    }, (0, _.loopInNestedAsyncObject)(servers, false)));
    _final += /*#__PURE__*/_react.default.createElement("details", {
      className: "p-2"
    }, /*#__PURE__*/_react.default.createElement("summary", null, "Channels"), /*#__PURE__*/_react.default.createElement("div", {
      className: "apidocpro-async-body"
    }));
    _final += /*#__PURE__*/_react.default.createElement("details", {
      className: "p-2"
    }, /*#__PURE__*/_react.default.createElement("summary", null, "Components"), /*#__PURE__*/_react.default.createElement("div", {
      className: "apidocpro-async-body"
    }, /*#__PURE__*/_react.default.createElement("ul", null, components.schemas && Object.entries(components.schemas).map(_ref => {
      let [name, schema] = _ref;
      return /*#__PURE__*/_react.default.createElement("li", {
        key: name
      }, /*#__PURE__*/_react.default.createElement("strong", null, name), /*#__PURE__*/_react.default.createElement("pre", null, JSON.stringify(schema, null, 2)));
    }))));
    setfinal((0, _.loopInNestedAsyncObject)(data, collapsible, theme));
  };
  (0, _react.useEffect)(() => {
    setchannels(data['channels'] || data.channels || []);
    setcomponents(data['components'] || data.components || []);
    setservers(data['servers'] || data.servers || []);
    setinfo(data['info'] || data.info || []);
    setTimeout(() => {
      setSpec(data);
      prepareBody();
    }, 500);
  }, [data]);
  if (!spec) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "container justify-content-center"
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa-solid fa-sync fa-spin"
    }));
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "apidocpro-async"
  }, info && /*#__PURE__*/_react.default.createElement(_Header.default, {
    spectitle: info.title,
    specversion: info.version,
    specdescription: info.description,
    specType: 'ASYNCAPI',
    speccontact: '',
    spec: info
  }), /*#__PURE__*/_react.default.createElement(_Body.default, {
    data: JSON.stringify(final),
    servers: servers,
    spec: spec,
    collapsible: collapsible
  }));
}
AsyncApiTable.propTypes = {
  /** Spec contents as object, to validate AsyncAPI */
  data: _propTypes.default.any,
  theme: _propTypes.default.object,
  collapsible: _propTypes.default.bool
};