let InjectScriptTask = function(scriptUrl) {
    let instance = TaskAbstract(); 
    instance.execute = async function(page, option){
        await page.addScriptTag({url: scriptUrl})
        console.log(`Inject script 'scriptUrl' successfull`)
    }
    return instance;
} 

module.exports = InjectScriptTask;
