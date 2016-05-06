var webpack = require('webpack');

module.exports = {
  entry: {
    javascript: './src/index.js',
    html: './src/index.html'
  },
  output: {
    filename: 'index.js',
    path: __dirname + '/dist'
  },
  plugins: [
    new webpack.IgnorePlugin(/^(buffertools)$/) // unwanted "deeper" dependency
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
};
