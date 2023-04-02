"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MiddleRegion;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _helpers = require("../../helpers");
var _AsyncApiTable = _interopRequireDefault(require("../../helpers/async/template/AsyncApiTable"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function MiddleRegion(props) {
  // eslint-disable-next-line react/prop-types
  const {
    data,
    openCollapse,
    theme,
    resolved,
    spectype
  } = props;
  const [loading, setLoading] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 50);
  }, [openCollapse]);
  (0, _react.useEffect)(() => {
    setLoading(false);
  }, []);
  return loading ? /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa-solid fa-sync fa-spin"
  })) : /*#__PURE__*/_react.default.createElement("div", {
    id: "middle-region",
    className: "text-start"
  }, data ? spectype === 'openapi' ? (0, _helpers.loopInNestedObject)(resolved, openCollapse ? openCollapse : false, theme) : /*#__PURE__*/_react.default.createElement(_AsyncApiTable.default, {
    data: data
  }) : /*#__PURE__*/_react.default.createElement("div", {
    className: "alert alert-danger"
  }, "ApiDocPro UI render only support OS 2.x, 3.x and Async 2.x, the spec been passed is none\n          of them, or having syntax's problems"));
}
MiddleRegion.propTypes = {
  data: _propTypes.default.any,
  openCollapse: _propTypes.default.bool,
  theme: _propTypes.default.object,
  resolved: _propTypes.default.any,
  spectype: _propTypes.default.string
};