"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Body;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Body(props) {
  // const { title, version, description, type, contact, spec} = props;
  const {
    data
  } = props;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "p-3",
    dangerouslySetInnerHTML: {
      __html: data
    }
  }));
}
Body.propTypes = {
  data: _propTypes.default.string,
  title: _propTypes.default.string,
  version: _propTypes.default.string,
  description: _propTypes.default.string,
  type: _propTypes.default.string,
  contact: _propTypes.default.any,
  spec: _propTypes.default.any
};