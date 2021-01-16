const { getStylesLoader } = require('./webpack/styles');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// probably can avoid this plugin by setting up aliases
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Fiber = require('fibers');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production' ? true : false;
const isDevelopment = process.env.NODE_ENV === 'development' ? true : false;
console.log('MODE', process.env.NODE_ENV);
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

//tracing deprecations in modules
process.traceDeprecation = true;
// my paths
const paths = require('./webpack/configs/paths');
// my mode
const mode = isProduction ? 'production' : 'development';
console.log(paths);

module.exports = {
  mode: mode,
  entry: paths.entry,
  //devtool: 'source-map',
  output: {
    path: paths.buildDir,
    filename: isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
    chunkFilename: isProduction ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
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
      inject: true,
      template: paths.htmlTemplate,
    }),
    new MiniCssExtractPlugin(),
    isProduction &&
      new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        exclude: [/\.map$/, /asset-manifest\.json$/],
        importWorkboxFrom: 'cdn',
        navigateFallback: paths.publicUrlOrPath + 'index.html',
        navigateFallbackBlacklist: [
          // Exclude URLs starting with /_, as they're likely an API call
          new RegExp('^/_'),
          // Exclude any URLs whose last part seems to be a file extension
          // as they're likely a resource and not a SPA route.
          // URLs containing a "?" character won't be blacklisted as they're likely
          // a route with query params (e.g. auth callbacks).
          new RegExp('/[^/?]+\\.[^/]+$'),
        ],
      }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    plugins: [new TsconfigPathsPlugin()],
    fallback: {
      buffer: require.resolve('buffer'),
    },
  },
};
