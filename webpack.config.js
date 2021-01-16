const { getStylesLoader } = require('./webpack/styles');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// probably can avoid this plugin by setting up aliases
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Fiber = require('fibers');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

//tracing deprecations in modules
process.traceDeprecation = true;
// my paths
const paths = require('./webpack/configs/paths');

// my mode
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isProduction = mode === 'development' ? false : true;
const isDevelopment = mode === 'development' ? true : false;

console.log('MODE = ' + process.env.NODE_ENV);

module.exports = {
  mode: mode,
  entry: paths.entry,
  // entry: ['babel-polyfill', paths.entry],
  //devtool: 'source-map',
  output: {
    path: paths.buildDir,
    filename: isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
    chunkFilename: isProduction ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
    futureEmitAssets: true,
    globalObject: 'this',
  },

  devServer: {
    contentBase: paths.buildDir,
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },

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
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
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
      // inject: true,
      template: paths.htmlTemplate,
    }),
    isProduction && new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
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
