const TsconfigPATHSPlugin = require('tsconfig-PATHS-webpack-plugin');

const tsConfig = (isProduction) => ({
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
    plugins: [
      // Manages typescript path aliases
      new TsconfigPATHSPlugin(),
    ],
  },
});

module.exports = {
  tsConfig,
};
