require('dotenv').config()
var argv = require('minimist')(process.argv.slice(2));


var path = require('path');
global.appRoot = path.resolve(__dirname) + '/';

global._require = function _require(path) {
  let fullPath = appRoot + path;
  return  require(fullPath);
}

_require('database');

var {dataRuntime} = _require('runtime'); // require('./runtime');
global.runtime = dataRuntime;

let TaskAbstract = _require('common/pattern/task');
global.TaskAbstract = TaskAbstract;

let AppProcess = _require('common/pattern/app_process');
global.AppProcess = AppProcess;

const puppeteer = require('puppeteer');

const ModuleRunner = _require('modules');


/// -- execute function
(async () => {
    const isHeadless = argv.hasOwnProperty('headless');
    /// run database
    await global.sequelize.sync();
    
    /// ...
    let moduleName = argv.m; // grabArgument('m');
    if(!moduleName) {
      console.log('>>> No module for running')
      return;
    }

    console.log('Run module name: ', moduleName);
    const browser = await puppeteer.launch({
      headless: isHeadless
    });
    const page = await browser.newPage();
    page.setViewport({width: 1400, height: 700, isLandscape: true});

    await ModuleRunner.run(page, moduleName);
})();