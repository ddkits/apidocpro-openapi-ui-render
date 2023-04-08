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

import { TABS } from '../../templates/theme/noTheme/apidocpro';
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
  const TABSNOW = theme.TABS ? theme.TABS : TABS;

  let contents = [];
  let activeTab = 'active',
    active = 'show active';
  let _result = ` <div class="container-fluid" class=" shadow-sm p-3 mb-5 col-md-12 pt-3 rounded ">
    ${TABSNOW.tabsStart.replaceAll('%TABSID%', 'nav-response-tab')}`;
  const createContents = (contents) => {
    let code = '';
    let description = '';
    let i = 0,
      listi = 0;
    Object.keys(spec).map((method, value) => {
      i++;
      const responses = spec[method] || {};
      let description = '';
      contents[method] = responses;
      description = responses['description']
        ? responses['description']
        : spec[method]?.summary
        ? spec[method]?.summary + i + mainKey
        : spec[method]?.description
        ? spec[method]?.description + i + mainKey
        : '' + i;
      const idLabel = spec[method]?.summary
        ? spec[method]?.summary + i + mainKey
        : spec[method]?.operationId
        ? spec[method]?.operationId + i + mainKey
        : spec[method]?.description
        ? spec[method]?.description + i + mainKey
        : `res-${method}-${value + i + mainKey}`;
      const href = idLabel
        .replaceAll(' ', '_')
        .replaceAll('.', '')
        .replaceAll('{', '')
        .replaceAll('}', '')
        .replaceAll(',', '')
        .replaceAll('/', '');
      _result += TABSNOW.tabLink
        .replaceAll('%TABSID%', href)
        .replaceAll('%TABID%', href)
        .replaceAll('%ACTIVE%', activeTab)
        .replaceAll(
          '%TABLABEL%',
          method.toUpperCase().replaceAll(' , ', '').replaceAll('\n,\n', '')
        );
      activeTab = '';
    });
    _result += TABSNOW.tabsLinksEnd;
    contents.length &&
      Object.keys(contents).forEach((k, value) => {
        listi++;
        let desc = `<div >${
          contents[k]?.description
            ? contents[k]?.description
            : contents[k]?.summary
            ? contents[k]?.summary
            : contents[k]?.title
            ? contents[k]?.title
            : '' + listi
        }</div>`;
        const idLabel = contents[k]?.description
          ? contents[k]?.description + listi + mainKey
          : contents[k]?.summary
          ? contents[k]?.summary + listi + mainKey
          : contents[k]?.title
          ? contents[k]?.title + listi + mainKey
          : `res-${k}-${value + listi + mainKey}`;
        const href = idLabel
          .replaceAll(' ', '_')
          .replaceAll('.', '')
          .replaceAll('{', '')
          .replaceAll('}', '')
          .replaceAll(',', '')
          .replaceAll('/', '');
        code = `<section id="apidocpro-codesnippet" >${k} ${desc}`;

        contents[k] &&
          Object.keys(contents[k]).forEach((x) => {
            switch (x) {
              case 'content':
                Object.keys(contents[k][x]).forEach((key) => {
                  //   createRequestExample(contents[k][x][key]?.schema, contents[k][x], key);
                  let res = '';
                  res += `<div class="col-md-12 maxw-100 p-2 "><h5>${key} Schema(s)</h5><div class="shadow-sm bg-dark text-light maxw-100 rounded"><pre >`;
                  res += contents[k][x][key]?.schema
                    ? jsonViewer(contents[k][x][key]?.schema, true, theme)
                    : jsonViewer(contents[k][x][key], true, theme);
                  //   createRequestExample(contents[k][x][key], k, key);
                  res += `</pre></div></div>`;
                  code += res;
                });

                break;

              default:
                break;
            }
          });

        code += `</section>`;
        _result += TABSNOW.tabContent
          .replaceAll('%TABID%', href)
          .replaceAll('%ACTIVE%', active)
          .replaceAll('%TABSDESC%', desc)
          .replaceAll('%TABCONTENT%', code);
        active = '';
      });
    return _result;
  };
  _result += createContents(contents);
  _result += TABSNOW.tabsEnd;

  return _result;
}

export { methodResponses };
