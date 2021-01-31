const { merge } = require('webpack-merge');

const { PATHS } = require('./configs/paths');
const { htmlConfig } = require('./modules/html');
const { stylesConfig } = require('./modules/styles');
const { assetsConfig } = require('./modules/assets');
const { tsConfig } = require('./modules/ts');

const createCommon = (isProduction) =>
  merge(
    {
      entry: PATHS.entry,
      mode: isProduction ? 'production' : 'development',
      output: {
        path: PATHS.buildDir,
        publicPath: PATHS.publicPath,
        filename: isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
        chunkFilename: isProduction ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
        assetModuleFilename: isProduction ? 'static/assets/[contenthash:8][ext][query]' : 'static/assets/[name][ext]',
        globalObject: 'this',
      },
      target: isProduction ? 'browserslist:production' : 'web',
      module: {
        rules: [
          {
            test: /\.html$/,
            loader: 'html-loader',
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
          },
        ],
      },
      plugins: [
        //Cleaning the build directory
        isProduction && new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      ].filter(Boolean),
      resolve: {
        extensions: ['.js', '.jsx'],
        fallback: {
          // buffer: require('buffer'),
        },
      },
    },
    stylesConfig(isProduction),
    assetsConfig(isProduction),
    htmlConfig(isProduction),
    tsConfig(isProduction)
  );

module.exports = {
  createCommon,
};
