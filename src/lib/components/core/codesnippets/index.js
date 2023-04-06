/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
import { js_beautify } from 'js-beautify';

function apidocprocodeViewer(json, collapsible = false) {
  var TEMPLATES = {
    item: '<div class="json__item"><div class="json__key">%KEY%</div><div class="json__value json__value--%TYPE%">%VALUE%</div></div>',
    itemCollapsible:
      '<label class="json__item json__item--collapsible"><input type="checkbox" class="json__toggle"/><div class="json__key">%KEY%</div><div class="json__value json__value--type-%TYPE%">%VALUE%</div>%CHILDREN%</label>',
    itemCollapsibleOpen:
      '<label class="json__item json__item--collapsible"><input type="checkbox" checked class="json__toggle"/><div class="json__key">%KEY%</div><div class="json__value json__value--type-%TYPE%">%VALUE%</div>%CHILDREN%</label>'
  };

  function createItem(key, value, type) {
    var element = TEMPLATES.item.replace('%KEY%', key);

    if (type == 'string') {
      element = element.replace('%VALUE%', '"' + value + '"');
    } else {
      element = element.replace('%VALUE%', value);
    }

    element = element.replace('%TYPE%', type);

    return element;
  }

  function createCollapsibleItem(key, value, type, children) {
    var tpl = 'itemCollapsible';

    if (collapsible) {
      tpl = 'itemCollapsibleOpen';
    }

    var element = TEMPLATES[tpl].replace('%KEY%', key);

    element = element.replace('%VALUE%', type);
    element = element.replace('%TYPE%', type);
    element = element.replace('%CHILDREN%', children);

    return element;
  }

  function handleChildren(key, value, type) {
    var html = '';

    for (var item in value) {
      var _key = item,
        _val = value[item];

      html += handleItem(_key, _val);
    }

    return createCollapsibleItem(key, value, type, html);
  }

  function handleItem(key, value) {
    var type = typeof value;
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
