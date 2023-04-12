/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
import React from 'react';
import propTypes from 'prop-types';
export default function Body(props) {
  var _theme$styles, _theme$styles2;
  var data = props.data,
    theme = props.theme;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "p-3 ".concat(theme === null || theme === void 0 ? void 0 : (_theme$styles = theme.styles) === null || _theme$styles === void 0 ? void 0 : _theme$styles.body, " ").concat(theme === null || theme === void 0 ? void 0 : (_theme$styles2 = theme.styles) === null || _theme$styles2 === void 0 ? void 0 : _theme$styles2.bodytext),
    dangerouslySetInnerHTML: {
      __html: data
    }
  }));
}
Body.propTypes = {
  /** Data is where the spec we are going to use, must be string, can include HTML tags */
  data: propTypes.string,
  theme: propTypes.object
};