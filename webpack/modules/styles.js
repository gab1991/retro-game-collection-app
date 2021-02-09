const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNormalize = require('postcss-normalize');

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const cssLocalIndentProd = '[contenthash:5]';
const cssLocalIndentDev = '[name]_[local]'; // may also use  '[path][name]__[local]'

const stylesConfig = (isProduction) => ({
  module: {
    rules: [
      {
        test: cssRegex,
        use: getStylesLoader(isProduction, {
          importLoaders: 1,
          modules: { compileType: 'icss' },
        }),
      },
      {
        test: cssModuleRegex,
        use: getStylesLoader(isProduction, {
          importLoaders: 1,
          modules: {
            localIdentName: isProduction ? cssLocalIndentProd : cssLocalIndentDev,
          },
        }),
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStylesLoader(
          isProduction,
          {
            importLoaders: 3,
            modules: { compileType: 'icss' },
          },
          'sass-loader'
        ),
      },
      {
        test: sassModuleRegex,
        use: getStylesLoader(
          isProduction,
          {
            importLoaders: 3,
            modules: {
              localIdentName: isProduction ? cssLocalIndentProd : cssLocalIndentDev,
            },
          },
          'sass-loader'
        ),
      },
    ],
  },
  plugins: [
    //Extract css to separate file
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
  ],
  optimization: {
    minimizer: [
      //Removes duplicated css
      new CssMinimizerPlugin(),
    ],
  },
});

const getStylesLoader = (isProduction, cssOptions, preProcessor) => {
  const loaders = [
    !isProduction && 'style-loader',
    isProduction && {
      loader: MiniCssExtractPlugin.loader,
      options: {
        /*relative path from folder where MiniCssExtractPlugin lays css files. In this case css/ - one lvl down from the root
        must point out to public root directory*/
        publicPath: '../',
      },
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: isProduction ? false : true,
        ...cssOptions,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            'postcss-flexbugs-fixes',
            postcssPresetEnv({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            postcssNormalize(),
          ],
          sourceMap: isProduction ? false : true,
        },
      },
    },
  ];
  if (preProcessor) {
    loaders.push(
      {
        loader: 'resolve-url-loader',
        options: {
          sourceMap: isProduction ? false : true,
        },
      },
      {
        loader: preProcessor,
        options: {
          sourceMap: isProduction ? false : true,
        },
      }
    );
  }

  return loaders.filter(Boolean);
};

module.exports = {
  stylesConfig,
};
