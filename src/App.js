// import logo from './logo.svg';
import './App.css';
import { ApiDocPro } from './lib/components';
// Custom Theme can be clones from Default example when needed
import * as THEME from './lib/components/templates/theme/default/apidocpro';

function App() {
  return (
    <div className="App">
      <ApiDocPro
        title="APIDocPro OpenAPI UI"
        rightRegion // Bool default true
        leftRegion // Bool default true
        header // Bool default true
        theme={THEME} // Object of const default can be clones for new theme design or contribute
        spec={`openapi.json || openapi.yaml`}
      />
    </div>
  );
}

export default App;
