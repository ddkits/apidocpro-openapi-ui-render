"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.codeRequestSetup = codeRequestSetup;
var _helpers = require("../../helpers");
function codeRequestSetup(code, theme) {
  let final = '';
  final += "<pre>".concat((0, _helpers.jsonViewer)(code, true, theme), "</pre>");
  return final;
}