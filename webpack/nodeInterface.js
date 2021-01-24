// import webpack from 'webpack';
const webpack = require('webpack');
const config = require('./webpack.config');

const compiler = webpack({ ...config });

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

// const watching = compiler.watch(
//   {
//     // Example [watchOptions](/configuration/watch/#watchoptions)
//     aggregateTimeout: 300,
//     poll: undefined,
//   },
//   (err, stats) => {
//     // [Stats Object](#stats-object)
//     // Print watch/build result here...
//     console.log(stats);
//   }
// );
