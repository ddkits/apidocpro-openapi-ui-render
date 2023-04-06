"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _helpers = require("../helpers");
var _LeftRegion = _interopRequireDefault(require("./regions/LeftRegion"));
var _MiddleRegion = _interopRequireDefault(require("./regions/MiddleRegion"));
var _RightRegion = _interopRequireDefault(require("./regions/RightRegion"));
var _resolver = require("../core/resolver");
var _FileUploadPage = _interopRequireDefault(require("../core/FileUploadPage"));
var _ErrorBoundary = _interopRequireDefault(require("../core/ErrorBoundary"));
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

function ApiDocPro(props) {
  // eslint-disable-next-line react/prop-types
  //   collapse, search, codesnippet
  const [left, setLeft] = (0, _react.useState)();
  const [right, setRight] = (0, _react.useState)();
  // eslint-disable-next-line no-unused-vars
  const [obj, setObj] = (0, _react.useState)();
  const [resolved, setResolved] = (0, _react.useState)();
  const {
    title = '',
    spec,
    collapse,
    theme
  } = props;
  const [openCollapse, setopenCollapse] = (0, _react.useState)(false);
  const [head, setHead] = (0, _react.useState)(true);
  const [spectype, setspectype] = (0, _react.useState)('');
  const [loading, setLoading] = (0, _react.useState)(true);
  const [specification, setSpecification] = (0, _react.useState)(_helpers.yamlExample);
  const rebuild = async function rebuild() {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    setopenCollapse(collapse || false);
    setResolved(null);
    setObj(null);
    setspectype('');
    let finE;
    if (e) {
      try {
        finE = JSON.parse(e);
      } catch (error) {
        finE = e;
      }
    }
    const newSpec = finE ? finE : localStorage.getItem('spec') && localStorage.getItem('spec') !== '' ? JSON.parse(localStorage.getItem('spec')) : _helpers.yamlExample;
    if (newSpec && (newSpec.asyncapi || newSpec['asyncapi'])) {
      setspectype('asyncapi');
    } else if (newSpec && (newSpec.openapi || newSpec['openapi'])) {
      setspectype('openapi');
    } else if (newSpec && (newSpec.swagger || newSpec['swagger'])) {
      setspectype('swagger');
    } else {
      setspectype('openapi');
    }
    console.log(spectype);
    if (newSpec && newSpec.length > 0) {
      setSpecification(newSpec);
    } else {
      setSpecification(_helpers.yamlExample);
    }
    const ob = (0, _helpers.yamlToJson)(newSpec) ? (0, _helpers.yamlToJson)(newSpec) : newSpec;
    setObj(ob);
    const reso = (0, _resolver.resolveRefs)(newSpec);
    // Check Openapi or Async
    setResolved(reso);
    setTimeout(() => {
      try {
        const test = JSON.parse(resolved);
        setResolved(test);
      } catch (error) {
        setResolved(reso);
      }
      setLoading(false);
    }, 1000);
  };
  (0, _react.useEffect)(() => {
    setLoading(true);
    rebuild(spec);
  }, [spec]);
  (0, _react.useEffect)(() => {
    setLoading(true);
    rebuild(spec);
    if (props !== null && props !== void 0 && props.leftregion) {
      setLeft(props === null || props === void 0 ? void 0 : props.leftregion);
    } else {
      setLeft(false);
    }
    if (props !== null && props !== void 0 && props.rightregion) {
      setRight(props === null || props === void 0 ? void 0 : props.rightregion);
    } else {
      setRight(false);
    }
    if (props !== null && props !== void 0 && props.header) {
      setHead(props === null || props === void 0 ? void 0 : props.header);
    } else {
      setHead(false);
    }
  }, []);
  const _handleFileCallback = e => {
    setLoading(true);
    rebuild(e);
  };
  const goToDefault = () => {
    localStorage.removeItem('spec');
    setLoading(true);
    rebuild();
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid p-0 m-0"
  }, head && spectype !== '' && /*#__PURE__*/_react.default.createElement("header", {
    className: "row p-3 bg-light sticky-top shadow pt-5 pb-3 m-0 mb-3 maxw-100 "
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col text-start"
  }, title || 'APIDocPro UI'), /*#__PURE__*/_react.default.createElement("div", {
    className: "col pull-right "
  }, /*#__PURE__*/_react.default.createElement(_FileUploadPage.default, {
    handleFileCallback: e => _handleFileCallback(e)
  }), /*#__PURE__*/_react.default.createElement("button", {
    className: "icon badge rounded-pill bg-dark text-light",
    onClick: () => setLeft(!left)
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-caret-left"
  })), /*#__PURE__*/_react.default.createElement("button", {
    className: "icon badge rounded-pill bg-dark text-light",
    onClick: () => setopenCollapse(!openCollapse)
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-bars"
  })), /*#__PURE__*/_react.default.createElement("button", {
    className: "icon badge rounded-pill bg-dark text-light",
    onClick: () => setRight(!right)
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-caret-right"
  })), /*#__PURE__*/_react.default.createElement("button", {
    className: "icon badge rounded-pill bg-dark text-light",
    onClick: goToDefault
  }, "Default"))), loading && spectype !== '' ? /*#__PURE__*/_react.default.createElement("div", {
    className: "container justify-content-middle"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa-solid fa-sync fa-spin"
  })) : /*#__PURE__*/_react.default.createElement("main", {
    className: "d-flex m-0 col-sx-12"
  }, /*#__PURE__*/_react.default.createElement(_ErrorBoundary.default, null, left ? /*#__PURE__*/_react.default.createElement("div", {
    id: "apidocpro-leftsidemenu",
    className: "sidenav d-none d-md-block col-2 m-0",
    "data-mdb-hidden": "false"
  }, /*#__PURE__*/_react.default.createElement(_LeftRegion.default, {
    data: resolved,
    resolved: resolved,
    menuClicked: () => console.log('menu clicked'),
    theme: theme,
    spectype: spectype
  })) : [], /*#__PURE__*/_react.default.createElement("div", {
    id: "apidocpro-middleregion",
    className: right && left ? 'col-12 col-sm-12 col-md-7 ' : right && !left ? 'col-12 col-sm-12 col-md-9 ' : left && !right ? 'col-12 col-sm-12 col-md-10 ' : 'col-12 col-sm-12 col-md-12 '
  }, /*#__PURE__*/_react.default.createElement(_MiddleRegion.default, {
    data: resolved,
    resolved: resolved,
    openCollapse: openCollapse,
    theme: theme,
    spectype: spectype
  })), right ? /*#__PURE__*/_react.default.createElement("div", {
    id: "apidocpro-rightregion",
    className: "d-none d-md-block  bg-dark text-light col-3 pt-3 minh-100 m-0"
  }, /*#__PURE__*/_react.default.createElement(_RightRegion.default, {
    data: resolved,
    resolved: resolved,
    theme: theme,
    openCollapse: openCollapse,
    spectype: spectype
  })) : [])), /*#__PURE__*/_react.default.createElement("footer", {
    className: "sticky-bottom bg-white p-2 m-0"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "copyright",
    className: "badge rounded-pill bg-light text-dark "
  }, "Copyright @ ", /*#__PURE__*/_react.default.createElement("a", {
    href: "//apidocpro.com/editor"
  }, "APIDocPro UI"), ",", /*#__PURE__*/_react.default.createElement("a", {
    href: "//reallexi.com"
  }, "RealLexi LLC"))));
}
ApiDocPro.propTypes = {
  spec: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  resolved: _propTypes.default.any,
  title: _propTypes.default.string,
  leftregion: _propTypes.default.bool,
  rightregion: _propTypes.default.bool,
  collapse: _propTypes.default.bool,
  header: _propTypes.default.bool,
  theme: _propTypes.default.object
};
var _default = ApiDocPro;
exports.default = _default;