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
var _CurlSnippet = require("../../core/codesnippets/langs/CurlSnippet");
var _codeRequestSetup = require("../../core/codesnippets/codeRequestSetup");
var _helpers = require("../../helpers");
var _async = require("../../helpers/async");
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

function RightRegion(props) {
  // eslint-disable-next-line no-unused-vars
  const {
    data,
    spectype,
    theme
  } = props;
  const [codeSnippetsPaths, setCodeSnippetsPaths] = (0, _react.useState)([]);
  const [codeSnippets, setCodeSnippets] = (0, _react.useState)([]);
  const [pathChange, setpathChange] = (0, _react.useState)('');
  const [methodChange, setMethodChange] = (0, _react.useState)('');
  const [codeSnippetsMethods, setCodeSnippetsMethods] = (0, _react.useState)([]);
  const createCodeRequests = async data => {
    const paths = (data === null || data === void 0 ? void 0 : data.paths) || {};
    let pathsList = [];
    await Object.keys(paths).forEach(path => {
      if (path.split('').length < 2) {
        path = typeof path.toUpperCase();
      }
      pathsList.push({
        key: path,
        methods: []
      });
    });
    await pathsList.forEach(x => {
      let p = x.key;
      if (p.split('').length < 2) {
        p = typeof p.toUpperCase();
      }
      Object.keys(paths[p]).forEach(key => {
        x.methods.push({
          method: key,
          code: (0, _CurlSnippet.curlSnippet)(data, p, key, spectype, theme)
        });
      });
    });
    setCodeSnippetsPaths(pathsList);
    setCodeSnippetsMethods(pathsList[0].methods);
    setCodeSnippets(pathsList[0].methods[0].code);
    return;
  };
  const createAsyncCodeRequests = async data => {
    const channels = (data === null || data === void 0 ? void 0 : data.channels) || {};
    let componentsList = [];
    await Object.keys(channels).forEach(item => {
      componentsList.push({
        key: item,
        methods: []
      });
    });
    await componentsList.forEach(x => {
      const p = x.key;
      Object.keys(channels[p]).forEach(key => {
        var _channels$p$key;
        const nowKey = ((_channels$p$key = channels[p][key]) === null || _channels$p$key === void 0 ? void 0 : _channels$p$key.parameters) || channels[p][key];
        x.methods.push({
          method: key,
          code: nowKey
        });
      });
    });
    setCodeSnippetsPaths(componentsList);
    setCodeSnippetsMethods(componentsList[0].methods);
    setCodeSnippets((0, _async.jsonViewerAsync)(componentsList[0].methods, true, theme));
    return;
  };
  (0, _react.useEffect)(() => {
    if (spectype === 'openapi' || spectype === 'swagger') {
      createCodeRequests(data);
    } else if (spectype === 'asyncapi') {
      createAsyncCodeRequests(data);
    }
  }, [data]);
  (0, _react.useEffect)(() => {
    if (pathChange !== '' && spectype !== 'asyncapi') {
      var _codeSnippetsPaths$pa;
      const results = (_codeSnippetsPaths$pa = codeSnippetsPaths[pathChange].methods[0]) === null || _codeSnippetsPaths$pa === void 0 ? void 0 : _codeSnippetsPaths$pa.code;
      setCodeSnippetsMethods(codeSnippetsPaths[pathChange].methods);
      setCodeSnippets(results);
    } else if (pathChange !== '') {
      const results = (0, _async.jsonViewerAsync)(codeSnippetsPaths[pathChange].methods, true, theme);
      setCodeSnippets(results);
    }
  }, [pathChange]);
  (0, _react.useEffect)(() => {
    if (pathChange !== '' && spectype !== 'asyncapi') {
      var _codeSnippetsPaths$pa2;
      const results = (_codeSnippetsPaths$pa2 = codeSnippetsPaths[pathChange].methods[methodChange]) === null || _codeSnippetsPaths$pa2 === void 0 ? void 0 : _codeSnippetsPaths$pa2.code;
      setCodeSnippetsMethods(codeSnippetsPaths[pathChange].methods);
      setCodeSnippets(results);
    } else if (pathChange !== '') {
      const results = (0, _async.jsonViewerAsync)(codeSnippetsPaths[pathChange].methods, true, theme);
      setCodeSnippets(results);
    }
  }, [methodChange]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: " pt-5 mt-5 bg-dark text-light "
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "apidocpro-codesnippet",
    className: "shadow-sm maxw-100 rounded"
  }, /*#__PURE__*/_react.default.createElement("h3", null, spectype === 'openapi' ? "Request Example(s)" : spectype === 'asyncapi' ? "Channel(s)" : 'RightRegion'), /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/_react.default.createElement("select", {
    className: "col",
    value: pathChange,
    onChange: e => setpathChange(e.target.value)
  }, codeSnippetsPaths.length && Object.keys(codeSnippetsPaths).map(xx => {
    return /*#__PURE__*/_react.default.createElement("option", {
      className: " maxw-100",
      key: codeSnippetsPaths[xx].key,
      value: xx
    }, codeSnippetsPaths[xx].key);
  })), spectype !== 'asyncapi' ? /*#__PURE__*/_react.default.createElement("select", {
    className: "col",
    value: methodChange,
    onChange: e => setMethodChange(e.target.value)
  }, codeSnippetsMethods.length && Object.keys(codeSnippetsMethods).map(xx => {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: codeSnippetsMethods[xx].method,
      value: xx
    }, codeSnippetsMethods[xx].method);
  })) : ''), /*#__PURE__*/_react.default.createElement("div", {
    className: "json",
    dangerouslySetInnerHTML: {
      __html: codeSnippets
    }
  })));
}
RightRegion.propTypes = {
  data: _propTypes.default.any,
  path: _propTypes.default.string,
  spectype: _propTypes.default.string,
  theme: _propTypes.default.object,
  resolved: _propTypes.default.any
};