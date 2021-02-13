const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const { PATHS } = require('../configs/paths');

const htmlConfig = (isProduction) => ({
  plugins: [
    //forming html for bundle
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: PATHS.htmlTemplate,
    }),
    //preparing various favicons from template+manifest.json+browserconfig
    isProduction &&
      new FaviconsWebpackPlugin({
        logo: PATHS.faviconTemplate,
        cache: true,
        prefix: 'favicons/',
        favicons: {
          icons: {
            appleStartup: false,
            coast: false,
            yandex: false,
          },
        },
      }),
    //simple copy for dev build to increase speed
    !isProduction &&
      new CopyPlugin({
        patterns: [{ from: PATHS.favicon }, { from: PATHS.manifest }],
      }),
  ].filter(Boolean),
});

module.exports = {
  htmlConfig,
};
