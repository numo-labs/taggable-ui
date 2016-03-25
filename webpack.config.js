var NpmInstallPlugin = require('npm-install-webpack-plugin');

module.exports = {
  entry: {
    javascript: './src/index.js',
    html: './src/index.html'
  },
  output: {
    filename: 'index.js',
    path: __dirname + '/dist'
  },
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
      {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new NpmInstallPlugin({
      save: true
    })
  ]
};
