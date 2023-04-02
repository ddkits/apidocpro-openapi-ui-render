/* eslint-disable no-unused-vars */
/**
 * API Doc Pro helpers
 * By Sam Ayoub
 */
import yaml from 'js-yaml';
import {
  TEMPLATESASYNC,
  REQUESTBODY,
  JSONTEMPLATES
} from '../../templates/theme/default/apidocpro';
import Body from '../../templates/regions/middle/Body';
import Header from '../../templates/regions/middle/Header';
import { resolveRef } from './../resolver';

const yamlToJson = (yamlString) => {
  const obj = yaml.load(yamlString);
  return obj;
};

const loopInNestedAsyncObject = (json = {}, collapsible = false, theme = {}) => {
  const schemas = json.components;
  const custom = ['[[Prototype]]', ''];
  const TEMPLATESNOW = theme.TEMPLATESASYNC ? theme.TEMPLATESASYNC : TEMPLATESASYNC;

  function createItem(key, value, type) {
    if (key.split('').length < 2) {
      key = type.toUpperCase();
    }
    let element = TEMPLATESNOW.item.replaceAll('%KEY%', key);
    if (type == 'string') {
      element = element.replaceAll('%VALUE%', '"' + value + '"').replaceAll('%KEY%', key);
    } else {
      if (value) {
        element = element.replaceAll('%VALUE%', JSON.parse(value)).replaceAll('%KEY%', key);
      } else {
        element = element.replaceAll('%VALUE%', value).replaceAll('%KEY%', key);
      }
    }

    element = element.replaceAll('%TYPE%', type);
    return element;
  }

  function createCollapsibleItem(key, value, type, children) {
    if (key.split('').length < 2) {
      key = type.toUpperCase();
    }
    var tpl = 'itemCollapsible';
    if (key === '$ref') {
      value = resolveRef(key, schemas);
    }
    if (collapsible) {
      tpl = 'itemCollapsibleOpen';
    }

    var element = TEMPLATESNOW[tpl].replaceAll('%KEY%', key);

    element = element.replaceAll('%VALUE%', type).replaceAll('%KEY%', key);
    element = element.replaceAll('%TYPE%', type);
    element = element.replaceAll('%CHILDREN%', children);

    return element;
  }

  function handleChildren(key, value, type) {
    if (key.split('').length < 2) {
      key = type.toUpperCase();
    }
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
    if (typeof value === 'object') {
      return handleChildren(key, value, type);
    }
    if (!custom.includes(key)) {
      return createItem(key, value, type);
    } else {
      return;
    }
  }

  function parseObject(obj) {
    if (obj.length === 0) {
      return;
    }
    let result = '<section>';
    let title, version, description, contact, servers, license, specType, summary, externalDocs;
    for (var item in obj) {
      let key = item,
        value = obj[item];
      switch (key) {
        case 'openapi':
          specType = key.toUpperCase();
          break;
        case 'swagger':
          specType = key.toUpperCase();
          break;
        case 'async':
          specType = key.toUpperCase();
          break;
        case 'info':
          title = value['title'];
          version = value['version'];
          description = value['description'];
          summary = value['summary'];
          contact = value['contact'];
          license = value['license'];
          break;
        case 'contact':
          contact = value;
          break;
        case 'servers':
          servers = value;
          break;
        case 'externalDocs':
          externalDocs = value;
          break;
        default:
          if (!custom.includes(key)) {
            result += handleItem(key, value);
          }
          break;
      }
    }
    result += '</section>';
    return (
      <div className="apidocpro-details">
        <Body data={result} servers={servers} spec={json} collapsible={collapsible} />
      </div>
    );
  }

  return parseObject(json);
};

