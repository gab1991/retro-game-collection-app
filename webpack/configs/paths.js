import path from 'path';
import fs from 'fs';
// const path = require('path');
// const fs = require('fs');

//read root directory
const appDirectory = fs.realpathSync(process.cwd());
//refolving paths for various systems
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

export const PATHS = {
  entry: resolveApp('./src/index'),
  htmlTemplate: resolveApp('./public/index.ejs'),
  faviconTemplate: resolveApp('./public/iconTemplate.png'),
  buildDir: resolveApp('./build'),
  publicPath: '/',
  craPublicFolder: resolveApp('./public'),
};
