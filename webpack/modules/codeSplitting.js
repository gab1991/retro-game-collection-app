const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { argv } = require('../addons/yargs');

const codeSplitting = (isProduction) => ({
  plugins: [argv.analyze && new BundleAnalyzerPlugin()].filter(Boolean),
});

module.exports = {
  codeSplitting,
};
