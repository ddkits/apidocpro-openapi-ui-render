const path = require('path');
const fs = require('fs');
let { version } = require('./package');
/* eslint-disable no-undef */
module.exports = {
  require: [path.resolve(__dirname, 'styleguide/setup.js')],
  printBuildInstructions(config) {
    console.log(`Style guide published to ${config.styleguideDir}. Something else interesting.`);
  },
  styles: function () {
    return {
      logo: {
        logo: {
          // we can now change the color used in the logo item to use the theme's `link` color
          color: 'rgba(22, 115, 177, 0.25)'
        }
      }
    };
  },
  skipComponentsWithoutExample: true,
  sections: [
    {
      name: 'Home',
      external: true,
      href: 'https://ui.apidocpro.com'
    },
    {
      name: 'Introduction',
      content: 'docs/introduction.md'
    },
    {
      name: 'Documentation',
      description:
        'API Doc Pro UI Render, is the smallest and fastest Async and Open API UI rendering, using React and Bootstrap.',
      sections: [
        {
          name: 'Installation',
          content: 'docs/installation.md',
          description: 'Simple to use'
        },
        {
          name: 'Configuration',
          content: 'docs/configuration.md',
          description: 'Simple to configure using the examples below, also simple React ref'
        },
        {
          name: 'APIDocPro Editor',
          external: true,
          href: 'https://apidocpro.com/editor',
          description: 'Example of a Laravel/React base editor, for live preview'
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
      name: 'Core',
      components: 'src/lib/components/core/**/*.js',
      defaultExample: false,
      sectionDepth: 0
    },
    {
      name: 'Templates',
      components: 'src/lib/components/templates/**/*.js',
      defaultExample: false,
      sectionDepth: 0
    },
    {
      name: 'Themes & Theming',
      content: 'src/lib/components/theme/Readme.md',
      sectionDepth: 0
    },
    {
      name: 'Helpers',
      components: 'src/lib/components/helpers/**/*.js',
      defaultExample: false,
      sectionDepth: 0
    }
  ],
  moduleAliases: {
    'rsg-example': path.resolve(__dirname, 'src')
  },
  components: 'src/**/[A-Z]*.js',
  version,
  ribbon: {
    text: 'Sponsor Me!',
    url: 'https://opencollective.com/reallexi'
  },
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
  // Don't include an Object.assign ponyfill, we have our own
  pagePerSection: process.env.NODE_ENV !== 'production',
  mountPointId: 'apidocpro',
  tocMode: 'collapse', //'collapse' | 'expand'
  exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
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
  }
};
