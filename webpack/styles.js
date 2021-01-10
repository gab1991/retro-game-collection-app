const getStylesLoader = () => {
  const loaders = [
    require.resolve('style-loader'),
    require.resolve('css-loader'),
    // require.resolve('postcss-loader'),
    require.resolve('resolve-url-loader'),
    require.resolve('sass-loader'),
  ];
  return loaders;
};

module.exports = {
  getStylesLoader,
};
