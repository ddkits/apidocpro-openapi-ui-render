/**
 * ApiDocPro UI render, for AsyncAPI, Swagger and OpenApi
 * Built by Sam Ayoub, DDKits.com
 * https://github.com/ddkits
 * APIdocPro UI render based on React and Bootstrap, with the ability to contribute, modify and create different themes to be used.
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { curlSnippet } from '../../core/codesnippets/langs/CurlSnippet';
import { codeRequestSetup } from '../../core/codesnippets/codeRequestSetup';
import { jsonViewer } from '../../helpers';
import { jsonViewerAsync } from '../../helpers/async';

export default function RightRegion(props) {
  // eslint-disable-next-line no-unused-vars
  const { data, spectype, theme } = props;
  const [codeSnippetsPaths, setCodeSnippetsPaths] = useState([]);
  const [codeSnippets, setCodeSnippets] = useState([]);
  const [pathChange, setpathChange] = useState('');
  const [methodChange, setMethodChange] = useState('');
  const [codeSnippetsMethods, setCodeSnippetsMethods] = useState([]);

  const createCodeRequests = async (data) => {
    const paths = data?.paths || {};
    let pathsList = [];

    await Object.keys(paths).forEach((path) => {
      if (path.split('').length < 2) {
        path = typeof path.toUpperCase();
      }
      pathsList.push({ key: path, methods: [] });
    });
    await pathsList.forEach((x) => {
      let p = x.key;
      if (p.split('').length < 2) {
        p = typeof p.toUpperCase();
      }
      Object.keys(paths[p]).forEach((key) => {
        x.methods.push({ method: key, code: curlSnippet(data, p, key, spectype, theme) });
      });
    });

    setCodeSnippetsPaths(pathsList);
    setCodeSnippetsMethods(pathsList[0].methods);
    setCodeSnippets(pathsList[0].methods[0].code);
    return;
  };
  const createAsyncCodeRequests = async (data) => {
    const channels = data?.channels || {};
    let componentsList = [];
    await Object.keys(channels).forEach((item) => {
      componentsList.push({ key: item, methods: [] });
    });
    await componentsList.forEach((x) => {
      const p = x.key;
      Object.keys(channels[p]).forEach((key) => {
        const nowKey = channels[p][key]?.parameters || channels[p][key];
        x.methods.push({ method: key, code: nowKey });
      });
    });

    setCodeSnippetsPaths(componentsList);
    setCodeSnippetsMethods(componentsList[0].methods);
    setCodeSnippets(jsonViewerAsync(componentsList[0].methods, true, theme));
    return;
  };

  useEffect(() => {
    if (spectype === 'openapi' || spectype === 'swagger') {
      createCodeRequests(data);
    } else if (spectype === 'asyncapi') {
      createAsyncCodeRequests(data);
    }
  }, [data]);
  useEffect(() => {
    if (pathChange !== '' && spectype !== 'asyncapi') {
      const results = codeSnippetsPaths[pathChange].methods[0]?.code;
      setCodeSnippetsMethods(codeSnippetsPaths[pathChange].methods);
      setCodeSnippets(results);
    } else if (pathChange !== '') {
      const results = jsonViewerAsync(codeSnippetsPaths[pathChange].methods, true, theme);
      setCodeSnippets(results);
    }
  }, [pathChange]);
  useEffect(() => {
    if (pathChange !== '' && spectype !== 'asyncapi') {
      const results = codeSnippetsPaths[pathChange].methods[methodChange]?.code;
      setCodeSnippetsMethods(codeSnippetsPaths[pathChange].methods);
      setCodeSnippets(results);
    } else if (pathChange !== '') {
      const results = jsonViewerAsync(codeSnippetsPaths[pathChange].methods, true, theme);
      setCodeSnippets(results);
    }
  }, [methodChange]);
  return (
    <div className=" pt-5 mt-5 bg-dark text-light ">
      <div id="apidocpro-codesnippet" className="shadow-sm maxw-100 rounded">
        <h3>
          {spectype === 'openapi'
            ? `Request Example(s)`
            : spectype === 'asyncapi'
            ? `Channel(s)`
            : 'RightRegion'}
        </h3>

        <div className="d-flex">
          <select
            className="col"
            value={pathChange}
            onChange={(e) => setpathChange(e.target.value)}>
            {codeSnippetsPaths.length &&
              Object.keys(codeSnippetsPaths).map((xx) => {
                return (
                  <option className=" maxw-100" key={codeSnippetsPaths[xx].key} value={xx}>
                    {codeSnippetsPaths[xx].key}
                  </option>
                );
              })}
          </select>
          {spectype !== 'asyncapi' ? (
            <select
              className="col"
              value={methodChange}
              onChange={(e) => setMethodChange(e.target.value)}>
              {codeSnippetsMethods.length &&
                Object.keys(codeSnippetsMethods).map((xx) => {
                  return (
                    <option key={codeSnippetsMethods[xx].method} value={xx}>
                      {codeSnippetsMethods[xx].method}
                    </option>
                  );
                })}
            </select>
          ) : (
            ''
          )}
        </div>
        <div
          className="json"
          dangerouslySetInnerHTML={{
            __html: codeSnippets
          }}
        />
      </div>
    </div>
  );
}
RightRegion.propTypes = {
  data: propTypes.any,
  path: propTypes.string,
  spectype: propTypes.string,
  theme: propTypes.object,
  resolved: propTypes.any
};
