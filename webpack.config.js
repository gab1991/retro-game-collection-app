const { getStylesLoader } = require('./webpack/styles');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// probably can avoid this plugin by setting up aliases
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Fiber = require('fibers');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
console.log('fs', process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const isProduction = process.env.NODE_ENV === 'production' ? true : false;
const isDevelopment = process.env.NODE_ENV === 'development' ? true : false;

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
process.traceDeprecation = true;

module.exports = {
  entry: './src/index',
  //devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'index_bundle.js',
  },
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      // {
      //   test: /\.html$/,
      //   loader: 'html-loader',
      // },
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
      // {
      //   test: [sassModuleRegex, cssModuleRegex],
      //   use: getStylesLoader(),
      // },
      // {
      //   test: [sassRegex, cssRegex],
      //   exclude: sassModuleRegex,
      //   use: getStylesLoader(),
      // },
      // {
      //   test: cssRegex,
      //   exclude: cssModuleRegex,
      //   use: getStylesLoader({
      //     importLoaders: 1,
      //     sourceMap: true,
      //     // modules: { localIdentName: '[name]__[local]__[hash:base64:5]' },
      //   }),
      // Don't consider CSS imports dead code even if the
      // containing package claims to have no side effects.
      // Remove this when webpack adds a warning or an error for this.
      // See https://github.com/webpack/webpack/issues/6571
      //   sideEffects: true,
      // },
      // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
      // using the extension .module.css
      {
        test: cssModuleRegex,
        use: getStylesLoader({
          importLoaders: 1,
          sourceMap: true,
          modules: {
            getLocalIdent: getCSSModuleLocalIdent,
          },
        }),
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStylesLoader(
          {
            importLoaders: 3,
            sourceMap: true,
          },
          'sass-loader'
        ),
      },
      {
        test: sassModuleRegex,
        use: getStylesLoader(
          {
            importLoaders: 3,
            sourceMap: true,
            modules: {
              getLocalIdent: getCSSModuleLocalIdent,
            },
          },
          'sass-loader'
        ),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, sassRegex, sassModuleRegex],
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: resolveApp('public/index.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    plugins: [new TsconfigPathsPlugin()],
    fallback: {
      buffer: require.resolve('buffer'),
    },
  },
};
