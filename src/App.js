/* eslint-disable no-unused-vars */
// import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import { ApiDocPro } from './lib/components';
// Custom Theme can be clones from Default example when needed
import * as THEME from './lib/components/theme/default/default';
// Custom Theme can be clones from green example when needed
// import * as GREEN from './lib/components/theme/green/apidocpro';
// Custom Theme can be clones from noTheme example when needed
// import * as NOTHEME from './lib/components/theme/noTheme/apidocpro';
// Custom Theme can be clones from red example when needed
// import * as RED from './lib/components/theme/red/apidocpro';

function App() {
  const [spec, setSpec] = useState();
  const [loading, setLoading] = useState(true);
  const fetchAPIFile = (url) => {
    setLoading(true);
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        setSpec(data);
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    fetchAPIFile(
      'https://raw.githubusercontent.com/ddkits/apidocpro-openapi-ui-render/main/src/lib/components/templates/examples/Testing.json'
    );
  }, []);

  return loading ? (
    <div className="App">
      {' '}
      <div className="container justify-content-middle">
        <i className="fa-solid fa-sync fa-spin"></i>
      </div>
    </div>
  ) : (
    <div className="App">
      <ApiDocPro
        title="APIDocPro OpenAPI/AysncAPI UI"
        rightregion={true} // Bool default false
        leftregion={true} // Bool default false
        header={true} // Bool default false
        theme={THEME} // Object of const default can be clones for new theme design or contribute
        spec={spec} // string/object
      />
    </div>
  );
}

export default App;
