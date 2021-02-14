const path = require('path');
const fs = require('fs');

//read root directory
const appDirectory = fs.realpathSync(process.cwd());
//refolving paths for various systems
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const PATHS = {
  entry: resolveApp('./src/index'),
  htmlTemplate: resolveApp('./templates/index.ejs'),
  faviconTemplate: resolveApp('./templates/iconTemplate.png'),
  favicon: resolveApp('./templates/favicon.ico'),
  manifest: resolveApp('./templates/manifest.json'),
  buildDir: resolveApp('./build'),
  publicPath: '/',
};

module.exports = {
  PATHS,
};
