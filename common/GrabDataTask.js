const CacheStorage = _require('utils/file_storage');
const {UI_Utils, _, Logger} = runtime;


let GrabDataTask = function(options) {
    let { 
        fnBeforeExecute, fnExecute, fnAfterExecute, 
        url, // not required
        cacheKey,
        capture,
    } = options;
    
    let instance = TaskAbstract(); 

    async function accessPage(page){
        let screenName =  capture ? cacheKey : '';
        await UI_Utils.accessPage(page, url, screenName);
    }

    instance.execute = async function (page, option) {
        //-- look up in cache first
        if(!!cacheKey) { 
            let data = await CacheStorage.get(cacheKey);
            Logger.pink('Get data from cache ' + cacheKey)
            if(data !== null) {
                if(_.isFunction(fnAfterExecute)) {
                    fnAfterExecute(data, page, option)
                }
                return data;
            }
        } 

        //-- access page 
        if (url) {
            await accessPage(page);
        }

    
        //-- execute callback before
        if(_.isFunction(fnBeforeExecute)) {
            fnBeforeExecute(page, option)
        }
        
        //-- EXECUTE 
        let pageData = await page.evaluate(fnExecute);

        //-- save to cache 
        if(!!cacheKey) {
            await CacheStorage.set(cacheKey, pageData);
        }

        //-- execute callback after
        if(_.isFunction(fnAfterExecute)) {
            fnAfterExecute(pageData, page, option)
        }
        return pageData;
    }
    
    return instance;
} 

module.exports = GrabDataTask;
