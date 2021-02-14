const path = require('path');
const { PATHS } = require('../configs/paths');
const fs = require('fs');

const writeStatsFile = (statsObj, loglevel = 'normal') =>
  fs.writeFile(
    path.join(PATHS.buildDir, `webpack-build-stats.json`),
    JSON.stringify(statsObj.toJson(loglevel)),
    (err) => {
      if (err) throw err;

      console.log('The file was succesfully saved!');
    }
  );

module.exports = {
  writeStatsFile,
};
