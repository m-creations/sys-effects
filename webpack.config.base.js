var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    es5Shim: 'es5-shim',
    jQueryUi: 'webpack-jquery-ui',
    jquiDraggable: 'webpack-jquery-ui/draggable',
    jquiDroppable: 'webpack-jquery-ui/droppable',
    app: './src/app.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '/dist/'),
    pathinfo: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['babel-preset-env']
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.s[ac]ss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.less$/, loader: 'less-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      // inline base64 URLs for <=8k images, direct URLs for the rest
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      // helps to load bootstrap's css.
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.woff2$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=image/svg+xml' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // expose $, jQuery and window.jQuery to global scope (needed for angular-dragndrop)
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": 'jquery',
      "window.$": 'jquery'
    })
  ],
  devServer: {
    publicPath: '/',
    contentBase: path.join(__dirname, '/src'),
    compress: true,
    host: "0.0.0.0",
    port: 8080
  },
  devtool: 'eval'
}
