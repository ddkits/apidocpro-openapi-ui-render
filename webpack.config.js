const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: path.join(__dirname, 'app.js'),
  devtool: '#source-map',
  mode: 'development',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor/vendor-manifest.json')
    }),
    new HtmlWebpackPlugin(),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, './build/vendor.js')
    })
  ]
};

module.exports = {
  entry: ['./src/lib/components/pro/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
  // optimization: { minimize: false },
};
