const { getStylesLoader } = require('./webpack/styles');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// probably can avoid this plugin by setting up aliases
const TsconfigPATHSPlugin = require('tsconfig-PATHS-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Fiber = require('fibers');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

//tracing deprecations in modules
process.traceDeprecation = true;
// my PATHS
const PATHS = require('./webpack/configs/PATHS');

// my mode
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isProduction = mode === 'development' ? false : true;
const isDevelopment = mode === 'development' ? true : false;

console.log('MODE = ' + mode);

module.exports = {
  mode: mode,
  entry: PATHS.entry,
  devtool: isDevelopment ? 'source-map' : 'eval',
  output: {
    path: PATHS.buildDir,
    publicPath: PATHS.publicPath,
    filename: isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
    chunkFilename: isProduction ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
    globalObject: 'this',
  },

  devServer: {
    contentBase: PATHS.buildDir,
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
        test: cssRegex,
        use: getStylesLoader({
          importLoaders: 1,
          sourceMap: true,
        }),
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
    //forming html for bundle
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: PATHS.htmlTemplate,
    }),
    // Favicon ALPHA VERSION NEED TO SWAP WHEN IT RELEASES
    new FaviconsWebpackPlugin({
      logo: PATHS.faviconTemplate,
      cache: true,
      prefix: 'favicons/',
      favicons: {
        icons: {
          appleStartup: false,
          coast: false,
          yandex: false,
        },
      },
    }),
    //Cleaning the build directory
    isProduction && new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    //Extract css to separate file
    new MiniCssExtractPlugin(),
  ].filter(Boolean),

  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    plugins: [
      // Manages typescript path aliases
      new TsconfigPATHSPlugin(),
    ],
    fallback: {
      buffer: require.resolve('buffer'),
    },
  },
};
