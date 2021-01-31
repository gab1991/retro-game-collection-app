const { merge } = require('webpack-merge');
const { createCommon } = require('./webpack.common');
const { PATHS } = require('./configs/paths');

const devConfig = merge(
  {
    devtool: 'source-map',
    devServer: {
      contentBase: PATHS.buildDir,
      hot: true,
      port: 3000,
      historyApiFallback: true,

      open: {
        app: ['firefox'],
      },
      overlay: true,
      clientLogLevel: 'silent',
      stats: 'minimal', // controls console messages while building
    },
  },
  createCommon(false)
);

module.exports = {
  devConfig,
};
