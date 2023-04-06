if (module.hot) {
module.hot.accept([])
}

var requireMap = { 'react': require('react') };
var requireInRuntimeBase = require("/Users/samayoub/sites2/react-packages/apidocpro-ui/node_modules/react-styleguidist/lib/loaders/utils/client/requireInRuntime").default;
var requireInRuntime = requireInRuntimeBase.bind(null, requireMap);
var evalInContextBase = require("/Users/samayoub/sites2/react-packages/apidocpro-ui/node_modules/react-styleguidist/lib/loaders/utils/client/evalInContext").default;
var evalInContext = evalInContextBase.bind(null, "const React$0 = require('react');\nconst React = React$0.default || (React$0['React'] || React$0);", requireInRuntime);

module.exports = [
{
'type': 'markdown',
'content': 'React component example:'
},
{
'type': 'code',
'content': '<Button size="large">Push Me</Button>',
'settings': {},
'evalInContext': evalInContext
},
{
'type': 'markdown',
'content': 'You can add a custom props to an example wrapper:'
},
{
'type': 'code',
'content': '<Button>I\u2019m transparent!</Button>',
'settings': { 'props': { 'className': 'checks' } },
'evalInContext': evalInContext
},
{
'type': 'markdown',
'content': 'Or add padding between examples in a block by passing the `padded` modifier:'
},
{
'type': 'code',
'content': '<Button>Push Me</Button>\n<Button>Click Me</Button>\n<Button>Tap Me</Button>',
'settings': { 'padded': true },
'evalInContext': evalInContext
},
{
'type': 'markdown',
'content': 'Or disable an editor by passing a `noeditor` modifier:'
},
{
'type': 'code',
'content': '<Button>Push Me</Button>',
'settings': { 'noeditor': true },
'evalInContext': evalInContext
},
{
'type': 'markdown',
'content': 'To render an example as highlighted source code add a `static` modifier:\n\n`jsx\n<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n`\n\nExamples with all other languages are rendered only as highlighted source code, not an actual component:\n\n`html\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Button</span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>large<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Push Me<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Button</span><span class="token punctuation">></span></span>\n`\n\nAny [Markdown](http://daringfireball.net/projects/markdown/) is **allowed** _here_.'
}
]
