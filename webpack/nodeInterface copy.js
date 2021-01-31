const webpack = require('webpack');
const config = require('./webpack.config');

//devserver

const WebpackDevServer = require('webpack-dev-server');
const devServerOptions = { ...config.devServer };

// my mode
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isProduction = mode === 'development' ? false : true;
const isDevelopment = !isProduction;

const compiler = webpack({ ...config });

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
  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(devServerOptions.port, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
