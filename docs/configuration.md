To configure the basic usage of APIDocPro UI render for any of the specifications, what you need to do is to import the package 

### CDN
```html
<script src="">
```


### React

```text
// React Component
import { ApiDocPro } from 'openapi-asyncapi-ui-render'
// Custom Theme can be clones from Default example when needed
import * as THEME from 'openapi-asyncapi-ui-render/theme/default/apidocpro';
// Styles import
import 'openapi-asyncapi-ui-render/templates/theme/default/assets/styles/apidocpro-styles.scss';

...

   <ApiDocPro
        title="APIDocPro OpenAPI/AysncAPI UI"
        rightRegion // Bool default true
        leftRegion // Bool default true
        header // Bool default true
        theme={APIDOCPROTHEME} // Object of const default can be clones for new theme design or contribute
        spec={spec} // string
      />
```