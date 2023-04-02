/* eslint-disable no-unused-vars */
// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import { ApiDocPro } from './lib/components';
// Custom Theme can be clones from Default example when needed
import * as THEME from './lib/components/templates/theme/default/apidocpro';
// Styles import
import './lib/components/templates/theme/default/assets/styles/apidocpro-styles.scss';

function App() {
  const [spec, setSpec] = useState('');
  const [loading, setLoading] = useState(true);
  const fetchAPIFile = (url) => {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        setSpec(data);
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    fetchAPIFile('/examples/asyncapi.json');
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
        rightRegion // Bool default true
        leftRegion // Bool default true
        header // Bool default true
        theme={THEME} // Object of const default can be clones for new theme design or contribute
        // spec={spec} // string
      />
    </div>
  );
}

export default App;
