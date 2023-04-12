# Getting Started with APIDocPro UI renderrer for Swagger, OpenAPI and AsyncAPI

API Doc Pro UI is the best choice for dynamically rendering any spec SwaggerAPI, OpenAPI, or AsyncAPI, all in one with one design. By Reallexi LLC @ Apidocpro.com

## Documentation and live demo
https://ui.apidocpro.com

### Get started

```
npm i openapi-asyncapi-ui-render
```

- React

```
...
// React Component
import {ApiDocPro, APIDOCPROTHEME} from 'openapi-asyncapi-ui-render'
// Custom Theme can be clones from Default example when needed
import {ApiDocPro, APIDOCPROTHEME} from 'openapi-asyncapi-ui-render/dist/components'

...

   <ApiDocPro
        title="APIDocPro OpenAPI/AysncAPI UI"
        rightRegion // Bool default true
        leftRegion // Bool default true
        header // Bool default true
        theme={APIDOCPROTHEME} // Object of const default can be clones for new theme design or contribute
        spec={spec} // string
      />
...
```

### Funding / sponsors

https://opencollective.com/reallexi

### Based on:

- 1- ReactS
- 2- Bootstrap

### Features

- Features:
- 1- Code snippets
- 2- Logical design of parameters
- 3- Auto generate Examples from Parameters
- 4- Easy control of the design
- 5- Custom theming is simpler than ever, no need to be an expert in React to redesign
- 6- 3,2,1 columns by the need

## OpenAPI

![apidocpro UI openapi render](https://github.com/ddkits/apidocpro-openapi-ui-render/raw/main/screenshots/APIDocpro-UIat%2010.17.25%20PM.png)
![apidocpro UI openapi render](https://github.com/ddkits/apidocpro-openapi-ui-render/raw/main/screenshots/APIDocpro-UIat%2010.17.43%20PM.png)
![apidocpro UI openapi render](https://github.com/ddkits/apidocpro-openapi-ui-render/raw/main/screenshots/APIDocpro-UIat%2010.17.53%20PM.png)
![apidocpro UI openapi render](https://github.com/ddkits/apidocpro-openapi-ui-render/raw/main/screenshots/APIDocpro-UIat%2010.17.58%20PM.png)
![apidocpro UI openapi render](https://github.com/ddkits/apidocpro-openapi-ui-render/raw/main/screenshots/APIDocpro-UIat%2010.18.04%20PM.png)
![apidocpro UI openapi render](https://github.com/ddkits/apidocpro-openapi-ui-render/raw/main/screenshots/APIDocpro-UIat%2010.18.21%20PM.png)
![apidocpro UI openapi render](https://github.com/ddkits/apidocpro-openapi-ui-render/raw/main/screenshots/APIDocpro-UIat%2010.18.43%20PM.png)
![apidocpro UI openapi render](https://github.com/ddkits/apidocpro-openapi-ui-render/raw/main/screenshots/APIDocpro-UIat%2010.19.00%20PM.png)
![apidocpro UI swagger render](https://github.com/ddkits/apidocpro-openapi-ui-render/raw/main/screenshots/swagger.png)
![apidocpro UI openapi example 1 render](https://github.com/ddkits/apidocpro-openapi-ui-render/raw/main/screenshots/example2.png)
![apidocpro UI openapi example 2 render](https://github.com/ddkits/apidocpro-openapi-ui-render/raw/main/screenshots/example1.png)

## AsyncAPI

![apidocpro UI Asyncapi render](https://github.com/ddkits/apidocpro-openapi-ui-render/raw/main/screenshots/asyncapi1.png)
![apidocpro UI Asyncapi Kafka render](https://github.com/ddkits/apidocpro-openapi-ui-render/raw/main/screenshots/kafka-asyncapi.png)

```
/* eslint-disable no-unused-vars */
// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import { ApiDocPro } from 'openapi-asyncapi-ui-render';
// Custom Theme can be clones from Default example when needed
import * as THEME from 'openapi-asyncapi-ui-render/theme/default/apidocpro';
// Styles import
import 'openapi-asyncapi-ui-render/templates/theme/default/assets/styles/apidocpro-styles.scss';

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
        spec={spec} // string
      />
    </div>
  );
}

export default App;

```
### Themes available
- APIDOCPROTHEME : default
- APIDOCPROTHEMEGREEN : Green style
- APIDOCPRONOTHEME : no extra styles

```
import { ApiDocPro } from 'openapi-asyncapi-ui-render'
// or
import { ApiDocPro } from 'openapi-asyncapi-ui-render/dist/components'


```



#### By Sam Ayoub

##### APIDocPro.com
