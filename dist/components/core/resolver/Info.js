"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Info;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Info(props) {
  // eslint-disable-next-line no-unused-vars
  const {
    data,
    info
  } = props;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "head");
}
Info.propTypes = {
  data: _propTypes.default.array,
  info: _propTypes.default.array
};