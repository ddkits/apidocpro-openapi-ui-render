/* eslint-disable no-unused-vars */
// import { responsesFromPath } from '../core/codesnippets';
import { methodRequestBody } from '../core/codesnippets/methodRequestBody';
import { methodResponses } from '../core/codesnippets/methodResponses';
import { PATHS, TABS } from '../templates/theme/default/apidocpro';
import { parametersTable } from './assets/parameters';
import { resolveRef } from './resolver';

/* eslint-disable no-unused-vars */

const loopInNestedObjectPaths = (
  json = {},
  collapsible = false,
  mainKey = '',
  schemas = {},
  theme = {}
) => {
  const custom = [
    'tags',
    'components',
    'description',
    'summary',
    'methods',
    'method',
    'parameters',
    'responses',
    'requestBody',
    'paths',
    'x-examples',
    'security',
    'method',
    'operationId'
  ];
  const PATHSNOW = theme.PATHS ? theme.PATHS : PATHS;
  const TABSNOW = theme.TABS ? theme.TABS : TABS;
  function createItem(key, value, type) {
    if (value !== '' && key !== '') {
      var element = PATHSNOW.item.replaceAll('%KEY%', key);
      if (key === '$ref') {
        value = resolveRef(value, schemas);
      }

      if (type == 'string') {
        element = element.replaceAll('%VALUE%', '"' + value + '"').replaceAll('%KEY%', key);
      } else {
        element = element.replaceAll('%VALUE%', value).replaceAll('%KEY%', key);
      }
      element = element.replaceAll('%TYPE%', type.toUpperCase()).replaceAll('%KEY%', key);

      if (!custom.includes(key)) {
        return element;
      }
    } else {
      return '';
    }
  }

  function createCollapsibleItem(key, value, type, children) {
    var tpl = 'itemCollapsible';
    if (!custom.includes(key)) {
      tpl = 'itemCollapsibleOpen';
    } else if (collapsible) {
      tpl = 'itemCollapsibleOpen';
    }

    var element = PATHS[tpl].replaceAll(
      '%KEY%',
      value?.title || value?.name || value?.summary || value?.description || key || 'unknown'
    );

    element = element.replaceAll('%VALUE%', type.toUpperCase()).replaceAll('%KEY%', key);
    element = element.replaceAll('%TYPE%', type.toUpperCase()).replaceAll('%KEY%', key);
    element = element.replaceAll('%CHILDREN%', children);

    return element;
  }

  const handleChildren = (key, value, type) => {
    let html = '';

    for (var item in value) {
      let _key = item,
        _val = value[item];
      if (_key == 'parameters') {
        const res = parametersTable(_val);
        html += `<hr><h4 class="p-3">Parameters</h4>${res}`;
      } else if (_key === 'responses') {
        const res = methodResponses(_val, theme, schemas, key + Math.random());
        html += `<hr><h4 class="p-3">Responses</h4>${res}`;
      } else if (_key === 'requestBody') {
        const res = methodRequestBody(_val, mainKey, '', '', '', _key);
        html += `<hr><h4 class="p-3">Request body</h4>${res}`;
      } else if (!custom.includes(_key)) {
        html += handleItem(_key, _val);
      } else {
        continue;
      }
    }
    return createCollapsibleItem(key, value, type, html.replaceAll(' , ', ''));
  };

  function handleItem(key, value) {
    var type = typeof value;

    if (typeof value === 'object') {
      return handleChildren(key, value, type);
    } else if (!custom.includes(key)) {
      return createItem(key, value, type);
    } else {
      return '';
    }
  }

  function parseObject(obj) {
    const idLabel = obj
      ? obj?.summary
        ? obj?.summary
        : obj?.description
        ? obj?.description
        : obj?.operationId
        ? obj?.operationId
        : mainKey
      : '';

    const href = idLabel
      .replaceAll(' ', '_')
      .replaceAll('.', '')
      .replaceAll('{', '')
      .replaceAll('}', '')
      .replaceAll('/', '_');
    let _result = `<section class="container-fluid border p-3" id="${href}"><details ${
      collapsible && collapsible ? 'open' : ''
    }><summary>
    <b class="apidocpro-${mainKey.replaceAll('/', '-')}-parent">${mainKey}</b>
    <span class="pull right">${obj['summary'] ? obj['summary'] : ''}</span>
    </summary>
    <span class="apidocpro-${mainKey.replaceAll('/', '-')}-parent-description">${
      obj['description'] ? obj['description'] : ''
    }</span>
    <div class="container-fluid">
    ${TABSNOW.tabsStart.replaceAll('%TABSID%', 'nav-tab')}
 `;
    let activeTab = 'show active';
    // Create tabs
    Object.keys(obj).map((item) => {
      let key = item,
        value = obj[item];

      if (custom.includes(key)) {
        return '';
      }
      const idLabel = obj[item]?.summary || obj[item]?.operationId || item;
      const href = idLabel
        .replaceAll(' ', '_')
        .replaceAll('.', '')
        .replaceAll('{', '')
        .replaceAll('}', '')
        .replaceAll(',', '');
      _result += TABSNOW.tabLink
        .replaceAll('%TABID%', href)
        .replaceAll('%ACTIVE%', activeTab)
        .replaceAll('%TABLABEL%', key.toUpperCase().replaceAll(' , ', '').replaceAll('\n,\n', ''));
      activeTab = '';
    });
    _result += TABSNOW.tabsLinksEnd;
    let active = 'show active';
    Object.keys(obj).map((item) => {
      let key1 = item,
        value1 = obj[item];
      let responses;
      const idLabel = obj[item]?.summary || obj[item]?.operationId || item;
      const href = idLabel
        .replaceAll(' ', '_')
        .replaceAll('.', '')
        .replaceAll('{', '')
        .replaceAll('}', '')
        .replaceAll(',', '_');
      if (custom.includes(key1) || value1.length === 0) {
        return '';
      }
      if (!custom.includes(key1)) {
        responses = handleItem(key1, value1);
      }

      let content = ` <div >
    <div  class="bold apidocpro__method--${item}">${item}
    </div><b>Summary</b> ${obj[item].summary || ''}
    <div class="bold smaller " >${obj[item]?.description || ''}
    ${responses}
    </div></div  class=" shadow-sm p-3 mb-1 col-md-12 pt-3 rounded ">`;
      _result += TABSNOW.tabContent
        .replaceAll('%TABID%', href)
        .replaceAll('%ACTIVE%', active)
        .replaceAll('%TABCONTENT%', content.replaceAll(' , ', '').replaceAll('\n,\n', ''));
      active = '';
    });
    _result += TABSNOW.tabsEnd;
    _result += '</div></div></details></section>';
    return _result;
  }

  return parseObject(json);
};

export { loopInNestedObjectPaths };
