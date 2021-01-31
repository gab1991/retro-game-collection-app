import { merge } from 'webpack-merge';
import { createCommon } from './webpack.common.js';
import { PATHS } from './configs/paths.js';

export const devConfig = merge(
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
