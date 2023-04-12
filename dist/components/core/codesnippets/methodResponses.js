/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { TABS } from '../../theme/noTheme/apidocpro';
import { jsonViewer } from '../../helpers';

/**
 * methodResponses
 * @param {object|string} spec
 * @param {object} theme
 * @param {object} schemas
 * @param {string} mainKey
 * @returns
 */
function methodResponses(spec, theme, schemas, mainKey) {
  /** Const of theme to use, by default is the default unless theme provided */
  var TABSNOW = theme.TABS ? theme.TABS : TABS;
  var contents = [];
  var activeTab = 'active',
    active = 'show active';
  var _result = " <div class=\"container-fluid\" class=\" shadow-sm p-3 mb-5 col-md-12 pt-3 rounded \">\n    ".concat(TABSNOW.tabsStart.replaceAll('%TABSID%', 'nav-response-tab'));
  var createContents = function createContents(contents) {
    var code = '';
    var description = '';
    var i = 0,
      listi = 0;
    Object.keys(spec).map(function (method, value) {
      var _spec$method, _spec$method2, _spec$method3, _spec$method4, _spec$method5, _spec$method6, _spec$method7, _spec$method8, _spec$method9, _spec$method10;
      i++;
      var responses = spec[method] || {};
      var description = '';
      contents[method] = responses;
      description = responses['description'] ? responses['description'] : (_spec$method = spec[method]) !== null && _spec$method !== void 0 && _spec$method.summary ? ((_spec$method2 = spec[method]) === null || _spec$method2 === void 0 ? void 0 : _spec$method2.summary) + i + mainKey : (_spec$method3 = spec[method]) !== null && _spec$method3 !== void 0 && _spec$method3.description ? ((_spec$method4 = spec[method]) === null || _spec$method4 === void 0 ? void 0 : _spec$method4.description) + i + mainKey : '' + i;
      var idLabel = (_spec$method5 = spec[method]) !== null && _spec$method5 !== void 0 && _spec$method5.summary ? ((_spec$method6 = spec[method]) === null || _spec$method6 === void 0 ? void 0 : _spec$method6.summary) + i + mainKey : (_spec$method7 = spec[method]) !== null && _spec$method7 !== void 0 && _spec$method7.operationId ? ((_spec$method8 = spec[method]) === null || _spec$method8 === void 0 ? void 0 : _spec$method8.operationId) + i + mainKey : (_spec$method9 = spec[method]) !== null && _spec$method9 !== void 0 && _spec$method9.description ? ((_spec$method10 = spec[method]) === null || _spec$method10 === void 0 ? void 0 : _spec$method10.description) + i + mainKey : "res-".concat(method, "-").concat(value + i + mainKey);
      var href = idLabel.replaceAll(' ', '_').replaceAll('.', '').replaceAll('{', '').replaceAll('}', '').replaceAll(',', '').replaceAll('/', '');
      _result += TABSNOW.tabLink.replaceAll('%TABSID%', href).replaceAll('%TABID%', href).replaceAll('%ACTIVE%', activeTab).replaceAll('%TABLABEL%', method.toUpperCase().replaceAll(' , ', '').replaceAll('\n,\n', ''));
      activeTab = '';
    });
    _result += TABSNOW.tabsLinksEnd;
    contents.length && Object.keys(contents).forEach(function (k, value) {
      var _contents$k, _contents$k2, _contents$k3, _contents$k4, _contents$k5, _contents$k6, _contents$k7, _contents$k8, _contents$k9, _contents$k10, _contents$k11, _contents$k12;
      listi++;
      var desc = "<div >".concat((_contents$k = contents[k]) !== null && _contents$k !== void 0 && _contents$k.description ? (_contents$k2 = contents[k]) === null || _contents$k2 === void 0 ? void 0 : _contents$k2.description : (_contents$k3 = contents[k]) !== null && _contents$k3 !== void 0 && _contents$k3.summary ? (_contents$k4 = contents[k]) === null || _contents$k4 === void 0 ? void 0 : _contents$k4.summary : (_contents$k5 = contents[k]) !== null && _contents$k5 !== void 0 && _contents$k5.title ? (_contents$k6 = contents[k]) === null || _contents$k6 === void 0 ? void 0 : _contents$k6.title : '' + listi, "</div>");
      var idLabel = (_contents$k7 = contents[k]) !== null && _contents$k7 !== void 0 && _contents$k7.description ? ((_contents$k8 = contents[k]) === null || _contents$k8 === void 0 ? void 0 : _contents$k8.description) + listi + mainKey : (_contents$k9 = contents[k]) !== null && _contents$k9 !== void 0 && _contents$k9.summary ? ((_contents$k10 = contents[k]) === null || _contents$k10 === void 0 ? void 0 : _contents$k10.summary) + listi + mainKey : (_contents$k11 = contents[k]) !== null && _contents$k11 !== void 0 && _contents$k11.title ? ((_contents$k12 = contents[k]) === null || _contents$k12 === void 0 ? void 0 : _contents$k12.title) + listi + mainKey : "res-".concat(k, "-").concat(value + listi + mainKey);
      var href = idLabel.replaceAll(' ', '_').replaceAll('.', '').replaceAll('{', '').replaceAll('}', '').replaceAll(',', '').replaceAll('/', '');
      code = "<section id=\"apidocpro-codesnippet\" >".concat(k, " ").concat(desc);
      contents[k] && Object.keys(contents[k]).forEach(function (x) {
        switch (x) {
          case 'content':
            Object.keys(contents[k][x]).forEach(function (key) {
              var _contents$k$x$key, _contents$k$x$key2;
              //   createRequestExample(contents[k][x][key]?.schema, contents[k][x], key);
              var res = '';
              res += "<div class=\"col-md-12 maxw-100 p-2 \"><h5>".concat(key, " Schema(s)</h5><div class=\"shadow-sm bg-dark text-light maxw-100 rounded\"><pre >");
              res += (_contents$k$x$key = contents[k][x][key]) !== null && _contents$k$x$key !== void 0 && _contents$k$x$key.schema ? jsonViewer((_contents$k$x$key2 = contents[k][x][key]) === null || _contents$k$x$key2 === void 0 ? void 0 : _contents$k$x$key2.schema, true, theme) : jsonViewer(contents[k][x][key], true, theme);
              //   createRequestExample(contents[k][x][key], k, key);
              res += "</pre></div></div>";
              code += res;
            });
            break;
          default:
            break;
        }
      });
      code += "</section>";
      _result += TABSNOW.tabContent.replaceAll('%TABID%', href).replaceAll('%ACTIVE%', active).replaceAll('%TABSDESC%', desc).replaceAll('%TABCONTENT%', code);
      active = '';
    });
    return _result;
  };
  _result += createContents(contents);
  _result += TABSNOW.tabsEnd;
  return _result;
}
export { methodResponses };