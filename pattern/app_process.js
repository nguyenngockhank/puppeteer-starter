const {Logger, UI_Utils, _} = runtime;

/*
    config: {
        name: ...,
        url: ...,
    }
*/
function AppProcess(config){
    let instance = {};
    let { name, url } = config;

    let page = null; //runtime.getPage();
    let tasks = [];
    
    instance.addTask = (taskItem) => { tasks.push(taskItem) };

    instance.setPage = (_page) => { 
        page = _page;
    }

    instance.getPage = () => page;

    instance.accessPage = async () => {
        await UI_Utils.accessPage(page, url, name, 1000);
        Logger.info('Done loading page');
    }

    instance.screenshot = async (action) => {
        await UI_Utils.screenshot(page, `${name}-${action}`);
    }

    instance.afterRun = async function() { }

    instance.beforeRun = async function() { }

    instance.runTasks = async function(data) {
        if(!_.isArray(tasks)){
            return;
        }

        for(let task of tasks) {
            await task.run(page, { config, data, app: instance}); // 
        }
    }

    instance.run = async function(){
        Logger.case('Start to test application: '+ name)
        var data = {};
        await instance.beforeRun(data);

        await instance.accessPage();

        await instance.runTasks(data);
        await instance.afterRun(data);

        Logger.yellow('End to test application: '+ name)
    }

    return instance;
}

module.exports = AppProcess;