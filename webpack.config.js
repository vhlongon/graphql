const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const pkg = require('./package').name;

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    library: pkg.name,
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './client/index.html'
    }),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 8082,
      proxy: 'http://localhost:8081/',
      files: [
        'dist/css/*.css',
        'dist/images/*.*',
        '**/*.html',
        '!node_modules/**/*.html'
      ]
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'client'),
    historyApiFallback: true,
    hot: true,
    port: 8081
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'client')]
      }
    ]
  }
};
