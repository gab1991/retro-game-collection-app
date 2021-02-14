const jsConfig = (isProduction) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // if you need to transpile some code to es5 you should use custom regex. Libary "are-you-es5" can show you which packages are not es5
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    debug: false, // toggle debug pollyfills and other stuff per file
                    useBuiltIns: 'usage', // use only necessary polyfills , no need to add them to the root file anymore
                    corejs: 3, //  injects the polyfills supported by your core-js version. Need for useBuiltIns otions to work
                    bugfixes: true, //  tries to compile the broken syntax to the closest non-broken modern syntax supported by your target browsers.
                  },
                ],
                '@babel/preset-react',
              ],
            },
          },
        ],
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
