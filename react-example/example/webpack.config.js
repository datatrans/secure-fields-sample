const path = require('path')

const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [path.resolve(__dirname, './src'), path.resolve(__dirname, '../src')]
    }]
  },
  entry: {
    main: ['./src/index.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      chunks:['app'],
      template: 'src/app.html',
      filename: 'app.html',
    })
  ],
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js'
  }
}
