const { merge } = require('webpack-merge');
const { createCommon } = require('./webpack.common');

const prodConfig = merge({}, createCommon(true));

module.exports = {
  prodConfig,
};
