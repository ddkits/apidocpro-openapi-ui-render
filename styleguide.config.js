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
      name: 'OpenAPI AsyncAPI UI Render',
      components: 'src/lib/**/*.js',
      defaultExample: true
    },
    {
      name: 'Contributors',
      content: 'docs/contributors.md'
      //   defaultExample: true,
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
      link: 'firebrick',
      linkHover: 'salmon'
    },
    spaceFactor: 10,
    sidebarWidth: 300,
    maxWidth: 1400,
    fontFamily: {
      base: '"Comic Sans MS", "Comic Sans", cursive'
    }
  },
  styles: {}
};
