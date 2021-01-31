import webpack from 'webpack';
import { PATHS } from './configs/paths.js';
import { devConfig } from './webpack.dev.js';

const isProduction = true;

console.log(devConfig);

const compiler = webpack(devConfig);

compiler.run((err, stats) => {
  if (err) {
    console.log(err);
  }
  console.log('done');
});
