/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
import { js_beautify } from 'js-beautify';
import { TEMPLATESASYNC } from '../../theme/noTheme/noTheme';

function apidocprocodeViewer(json, collapsible = false, theme = {}) {
  const TEMPLATESNOW = theme.TEMPLATESASYNC ? theme.TEMPLATESASYNC : TEMPLATESASYNC;

  function createItem(key, value, type) {
    var element = TEMPLATESNOW.item;

    if (type == 'string') {
      element = element.replace('%VALUE%', '"' + value + '"').replace('%KEY%', `${key}: `);
    } else {
      element = element.replace('%VALUE%', value).replace('%KEY%', key);
    }

    element = element.replace('%TYPE%', type);

    return element;
  }

  function createCollapsibleItem(key, value, type, children) {
    var tpl = 'itemCollapsible';

    if (collapsible) {
      tpl = 'itemCollapsibleOpen';
    }

    var element = TEMPLATESNOW[tpl].replace('%KEY%', key);

    element = element.replace('%VALUE%', type);
    element = element.replace('%TYPE%', type);
    element = element.replace('%CHILDREN%', children);

    return element;
  }

  function handleChildren(key, value, type) {
    var html = '';
    if (key.split('').length < 3) {
      key = '';
    }
    for (var item in value) {
      var _key = item,
        _val = value[item];
      if (_key.split('').length < 3) {
        _key = '';
      }
      html += handleItem(_key, _val);
    }

    return createCollapsibleItem(key, value, type, html);
  }

  function handleItem(key, value) {
    var type = typeof value;
    if (key.split('').length < 3) {
      key = '';
    }
    if (key === 'example') {
      if (typeof value === 'object') {
        return handleChildren(key, value, type);
      }
      return createItem(key, value, type);
    } else {
      return;
    }
  }

  function parseObject(obj) {
    let _result = '<div class="json">';

    for (var item in obj) {
      var key = item,
        value = obj[item];

      _result += handleItem(key, value);
    }

    _result += '</div>';

    return _result;
  }

  return parseObject(json);
}

function codeFromPath(json = {}, path = '') {
  let result;
  let newCodeSnippets = [];
  for (const [method, methodObj] of Object.entries(json)) {
    const examples = methodObj['x-examples'] || methodObj.examples;

    if (examples) {
      // eslint-disable-next-line no-unused-vars
      for (const [exampleName, exampleObj] of Object.entries(examples)) {
        const { requestBody, headers, query } = exampleObj;
        const snippet = `${method.toUpperCase()} ${path}\n\n${JSON.stringify(
          requestBody,
          null,
          2
        )}\n\n${JSON.stringify(headers, null, 2)}\n\n${JSON.stringify(query, null, 2)}`;
        newCodeSnippets.push(js_beautify(snippet));
      }
    }
  }
  result += `<div>
      ${newCodeSnippets.map((snippet) => <pre key={snippet}>{snippet}</pre>)}
    </div>`;
  return result;
}
function responsesFromPath(method, responses) {
  return <pre>{JSON.stringify(responses.content, null, 2)}</pre>;
}
export { apidocprocodeViewer, codeFromPath, responsesFromPath };
