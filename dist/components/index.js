"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APIDOCPROTHEMEGREEN = exports.APIDOCPROTHEME = exports.APIDOCPRONOTHEME = void 0;
Object.defineProperty(exports, "ApiDocPro", {
  enumerable: true,
  get: function get() {
    return _templates.default;
  }
});
var React = _interopRequireWildcard(require("react"));
require("bootstrap/dist/css/bootstrap.min.css");
require("font-awesome/css/font-awesome.min.css");
require("bootstrap/dist/js/bootstrap.bundle.min.js");
var APIDOCPRONOTHEME = _interopRequireWildcard(require("./templates/theme/default/apidocpro"));
var APIDOCPROTHEME = APIDOCPRONOTHEME;
exports.APIDOCPRONOTHEME = APIDOCPRONOTHEME;
exports.APIDOCPROTHEME = APIDOCPRONOTHEME;
var APIDOCPROTHEMEGREEN = _interopRequireWildcard(require("./templates/theme/green/apidocpro"));
exports.APIDOCPROTHEMEGREEN = APIDOCPROTHEMEGREEN;
var _templates = _interopRequireDefault(require("./templates"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }