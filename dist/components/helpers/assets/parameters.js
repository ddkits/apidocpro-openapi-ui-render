"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parametersTable = parametersTable;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.symbol.description.js");
/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable no-unused-vars */
function parametersTable() {
  let parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const params = JSON.parse(JSON.stringify(parameters));
  let res = '';
  let inRes = '';
  const results = params.map(param => {
    var _param$in, _param$schema, _param$schema2, _param$schema3, _param$schema4;
    if (!param.name) {
      inRes += '';
    }
    inRes += "<tr key=".concat(param.name, ">\n            <td>\n              <b>").concat(param.name, " </b><i className=\"small text-success\"> ").concat(param !== null && param !== void 0 && param.in ? param === null || param === void 0 ? void 0 : (_param$in = param.in) === null || _param$in === void 0 ? void 0 : _param$in.toUpperCase() : '', "</i>\n            </td>\n            <td>").concat(param.description ? param.description : '', "</td>\n            <td>").concat(param.required ? param.required : false, "</td>\n            <td>").concat(param !== null && param !== void 0 && param.schema && param !== null && param !== void 0 && (_param$schema = param.schema) !== null && _param$schema !== void 0 && _param$schema.type ? param === null || param === void 0 ? void 0 : (_param$schema2 = param.schema) === null || _param$schema2 === void 0 ? void 0 : _param$schema2.type : '', "</td>\n            <td>").concat(param !== null && param !== void 0 && param.schema && param !== null && param !== void 0 && (_param$schema3 = param.schema) !== null && _param$schema3 !== void 0 && _param$schema3.format ? param === null || param === void 0 ? void 0 : (_param$schema4 = param.schema) === null || _param$schema4 === void 0 ? void 0 : _param$schema4.format : '', "</td> </tr>");
  });
  res += "<table class=\"table\">\n      <thead>\n        <tr>\n          <th>Name</th>\n          <th>Description</th>\n          <th>Required</th>\n          <th>Type</th>\n          <th>Format</th>\n        </tr>\n      </thead>\n      <tbody>";
  results;
  res += inRes;
  res += " </tbody>\n    </table> ";
  return res;
}