const assetsConfig = (isProduction) => ({
  output: {
    assetModuleFilename: isProduction ? 'assets/[contenthash:8][ext][query]' : 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
      },
      //embeded light svg to html to reduce ammount of request
      {
        test: /\.svg$/i,
        type: 'asset/inline',
      },
    ],
  },
});

module.exports = {
  assetsConfig,
};
