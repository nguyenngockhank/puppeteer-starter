const _ = require('underscore');
const CacheStorage = _require('utils/file_storage');

let GrabDataTask = function({ fnBeforeExecute, fnExecute, fnAfterExecute, cacheKey } ) {
    let instance = TaskAbstract(); 

    instance.execute = async function (page, option) {

        // look up in cache first
        if(!!cacheKey) { 
            let data = await CacheStorage.get(cacheKey);
            if(data !== null) {
                if(_.isFunction(fnAfterExecute)) {
                    fnAfterExecute(data, page, option)
                }
                return data;
            }
        } /// end process cache storage

        
        if(_.isFunction(fnBeforeExecute)) {
            fnBeforeExecute(page, option)
        }
        
        let pageData = await page.evaluate(fnExecute);

        /// save to cache 
        if(!!cacheKey) {
            await CacheStorage.set(cacheKey, pageData);
        }

        if(_.isFunction(fnAfterExecute)) {
            fnAfterExecute(pageData, page, option)
        }
        return pageData;
    }
    
    return instance;
} 

module.exports = GrabDataTask;
