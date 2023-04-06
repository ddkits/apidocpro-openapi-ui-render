"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.codeRequestSetup = codeRequestSetup;
var _helpers = require("../../helpers");
/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */

/**
 * codeRequestSetup
 * @param {object} code
 * @param {object} theme
 * @returns
 */
function codeRequestSetup(code, theme) {
  let final = '';
  final += "<pre>".concat((0, _helpers.jsonViewer)(code, true, theme), "</pre>");
  return final;
}