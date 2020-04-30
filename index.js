require('./bootstrap');
var argv = require('minimist')(process.argv.slice(2));

var {dataRuntime} = _require('runtime'); // require('./runtime');
global.runtime = dataRuntime;

let TaskAbstract = _require('pattern/task');
global.TaskAbstract = TaskAbstract;

let AppProcess = _require('pattern/app_process');
global.AppProcess = AppProcess;

const puppeteer = require('puppeteer');

const ModuleRunner = _require('modules');

/// -- execute function
(async () => {
    let { m, headless } = argv;

    const browser = await puppeteer.launch({
      headless: headless
    });
    
    const page = await browser.newPage();
    page.setViewport({width: 1400, height: 700, isLandscape: true});

    let moduleName = m;
    console.log('Run module name: ', moduleName);

    await ModuleRunner.run(page, moduleName);
})();