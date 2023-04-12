### Theming

Theming is simple with APIDocPro UI render, it's 100% controlable by the end user





### Out of the box themes

- Default
```text
// Default example

import * as THEME from 'openapi-asyncapi-ui-render/theme/default/apidocpro';

```

- Red
```text
//  Red example 

import * as THEME from 'openapi-asyncapi-ui-render/theme/red/apidocpro';

```

- Green
```text
//  Green example 

import * as THEME from 'openapi-asyncapi-ui-render/theme/green/apidocpro';

```

- No theme
```text
//  noTheme example

import * as THEME from 'openapi-asyncapi-ui-render/theme/noTheme/apidocpro';

```

### Custom option 
To use Styles import directly with custom from different parts of different themes

```text
//  Red example when needed
// Styles import
import 'openapi-asyncapi-ui-render/theme/red/assets/styles/apidocpro-styles.scss';

//  Green example when needed
// Styles import
import 'openapi-asyncapi-ui-render/theme/red/assets/styles/apidocpro-theming.scss';
```

### Create custom theme

Basic file structure to customize your own theme
```js {"file": "../noTheme/noTheme.js"}


```
