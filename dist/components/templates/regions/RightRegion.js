"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RightRegion;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _jsBeautify = _interopRequireDefault(require("js-beautify"));
var _CurlSnippet = require("../../core/codesnippets/langs/CurlSnippet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable no-unused-vars */

function RightRegion(props) {
  // eslint-disable-next-line no-unused-vars
  const {
    data
  } = props;
  const [codeSnippetsPaths, setCodeSnippetsPaths] = (0, _react.useState)([]);
  const [codeSnippets, setCodeSnippets] = (0, _react.useState)('');
  const [pathChange, setpathChange] = (0, _react.useState)('');
  const [methodChange, setMethodChange] = (0, _react.useState)('');
  const [codeSnippetsMethods, setCodeSnippetsMethods] = (0, _react.useState)([]);
  const createCodeRequests = async data => {
    const paths = (data === null || data === void 0 ? void 0 : data.paths) || {};
    let pathsList = [];
    await Object.keys(paths).forEach(path => {
      pathsList.push({
        key: path,
        methods: []
      });
    });
    await pathsList.forEach(x => {
      const p = x.key;
      Object.keys(paths[p]).forEach(key => {
        x.methods.push({
          method: key,
          code: (0, _CurlSnippet.curlSnippet)(data, p, key)
        });
      });
    });
    setCodeSnippetsPaths(pathsList);
    setCodeSnippetsMethods(pathsList[0].methods);
    setCodeSnippets(pathsList[0].methods[0].code);
    return;
  };
  (0, _react.useEffect)(() => {
    createCodeRequests(data);
  }, []);
  (0, _react.useEffect)(() => {
    if (pathChange !== '') {
      var _codeSnippetsPaths$pa;
      setCodeSnippetsMethods(codeSnippetsPaths[pathChange].methods);
      setCodeSnippets((_codeSnippetsPaths$pa = codeSnippetsPaths[pathChange].methods[0]) === null || _codeSnippetsPaths$pa === void 0 ? void 0 : _codeSnippetsPaths$pa.code);
    }
  }, [pathChange]);
  (0, _react.useEffect)(() => {
    if (pathChange !== '') {
      var _codeSnippetsPaths$pa2;
      setCodeSnippetsMethods(codeSnippetsPaths[pathChange].methods);
      setCodeSnippets((_codeSnippetsPaths$pa2 = codeSnippetsPaths[pathChange].methods[methodChange]) === null || _codeSnippetsPaths$pa2 === void 0 ? void 0 : _codeSnippetsPaths$pa2.code);
    }
  }, [methodChange]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: " pt-5 mt-5  sticky-top  bg-dark text-light "
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "apidocpro-codesnippet",
    className: "shadow-sm maxw-100 rounded"
  }, /*#__PURE__*/_react.default.createElement("h3", null, "Request Example(s)"), /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex "
  }, /*#__PURE__*/_react.default.createElement("select", {
    className: "col",
    value: pathChange,
    onChange: e => setpathChange(e.target.value)
  }, codeSnippetsPaths.length && Object.keys(codeSnippetsPaths).map(xx => {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: codeSnippetsPaths[xx].key,
      value: xx
    }, codeSnippetsPaths[xx].key);
  })), /*#__PURE__*/_react.default.createElement("select", {
    className: "col",
    value: methodChange,
    onChange: e => setMethodChange(e.target.value)
  }, codeSnippetsMethods.length && Object.keys(codeSnippetsMethods).map(xx => {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: codeSnippetsMethods[xx].method,
      value: xx
    }, codeSnippetsMethods[xx].method);
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "json",
    dangerouslySetInnerHTML: {
      __html: codeSnippets
    }
  })));
}
RightRegion.propTypes = {
  data: _propTypes.default.any,
  path: _propTypes.default.string,
  theme: _propTypes.default.object,
  resolved: _propTypes.default.any
};