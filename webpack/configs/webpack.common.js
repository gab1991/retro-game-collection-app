const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { PATHS } = require('./paths');
const { htmlConfig } = require('../modules/html');
const { stylesConfig } = require('../modules/styles');
const { assetsConfig } = require('../modules/assets');
const { tsConfig } = require('../modules/ts');
const { jsConfig } = require('../modules/js');

const createCommon = (isProduction) =>
  merge(
    {
      entry: PATHS.entry,
      mode: isProduction ? 'production' : 'development',
      output: {
        path: PATHS.buildDir,
        publicPath: PATHS.publicPath,
        filename: isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
        chunkFilename: isProduction ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
        assetModuleFilename: isProduction ? 'static/assets/[contenthash:8][ext][query]' : 'static/assets/[name][ext]',
        globalObject: 'this',
      },
      target: isProduction ? 'browserslist:production' : 'web',
      module: {
        rules: [
          {
            test: /\.html$/,
            loader: 'html-loader',
          },
        ],
      },
      plugins: [
        //Cleaning the build directory
        isProduction && new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      ].filter(Boolean),
      resolve: {
        fallback: {
          // buffer: require('buffer'),
        },
      },
    },
    stylesConfig(isProduction),
    assetsConfig(isProduction),
    htmlConfig(isProduction),
    tsConfig(isProduction),
    jsConfig(isProduction)
  );

module.exports = {
  createCommon,
};