function jsonViewerAsync(json, collapsible = false, theme) {
  const TEMPLATESNOW = theme.JSONTEMPLATES ? theme.JSONTEMPLATES : JSONTEMPLATES;

  function createItem(key, value, type) {
    var element = TEMPLATESNOW.item.replaceAll('%KEY%', key);
    if (key.split('').length < 2) {
      key = type.toUpperCase();
    }
    if (type == 'string') {
      element = element.replaceAll('%VALUE%', '"' + value + '"');
    } else {
      element = element.replaceAll('%VALUE%', value);
    }

    element = element.replaceAll('%TYPE%', type);

    return element;
  }

  function createCollapsibleItem(key, value, type, children) {
    var tpl = 'itemCollapsible';
    if (key.split('').length < 2) {
      key = type.toUpperCase();
    }
    if (collapsible) {
      tpl = 'itemCollapsibleOpen';
    }

    var element = TEMPLATESNOW[tpl].replaceAll('%KEY%', key);

    element = element.replaceAll('%VALUE%', type);
    element = element.replaceAll('%TYPE%', type);
    element = element.replaceAll('%CHILDREN%', children);

    return element;
  }

  function handleChildren(key, value, type) {
    var html = '';
    if (key.split('').length < 2) {
      key = type.toUpperCase();
    }
    for (var item in value) {
      var _key = item,
        _val = value[item];

      html += handleItem(_key, _val);
    }

    return createCollapsibleItem(key, value, type, html);
  }

  function handleItem(key, value) {
    var type = typeof value;

    if (typeof value === 'object') {
      return handleChildren(key, value, type);
    } else if (typeof value === 'string') {
      return createItem(key, value, type);
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
function requestBodyViewerAsync(json, collapsible = false, theme = {}) {
  const custom = ['type', '[[Prototype]]', 'tags'];
  const TEMPLATESNOW = theme.REQUESTBODY ? theme.REQUESTBODY : REQUESTBODY;

  function createItem(key, value, type, desc = '') {
    let html = '';
    if (key !== '') {
      var element = TEMPLATESNOW.item.replaceAll('%KEY%', key);
      if (type === 'string') {
        element = element.replaceAll('%VALUE%', '"' + value + '"');
      } else {
        element = element.replaceAll('%VALUE%', value);
      }
      element = element.replaceAll('%TYPE%', type);
      element = element.replaceAll('%DESC%', desc);
      html += element;
    }
    return html;
  }

  function createCollapsibleItem(key, value, type, children, desc = '') {
    var tpl = 'itemCollapsible';

    if (collapsible) {
      tpl = 'itemCollapsibleOpen';
    }

    var element = TEMPLATESNOW[tpl].replaceAll('%KEY%', key).replaceAll('%DESC%', desc);

    element = element.replaceAll('%VALUE%', type);
    element = element.replaceAll('%TYPE%', type);
    element = element.replaceAll('%CHILDREN%', children);

    return element;
  }

  function handleChildren(key, value, type) {
    var html = '';
    var result = '';
    for (var item in value) {
      var _key = item,
        _val = value[item];
      if (_val !== '') {
        html += handleItem(_key, _val);
      }
    }

    result += createCollapsibleItem(key, value, type, html);
    return result;
  }

  function handleItem(key, value) {
    let _result = '';
    var type = typeof value;
    let desc = value['description'] || value['summary'] || '';
    if (type === 'object') {
      _result += handleChildren(key, value, type, desc);
    } else if (type === 'string') {
      _result += createItem(key, value, type, desc);
    }
    return _result;
  }

  function parseObject(obj) {
    let _result = '<table class="align-top table table-responsive "><tbody>';

    for (var item in obj) {
      var key = item,
        value = obj[item];
      let desc = value['description']
        ? value['description']
        : value['summary']
        ? value['summary']
        : '';
      _result += handleItem(key, value, desc);
    }
    _result += '</tbody></table>';

    return _result;
  }
  let _result = '';

  Object.keys(JSON.parse(JSON.stringify(json, 'utf8'))).forEach((type, xds) => {
    let result = `<details class="treeview ${xds}" ${
      collapsible ? 'open' : ''
    }><summary>${type}  %TYPERESULTS%</summary>`;
    let element = '';
    Object.keys(json[type]).forEach((schema, xds2) => {
      result += `<details class="p-3 ${xds} ${xds2}" ${
        collapsible ? 'open' : ''
      }><summary>${schema}</summary><p>${
        json[type]?.description ? json[type]?.description : ''
      }</p>`;

      Object.keys(json[type][schema]).forEach((key, xds3) => {
        if (!custom.includes(key)) {
          result += `<details class="p-3 ${xds} ${xds2} ${xds3}" ${
            collapsible ? 'open' : ''
          }><summary>${key}</summary><p>${
            json[type][schema][key]?.description ? json[type][schema][key]?.description : ''
          }</p>${parseObject(json[type][schema][key])} </details>`;
        } else {
          element = JSON.stringify(json[type][schema][key]);
        }
      });
      result += `</details>`;
    });
    result += `</details>`;
    _result += result.replaceAll('%TYPERESULTS%', element);
  });
  return _result;
}
export { yamlToJson, loopInNestedAsyncObject, jsonViewerAsync, requestBodyViewerAsync };
