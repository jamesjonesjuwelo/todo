const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("@babel/polyfill");

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: 'MHP',
  filename: 'index.html',
  template: './template.html'
});

module.exports = {
  mode: 'none',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Components: path.resolve(__dirname, 'src/components/'),
      Views: path.resolve(__dirname, 'src/views/'),
    }
  },
  entry: ["@babel/polyfill",'./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ]
  },
  plugins: [htmlWebpackPlugin],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    publicPath: '/',
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://anapioficeandfire.com/',
        "changeOrigin": true,
      }

    }
  },
  devtool: 'eval-source-map'
};