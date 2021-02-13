const path = require('path');
const fs = require('fs');
// const path = require('path');
// const fs = require('fs');

//read root directory
const appDirectory = fs.realpathSync(process.cwd());
//refolving paths for various systems
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const PATHS = {
  entry: resolveApp('./src/index'),
  htmlTemplate: resolveApp('./public/index.ejs'),
  faviconTemplate: resolveApp('./public/iconTemplate.png'),
  favicon: resolveApp('./public/favicon.ico'),
  manifest: resolveApp('./public/manifest.json'),
  buildDir: resolveApp('./build'),
  publicPath: '/',
  craPublicFolder: resolveApp('./public'),
};

module.exports = {
  PATHS,
};
