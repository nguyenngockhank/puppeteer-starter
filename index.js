require('dotenv').config()

var path = require('path');
global.appRoot = path.resolve(__dirname);

var {dataRuntime} = require('./runtime');
global.runtime = dataRuntime;

let TaskAbstract = require('./pattern/task');
global.TaskAbstract = TaskAbstract;

let AppProcess = require('./pattern/app_process');
global.AppProcess = AppProcess;

const puppeteer = require('puppeteer');

const ModuleRunner = require('./modules');

/// -- helper function
function grabArgument(key){ 
  var res = null;
  var param = `${key}=`;

  process.argv.forEach((val, index) => {
    if(val.startsWith(param)) {
      res = val.split(param)[1]; 
    }
  });
  return res;
}

/// -- execute function
(async () => {
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();
    page.setViewport({width: 1400, height: 700, isLandscape: true});

    let moduleName = grabArgument('m');
    console.log('Run module name: ', moduleName);

    await ModuleRunner.run(page, moduleName);
})();