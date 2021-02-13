const { merge } = require('webpack-merge');
const { createCommon } = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

const prodConfig = merge(
  {
    optimization: {
      usedExports: true,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
        }),
      ],
    },
    plugins: [new CompressionPlugin({})],
  },
  createCommon(true)
);

module.exports = {
  prodConfig,
};
