import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { PATHS } from '../configs/paths.js';

export const htmlConfig = (isProduction) => ({
  plugins: [
    //forming html for bundle
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: PATHS.htmlTemplate,
    }),
    // Favicon ALPHA VERSION NEED TO SWAP WHEN IT RELEASES cache-loader@4.1.0 its dependency
    // new FaviconsWebpackPlugin({
    //   logo: PATHS.faviconTemplate,
    //   cache: true,
    //   prefix: 'favicons/',
    //   favicons: {
    //     icons: {
    //       appleStartup: false,
    //       coast: false,
    //       yandex: false,
    //     },
    //   },
    // }),
  ],
});
