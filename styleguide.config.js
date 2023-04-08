const path = require('path');
const fs = require('fs');
let { version } = require('./package');
/* eslint-disable no-undef */
module.exports = {
  require: [path.resolve(__dirname, 'styleguide/setup.js')],

  sections: [
    {
      content: 'docs/introduction.md'
    },
    {
      name: 'Documentation',
      sections: [
        {
          name: 'Installation',
          content: 'docs/installation.md'
        },
        {
          name: 'Configuration',
          content: 'docs/configuration.md'
        },
        {
          name: 'APIDocPro Editor',
          external: true,
          href: 'https://apidocpro.com/editor'
        }
      ]
    },
    {
      name: 'Live example Application',
      components: 'src/app.js'
      //   defaultExample: true,
    },
    {
      name: 'Contributors',
      content: 'docs/contributors.md'
      //   defaultExample: true,
    },
    {
      name: 'Themes',
      components: 'src/lib/components/templates/theme/**/*.js',
      defaultExample: false
    },
    {
      name: 'OpenAPI AsyncAPI UI Render',
      components: 'src/lib/**/*.js',
      exclude: 'src/lib/components/templates/theme/**/*.js',
      defaultExample: true
    }
  ],
  moduleAliases: {
    'rsg-example': path.resolve(__dirname, 'src')
  },
  components: 'src/**/[A-Z]*.js',
  usageMode: 'expand',
  version,
  ribbon: {
    text: 'Sponsor Me!',
    url: 'https://opencollective.com/reallexi'
  },
  version,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    }
  },
  exampleMode: 'hide', // 'hide' | 'collapse' | 'expand'
  usageMode: 'hide', // 'hide' | 'collapse' | 'expand',
  updateExample(props, exampleFilePath) {
    // props.settings are passed by any fenced code block, in this case
    const { settings, lang } = props;
    // "../mySourceCode.js"
    if (settings?.file && typeof settings.file === 'string') {
      // "absolute path to mySourceCode.js"
      const filepath = path.resolve(exampleFilePath, settings.file);
      // displays the block as static code
      settings.static = true;
      // no longer needed
      delete settings.file;
      return {
        content: fs.readFileSync(filepath, 'utf8'),
        settings,
        lang
      };
    }
    return props;
  },
  theme: {
    color: {
      base: '#000000',
      light: '#0f3452',
      lightest: '#ccc',
      link: '#FFFFFF',
      linkHover: '#343a40',
      focus: 'rgba(22, 115, 177, 0.25)',
      border: '#e8e8e8',
      name: '#f8f9fa',
      type: '#905',
      error: '#c00',
      baseBackground: '#fff',
      codeBackground: '#000',
      sidebarBackground: '#007bff',
      ribbonBackground: '#007bff',
      ribbonText: '#fff',
      // Based on default Prism theme
      codeBase: '#fff',
      codeComment: '#6d6d6d',
      codePunctuation: '#999',
      codeProperty: '#905',
      codeDeleted: '#905',
      codeString: '#690',
      codeInserted: '#690',
      codeOperator: '#9a6e3a',
      codeKeyword: '#1673b1',
      codeFunction: '#DD4A68',
      codeVariable: '#e90'
    },
    spaceFactor: 10,
    sidebarWidth: 300,
    maxWidth: 1400,
    fontFamily: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    }
  },
  styles: {}
};
