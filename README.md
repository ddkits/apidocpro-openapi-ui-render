# Getting Started with APIDocPro UI renderrer for Swagger, OpenAPI and AsyncAPI


Comming Soon full docmumention

```
import { ApiDocPro } from '....';
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

```

#### By Sam Ayoub
##### APIDocPro.com