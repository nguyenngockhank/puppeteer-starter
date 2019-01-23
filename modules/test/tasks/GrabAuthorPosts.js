const {Logger, UI_Utils, _} = runtime;
let GrabListDataTask = _require('common/GrabListDataTask');

let GrabAuthorPosts = TaskAbstract();

GrabAuthorPosts.execute = async function(page, option){
    let {dataAuthors} = option.data;
    // let dataAuthors = [{"href":"/tac-gia/a-a-milne.html","name":"A. A. Milne","job":"Nhà văn"}];

    for(let { href  } of dataAuthors) {
        let authorLink = href;
        let chunks = authorLink.match(/(tac\-gia\/)([a-z\-]+)(\.html)/);
        let authorSlug = chunks[2];

        let task = GrabListDataTask({
            url: authorLink, // first link
            capture: true, 
            firstCacheKey: 1, 
            fnCacheKey: function(key){
                return `author-${authorSlug}-${key}.json`; 
            }, // must a Function
            fnNextUrl: function(){
                let $el = jQuery('.pagination .active').first().next();
                if($el.length == 0) {
                    return null;
                }
                return $el.find('a').attr('href');
            },  // must a Function
            fnNextCacheKey: function(){
                return jQuery('.pagination .active').first().next().text();
            },  // must a Function
            fnExecute: function(){
                let data = [];
                let $postEls = jQuery('#quotesList .bqShare');
                $postEls.each(function(k, el){
                    let $el = jQuery(el);
                    data.push({
                        href: $el.find('.bqQuoteLink a').first().attr('href'),
                        content: $el.find('.bqQuoteLink a').first().html().trim(),
                    });
                })
                return data;
            },
            fnAfterExecute: function(data){
                Logger.success('>>> SUCCESS:', data);
            }
        });

        await task.execute(page, option);
    }


}

module.exports = GrabAuthorPosts;

