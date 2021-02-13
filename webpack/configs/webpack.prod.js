const { merge } = require('webpack-merge');
const { createCommon } = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const prodConfig = merge(
  {
    optimization: {
      usedExports: true, // need for treeshaking
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }), //Cleaning the build directory
      new CompressionPlugin(), // Сompress to gzip
    ],
  },
  createCommon(true)
);

module.exports = {
  prodConfig,
};
