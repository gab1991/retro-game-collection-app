const ESLintPlugin = require('eslint-webpack-plugin');

const lintingConfig = (isProduction) => ({
  plugins: [new ESLintPlugin({ extensions: ['.js', '.jsx', '.ts', '.tsx'], failOnError: false })],
});

module.exports = {
  lintingConfig,
};
