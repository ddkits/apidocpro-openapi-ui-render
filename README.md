# Getting Started with APIDocPro UI renderrer for Swagger, OpenAPI and AsyncAPI


### Comming Soon full docmumention

Code Base:
1- ReactS
2- Bootstrap

Features: 
1- Codesnipets
2- Logical design of parameters
3- Auto generate Examples from Paramters 
4- Easy control of design
5- Custom theming is simpler than ever, no need to be an expert in React to redesign 
6- 3,2,1 columns by need
...


![apidocpro UI openapi render](./screenshots/APIDocpro-UIat 10.17.25 PM.png)
![apidocpro UI openapi render](./screenshots/APIDocpro-UIat 10.17.43 PM.png)
![apidocpro UI openapi render](./screenshots/APIDocpro-UIat 10.17.53 PM.png)
![apidocpro UI openapi render](./screenshots/APIDocpro-UIat 10.17.58 PM.png)
![apidocpro UI openapi render](./screenshots/APIDocpro-UIat 10.18.04 PM.png)
![apidocpro UI openapi render](./screenshots/APIDocpro-UIat 10.18.21 PM.png)
![apidocpro UI openapi render](./screenshots/APIDocpro-UIat 10.18.43 PM.png)
![apidocpro UI openapi render](./screenshots/APIDocpro-UIat 10.19.00 PM.png)




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
