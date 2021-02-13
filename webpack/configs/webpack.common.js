const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const { PATHS } = require('./paths');
const { htmlConfig } = require('../modules/html');
const { stylesConfig } = require('../modules/styles');
const { assetsConfig } = require('../modules/assets');
const { tsConfig } = require('../modules/ts');
const { jsConfig } = require('../modules/js');
const { codeSplitting } = require('../modules/codeSplitting');

const createCommon = (isProduction) =>
  merge(
    {
      entry: PATHS.entry,
      mode: isProduction ? 'production' : 'development',
      output: {
        path: PATHS.buildDir,
        publicPath: PATHS.publicPath,
        filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
        chunkFilename: isProduction ? 'js/[name].[contenthash:8].chunk.js' : 'js/[name].chunk.js',
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
        new CopyPlugin({
          patterns: [{ from: PATHS.favicon }, { from: PATHS.manifest }],
        }),
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
    jsConfig(isProduction),
    codeSplitting(isProduction)
  );

module.exports = {
  createCommon,
};
