let GrabDataTask = require('./GrabDataTask');


let GrabListDataTask = function(options){
    let { 
        fnExecute, // to sub task
        capture, // send to sub task
        //-- for self
        url, // for first access
        firstCacheKey = 1, 
        fnCacheKey, // must a Function
        fnNextUrl,  // must a Function
        fnNextCacheKey,  // must a Function
        fnAfterExecute
    } = options;

    let instance = TaskAbstract(); 

    instance.execute = async function (page, option) {
        var retData = {};
        let cacheKey  = fnCacheKey(firstCacheKey);
        let currentUrl = url;
        let nextUrl = null;
        let nextCacheKey = null;
        do {
            let subTask = GrabDataTask({
                cacheKey, 
                capture,
                url: currentUrl,
                fnExecute,
                fnBeforeExecute: async function(){
                    nextUrl = await page.evaluate(fnNextUrl);
                    nextCacheKey = await page.evaluate(fnNextCacheKey);
                },
                fnAfterExecute: function(data){
                    console.log(data)
                    retData[cacheKey] = data;
                },
            });

            await subTask.run(page, option);
            cacheKey = fnCacheKey(nextCacheKey); 
            currentUrl = nextUrl;
        } while(currentUrl != null);

        fnAfterExecute(retData);
        return retData;
    }

    return instance;
}

module.exports = GrabListDataTask;