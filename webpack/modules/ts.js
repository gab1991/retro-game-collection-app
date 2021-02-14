const TsconfigPATHSPlugin = require('tsconfig-paths-webpack-plugin');

const tsConfig = (isProduction) => ({
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
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
