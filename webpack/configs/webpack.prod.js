const { merge } = require('webpack-merge');
const { createCommon } = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const prodConfig = merge(
  {
    optimization: {
      usedExports: true, // need for treeshaking
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    plugins: [new CompressionPlugin()],
  },
  createCommon(true)
);

module.exports = {
  prodConfig,
};
