const { merge } = require('webpack-merge');
const { createCommon } = require('./webpack.common');

const { PATHS } = require('./paths');

const devConfig = merge(
  {
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      contentBase: PATHS.buildDir,
      hot: true,
      port: 3000,
      historyApiFallback: true, // prop for correct working program routing

      open: {
        app: ['firefox'],
      },
      overlay: {
        warnings: false,
        errors: true,
      },
      clientLogLevel: 'silent',
      stats: 'minimal', // controls console messages while building
    },
  },
  createCommon(false)
);

module.exports = {
  devConfig,
};
