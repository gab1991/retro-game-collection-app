const assetsConfig = (isProduction) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
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
