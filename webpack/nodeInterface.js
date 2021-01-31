const webpack = require('webpack');
const { PATHS } = require('./configs/paths');
const { devConfig } = require('./webpack.dev');
const WebpackDevServer = require('webpack-dev-server');

// my mode
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isProduction = mode === 'development' ? false : true;
const isDevelopment = !isProduction;

const compiler = webpack(devConfig);

console.log('NODE INTERFACE MODE =', mode);

if (isProduction) {
  compiler.run((err, stats) => {
    if (err) {
      console.log('CONFIG ERROR', { ...err });
    }
    if (stats.hasErrors()) {
      console.log('COMPILE ERROR', { ...stats });
    }
    console.log(
      stats.toString({
        preset: 'normal',
        colors: true,
        assetsSort: '!size',
        chunksSort: '!size',
      })
    );
  });
}

if (isDevelopment) {
  const devServerOptions = { ...devConfig.devServer };
  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(devServerOptions.port, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
