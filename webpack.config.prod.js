const merge = require('webpack-merge');
const config = require('./webpack.config.base.js');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = merge(config, {
  mode: 'production',
  plugins: [

    // remove all unused code
    new webpack.optimize.UglifyJsPlugin({
      'compress': { 'warnings': false },
      'sourceMap': false,
      'comments': false,
      'mangle': true,
      'minimize': true
    }),

    // notify on succesful build
    new WebpackBuildNotifierPlugin({ 'title': 'build complete' }),
    
    // skip the emitting phase whenever there are errors while compiling
    new webpack.NoEmitOnErrorsPlugin(),
    
    // Generate HTML on the fly.
    // All chunks created by webpack will be automatically injected
    // If you already have a template file and want to use your own, specify the path on the template property.
    new HtmlWebpackPlugin({
      'filename': 'index.html',
      'template': 'src/index.html',
      'inject': true
    }),
    
    // GZIP the files
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(js|css)$'
      ),
      threshold: 10240,
      minRatio: 0.8
    }),
  ]
});

// Important to note: the tests will in fact run in node, NOT in the browser
config.target = 'node';

module.exports = config;
