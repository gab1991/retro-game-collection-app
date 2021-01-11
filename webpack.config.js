const { getStylesLoader } = require('./webpack/styles');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// probably can avoid this plugin by setting up aliases
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Fiber = require('fibers');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production' ? true : false;
const isDevelopment = process.env.NODE_ENV === 'development' ? true : false;

const sassRegex = /\.(scss|sass)$/;
const sassModulesRegex = /\.module\.(scss|sass)$/;

module.exports = {
  entry: './src/index',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'index_bundle.js',
  },
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: sassModulesRegex,
        use: getStylesLoader(),
      },
      {
        test: sassRegex,
        exclude: sassModulesRegex,
        use: getStylesLoader(),
      },
      {
        loader: require.resolve('file-loader'),
        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, sassRegex, sassModulesRegex],
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      // inject: 'body',
    }),
    // new MiniCssExtractPlugin({
    //   filename: isProduction ? '[name].[hash].css' : '[name].css',
    //   chunkFilename: isProduction ? '[id].[hash].css' : '[id].css',
    // }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.scss'],
    plugins: [new TsconfigPathsPlugin()],
    fallback: {
      buffer: require.resolve('buffer'),
    },
  },
};
