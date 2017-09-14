const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { server } = require('./config');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.jsx$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader'],
        }),
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './client/index.html',
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      publicPath: '/public/',
    }),
    // new BrowserSyncPlugin({
    //   host: 'localhost',
    //   port: server.port,
    //   proxy: `http://localhost:${server.port}/`,
    //   ui: {
    //     port: server.browserSyncUiPort,
    //   },
    //   files: [
    //     'dist/css/*.css',
    //     'dist/images/*.*',
    //     '**/*.html',
    //     '!node_modules/**/*.html',
    //   ],
    // }),
  ],
};
