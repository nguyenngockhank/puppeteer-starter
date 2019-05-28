const {Logger, UI_Utils, _} = runtime;
let GrabListDataTask = _require('common/GrabListDataTask');
let GrabPostLinks = TaskAbstract();


GrabPostLinks.execute = async function(page, option){
    var datalinks = [];
    let task = GrabListDataTask({
        url: 'http://www.truyencuoihay.vn/?pagenumber=1', // first link
        capture: true, 
        firstCacheKey: 1, 
        fnCacheKey: function(key){
            return `truyencuoihay-${key}.json`; 
        }, // must a Function
        fnNextCacheKey: function(currentCacheKey) {
            var [,, key,] = currentCacheKey.match('(truyencuoihay\-)([0-9]+)(.json)');
            ++key;
            return `truyencuoihay-${key}.json`; 
        },
        fnGetNextCacheKey: function(){
            return jQuery('.current-page').next().text();
        }, 
        fnGetNextUrl: function(){
            let $el = jQuery('.current-page').next();
            if($el.length == 0) {
                return null;
            }
            return $el.attr('href');
        },  // must a Function
        // must a Function
        fnExecute: function(){
            let data = [];
            let $postEls = jQuery('.product-item .product-title a');
            $postEls.each(function(k, el){
                let $el = jQuery(el);
                data.push({
                    href: $el.attr('href'),
                    title: $el.text().trim(),
                });
            })
            return data;
        },
        fnAfterExecute: function(data){
            // Logger.success('>>> SUCCESS:', data);
            option.data.posts = data;
        }
    });

   

    await task.execute(page, option);


    // options.links = 
}

module.exports = GrabPostLinks;
