/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

export const curlSnippet = (spec = {}, path = false, method = false) => {
  let id = '';
  let desc = '';
  if (!method || !path) {
    return '';
  }
  const generateCurl = () => {
    if (!method === '') {
      return '';
    }
    id = path
      .replaceAll(' ', '_')
      .replaceAll('.', '_')
      .replaceAll('{', '_')
      .replaceAll('}', '_')
      .replaceAll('/', '-')
      .replaceAll(',', '_');
    const operation = spec.paths[path][method];
    const url =
      spec?.servers && spec?.servers[0] ? spec?.servers[0]?.url + path : 'http://localhost' + path;
    const parameters = operation.parameters ? operation.parameters : [];
    desc = operation?.requestBody?.description ? operation?.requestBody?.description : '';
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    let queryParams = {};
    let body =
      operation?.requestBody &&
      operation?.requestBody['content'] &&
      operation?.requestBody['content']['application/json']
        ? operation?.requestBody['content']['application/json']?.schema['properties']
        : {};
    parameters.forEach((parameter) => {
      if (parameter.in === 'query') {
        queryParams[parameter.name] = parameter.default;
      } else if (parameter.in === 'header') {
        headers['--header ' + parameter.name] = parameter.default;
      } else if (parameter.in === 'body') {
        body = parameter.schema;
      }
    });
    const curlCommand = `curl --location --request ${method} \n '${url}' \n ${JSON.stringify(
      headers,
      null,
      2
    )} 
    \n ${body ? `--data-raw  ${JSON.stringify(body, null, 2)}` : ''}`;
    return curlCommand;
  };
  const result = `${generateCurl()}`;
  const final = `<div class="col-md-12 maxw-100 text-left"><b>${path} CuRL Example</b><p>${desc}</p><div class="shadow-sm bg-dark text-light maxw-100 rounded "><pre class="border  text-left" >${result}</pre></div></div>`;

  //   const parentElement = document.getElementById('apidocpro-rightregion');
  //   const pre = document.createElement('div');
  //   pre.setAttribute('class', 'text-left p-1 mt-5');
  //   pre.setAttribute('id', `apidocpro-rightregion-${id}`);
  //   pre.innerHTML = final;
  //   parentElement?.appendChild(pre);
  return final;
};
