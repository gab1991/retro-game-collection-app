const jsConfig = (isProduction) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // if you need to transpile some code to es5 you should use custom regex. Libary "are-you-es5" can show you which packages are not es5
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { debug: true, useBuiltIns: 'usage', corejs: 3, bugfixes: true }],
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
});

module.exports = {
  jsConfig,
};
