const path = require('path');
const fs = require('fs');

//read root directory
const appDirectory = fs.realpathSync(process.cwd());
//refolving paths for various systems
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  entry: resolveApp('./src/index'),
  htmlTemplate: resolveApp('./public/index.ejs'),
  faviconTemplate: resolveApp('./public/iconTemplate.png'),
  buildDir: resolveApp('./build'),
  publicPath: '/',
  craPublicFolder: resolveApp('./public'),
};