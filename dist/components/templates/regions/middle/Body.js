"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Body;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */

function Body(props) {
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
  /** Data is where the spec we are going to use, must be string, can include HTML tags */
  data: _propTypes.default.string
};