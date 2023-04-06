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

import { requestBodyViewer } from '../../helpers';
import CurlSnippet from './langs/CurlSnippet';

function methodRequestBody(spec, path, server, reqtype, description, method) {
  let result = '<section class="container-fluid d-block ">';
  let properties = [];
  let typeNow = '';
  let descriptionNow = description ? description : '';

  // Extract the properties from the schema
  Object.keys(spec).map((key) => {
    switch (key) {
      case 'content':
        result += requestBodyViewer(spec[key], true);
        break;
      case 'description':
      case 'summary':
        descriptionNow = spec[key];
        break;
      default:
        break;
    }
  });

  return `${result}</section>`;
}

export { methodRequestBody };
