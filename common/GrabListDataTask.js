const CacheStorage = _require('utils/file_storage');
let GrabDataTask = require('./GrabDataTask');


let GrabListDataTask = function(options){
    let { 
        fnExecute, // to sub task
        capture, // send to sub task
        //-- for self
        url, // for first access
        firstCacheKey = 1, 
        fnCacheKey, // must a Function
        fnGetNextUrl,  // must a Function
        fnGetNextCacheKey,  // must a Function


        fnNextCacheKey, /// options: check in cache
        fnAfterExecute
    } = options;

    let instance = TaskAbstract(); 

    instance.execute = async function (page, option) {
        var retData = {};
        let cacheKey  = fnCacheKey(firstCacheKey);
        let currentUrl = url;
        let nextUrl = null;
        let nextCacheKey = null;


        var _hasNextInCache = false;
        var _tempKeyCache = '';
        var _nextUrl = '';
        do {
            if (fnNextCacheKey) {
                
                _tempKeyCache = fnNextCacheKey(cacheKey);


                /// check in cache
                if (CacheStorage.has(_tempKeyCache)) {
                    _hasNextInCache = true;
                    _nextUrl = '^^';
                }

                console.log( 'check cache key , ',cacheKey, _tempKeyCache, CacheStorage.has(_tempKeyCache))
            } 

            let subTask = GrabDataTask({
                cacheKey, 
                capture,
                url: currentUrl,
                fnExecute,
                fnBeforeExecute: async function(){
                    nextUrl = await page.evaluate(fnGetNextUrl);
                    nextCacheKey = await page.evaluate(fnGetNextCacheKey);
                },
                fnAfterExecute: function(data){
                    console.log(data)
                    retData[cacheKey] = data;
                },
            });

            await subTask.run(page, option);

            if(!_hasNextInCache) {
                cacheKey = fnCacheKey(nextCacheKey); 
                currentUrl = nextUrl;
            } else {
                cacheKey = _tempKeyCache;
                currentUrl = _nextUrl;
            }
           

            _hasNextInCache = false;
          
        } while(currentUrl != null);

        fnAfterExecute(retData);
        return retData;
    }

    return instance;
}

module.exports = GrabListDataTask;