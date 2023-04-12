/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/**
 * API Doc Pro helpers
 * By Sam Ayoub
 */
import React from 'react';
import yaml from 'js-yaml';
import { TEMPLATES, REQUESTBODY, JSONTEMPLATES } from '../theme/noTheme/noTheme';
import Body from '../templates/regions/middle/Body';
import Header from '../templates/regions/middle/Header';
import { jsonExample, yamlExample } from './examples';
import { loopInNestedObjectPaths } from './pathsHelper';
import { resolveRef } from './resolver';
/**
 * yamlToJson
 * @param {string/object} yamlString
 * @returns
 */
const yamlToJson = (yamlString) => {
  const obj = yaml.load(yamlString);
  return obj;
};

function merge(schema) {
  if (schema?.allOf || schema?.oneOf) {
    const sch = schema?.allOf || schema?.oneOf;
    // merge all properties
    const properties = sch.reduce((acc, curr) => {
      const result = merge(curr)?.properties;
      return { ...acc, ...result };
    });
    return { properties };
  } else {
    return schema;
  }
}

/**
 * loopInNestedObject
 * @param {spec} json
 * @param {boolean} collapsible
 * @param {object} theme
 * @returns
 */
const loopInNestedObject = (json = {}, collapsible = false, theme = {}) => {
  const schemas = json.components;
  const custom = [
    'tags',
    'operationId',
    'description',
    'summary',
    'responses',
    'method',
    'schema',
    '[[Prototype]]',
    ''
  ];
  const TEMPLATESNOW = theme.TEMPLATES ? theme.TEMPLATES : TEMPLATES;
  function createItem(key, value, type) {
    let element = TEMPLATESNOW.item.replaceAll(
      '%KEY%',
      value?.title || value?.name || value?.summary || value?.description || key
    );
    if (key === 'description' || key === 'summary') {
      key = '';
    }
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
    var tpl = 'itemCollapsible';
    if (key === '$ref') {
      value = resolveRef(key, schemas);
    }
    if (collapsible) {
      tpl = 'itemCollapsibleOpen';
    }

    var element = TEMPLATESNOW[tpl].replaceAll(
      '%KEY%',
      value?.title || value?.name || value?.summary || value?.description || key || ''
    );

    element = element.replaceAll('%VALUE%', type).replaceAll('%KEY%', key);
    element = element.replaceAll('%TYPE%', type);
    element = element.replaceAll('%CHILDREN%', children);

    return element;
  }

  function handleChildren(key, value, type) {
    var html = '';
    if (key.split('').length < 3) {
      key = '';
    }
    for (var item in value) {
      var _key = item,
        _val = merge(value[item]);
      if (_key.split('').length < 3) {
        _key = '';
      }
      html += handleItem(_key, _val);
    }

    return createCollapsibleItem(key, value, type, html);
  }

  function handleItem(key, value) {
    var type = typeof value;
    let paths = '',
      components = '';

    if (key == 'info') {
      return {
        title: value['title'] || '',
        specversion: value['version'] || '',
        contact: value['contact'] || [],
        description: value['description'] || '',
        summary: value['summary'] || '',
        servers: value['servers'] || [],
        license: value['license'] || ''
      };
    } else {
      switch (key) {
        case 'openapi':
        case 'swagger':
        case 'async':
        case 'tags':
          return;
        case 'components':
          components = '';
          if (typeof value === 'object') {
            for (var item1 in value) {
              let key1 = item1,
                value1 = value[item1];

              const res = loopInNestedObjectPaths(value1, collapsible, key1, schemas, theme);

              components += `${res}`;
            }
          }
          return components;
        case 'paths':
          paths = '';
          if (typeof value === 'object') {
            for (var item in value) {
              let key1 = item,
                value1 = value[item];

              const res = loopInNestedObjectPaths(value1, collapsible, key1, schemas, theme);

              paths += `${res}`;
            }
          }
          return paths;
        default:
          if (key.split('').length < 3) {
            key = '';
          }
          if (typeof value === 'object') {
            return handleChildren(key, value, type);
          }
          if (!custom.includes(key)) {
            return createItem(key, value, type);
          } else {
            return;
          }
      }
    }
  }

  function parseObject(obj) {
    if (obj.length === 0) {
      return;
    }
    let result = '<section class="apidocpro">';
    let title,
      version,
      description,
      contact,
      servers,
      license,
      specType,
      summary,
      externalDocs,
      specVersion;
    for (var item in obj) {
      let key = item,
        value = obj[item];
      switch (key) {
        case 'openapi':
          specType = key.toUpperCase();
          specVersion = value;
          break;
        case 'swagger':
          specType = key.toUpperCase();
          specVersion = value;
          break;
        case 'async':
          specType = key.toUpperCase();
          specVersion = value;
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
        <Header
          spectitle={title}
          specversion={specVersion}
          version={version}
          specdescription={description}
          specType={specType}
          speccontact={contact}
          spec={json}
          specservers={servers || []}
          speclicense={license}
          specsummary={summary}
          specexternaldocs={externalDocs || []}
          theme={theme}
        />
        <Body
          data={result.replaceAll('undefined', '')}
          servers={servers}
          spec={json}
          collapsible={collapsible}
          theme={theme}
        />
      </div>
    );
  }

  return parseObject(json);
};

/**
 * jsonViewer
 * @param {spec} json
 * @param {boolean} collapsible
 * @param {object} theme
 * @returns
 */
function jsonViewer(json, collapsible = false, theme) {
  const TEMPLATESNOW = theme.JSONTEMPLATES ? theme.JSONTEMPLATES : JSONTEMPLATES;

  function createItem(key, value, type) {
    if (key.split('').length < 3) {
      key = '';
    }
    var element = TEMPLATESNOW.item;

    if (type == 'string') {
      element = element.replace('%VALUE%', '"' + value + '"').replace('%KEY%', `${key}: `);
    } else {
      element = element.replace('%VALUE%', value).replace('%KEY%', key);
    }

    element = element.replaceAll('%TYPE%', type);

    return element;
  }

  function createCollapsibleItem(key, value, type, children) {
    if (key.split('').length < 3) {
      key = '';
    }
    var tpl = 'itemCollapsible';

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
    if (key.split('').length < 3) {
      key = '';
    }
    var html = '';

    for (var item in value) {
      var _key = item,
        _val = merge(value[item]);
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

    return _result.replaceAll('undefined', '');
  }

  return parseObject(json);
}

/**
 * requestBodyViewer
 * @param {spec} json
 * @param {boolean} collapsible
 * @param {object} theme
 * @returns
 */
function requestBodyViewer(json, collapsible = false, theme = {}) {
  const custom = ['type', '[[Prototype]]', 'tags'];
  const TEMPLATESNOW = theme.REQUESTBODY ? theme.REQUESTBODY : REQUESTBODY;

  function createItem(key, value, type, desc = '') {
    let html = '';
    if (key.split('').length < 3) {
      key = '';
    }
    var element = TEMPLATESNOW.item.replaceAll('%KEY%', key);
    if (type === 'string') {
      element = element.replaceAll('%VALUE%', '"' + value + '"');
    } else {
      element = element.replaceAll('%VALUE%', value);
    }
    element = element.replaceAll('%TYPE%', type);
    element = element.replaceAll('%DESC%', desc);
    html += element;
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
    if (key.split('').length < 3) {
      key = '';
    }
    for (var item in value) {
      var _key = item,
        _val = merge(value[item]);
      if (_key.split('').length < 3) {
        _key = '';
      }
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
export {
  yamlToJson,
  jsonExample,
  yamlExample,
  loopInNestedObject,
  jsonViewer,
  requestBodyViewer,
  merge
};
