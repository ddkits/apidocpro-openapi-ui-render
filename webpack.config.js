const path = require('path');
const glob = require('glob');

module.exports = {
  entry: {
    'bundle.js': glob
      .sync('build/static/?(js|css)/main.*.?(js|css)')
      .map((f) => path.resolve(__dirname, f))
  },
  output: {
    filename: 'build/static/js/bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  watch: true
};
