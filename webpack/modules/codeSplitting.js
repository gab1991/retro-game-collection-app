const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { argv } = require('../addons/yargs');

const codeSplitting = (isProduction) => ({
  optimization: {
    runtimeChunk: 'single', // detach code responsible for individual chunk uploads from main
    splitChunks: {
      chunks: 'all',
      minSize: 1 * 1000, // minimal size in bytes for chunk to be detached

      cacheGroups: {
        //detach each module into individual chunks if it exceeds the minChunk
        // vendor: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name(module) {
        //     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
        //     return `npm.${packageName.replace('@', '')}`;
        //   },
        // },

        // way for detaching individual node modules
        reactPlayer: {
          test: /[\\/]node_modules[\\/]((react-player).*)[\\/]/,
          name: 'player',
        },
        restVendors: {
          test: /[\\/]node_modules[\\/]((?!(react-player)).*)[\\/]/,
          name: 'restVendors',
        },
      },
    },
  },

  plugins: [argv.analyze && new BundleAnalyzerPlugin()].filter(Boolean),
});

module.exports = {
  codeSplitting,
};
