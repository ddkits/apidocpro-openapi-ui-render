/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import beautify from 'js-beautify';
import { curlSnippet } from '../../core/codesnippets/langs/CurlSnippet';

export default function RightRegion(props) {
  // eslint-disable-next-line no-unused-vars
  const { data } = props;
  const [codeSnippetsPaths, setCodeSnippetsPaths] = useState([]);
  const [codeSnippets, setCodeSnippets] = useState('');
  const [pathChange, setpathChange] = useState('');
  const [methodChange, setMethodChange] = useState('');
  const [codeSnippetsMethods, setCodeSnippetsMethods] = useState([]);

  const createCodeRequests = async (data) => {
    const paths = data?.paths || {};
    let pathsList = [];

    await Object.keys(paths).forEach((path) => {
      pathsList.push({ key: path, methods: [] });
    });
    await pathsList.forEach((x) => {
      const p = x.key;
      Object.keys(paths[p]).forEach((key) => {
        x.methods.push({ method: key, code: curlSnippet(data, p, key) });
      });
    });

    setCodeSnippetsPaths(pathsList);
    setCodeSnippetsMethods(pathsList[0].methods);
    setCodeSnippets(pathsList[0].methods[0].code);
    return;
  };
  useEffect(() => {
    createCodeRequests(data);
  }, []);
  useEffect(() => {
    if (pathChange !== '') {
      setCodeSnippetsMethods(codeSnippetsPaths[pathChange].methods);
      setCodeSnippets(codeSnippetsPaths[pathChange].methods[0]?.code);
    }
  }, [pathChange]);
  useEffect(() => {
    if (pathChange !== '') {
      setCodeSnippetsMethods(codeSnippetsPaths[pathChange].methods);
      setCodeSnippets(codeSnippetsPaths[pathChange].methods[methodChange]?.code);
    }
  }, [methodChange]);

  return (
    <div className=" pt-5 mt-5  sticky-top  bg-dark text-light ">
      <div id="apidocpro-codesnippet" className="shadow-sm maxw-100 rounded">
        <h3>Request Example(s)</h3>

        <div className="d-flex ">
          <select
            className="col"
            value={pathChange}
            onChange={(e) => setpathChange(e.target.value)}>
            {codeSnippetsPaths.length &&
              Object.keys(codeSnippetsPaths).map((xx) => {
                return (
                  <option key={codeSnippetsPaths[xx].key} value={xx}>
                    {codeSnippetsPaths[xx].key}
                  </option>
                );
              })}
          </select>
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
        </div>
        <div className="json" dangerouslySetInnerHTML={{ __html: codeSnippets }} />
      </div>
    </div>
  );
}
RightRegion.propTypes = {
  data: propTypes.any,
  path: propTypes.string,
  theme: propTypes.object,
  resolved: propTypes.any
};
