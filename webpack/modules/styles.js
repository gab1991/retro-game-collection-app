import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent.js';
import postcssPresetEnv from 'postcss-preset-env';
import postcssNormalize from 'postcss-normalize';

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

export const stylesConfig = (isProduction) => ({
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
            getLocalIdent: getCSSModuleLocalIdent,
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
              getLocalIdent: getCSSModuleLocalIdent,
            },
          },
          'sass-loader'
        ),
      },
    ],
  },
  plugins: [
    //Extract css to separate file
    new MiniCssExtractPlugin(),
  ],
});

const getStylesLoader = (isProduction, cssOptions, preProcessor) => {
  const loaders = [
    !isProduction && 'style-loader',
    isProduction && {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '',
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
