const {Logger, UI_Utils, _} = runtime;
let GrabDataTask = _require('common/GrabDataTask');

let ProcessAuthorPage = TaskAbstract();

ProcessAuthorPage.execute = async function(page, option){
    let {authorLinks} = option.data;

    for(let { href  } of authorLinks) {
        let authorLink = href;
        var chunks = authorLink.match(/(tac\-gia\/)([a-z])(\.html)/);
        let cacheKey = 'authors-' +  chunks[2] + chunks[3] ;

        await UI_Utils.accessPage(page, authorLink, cacheKey);

       
        /// define task
        let task = GrabDataTask({
            fnExecute: function(){
                let data = [];
                let authorLink = jQuery('.bq_s table a')
                authorLink.each(function(key, el){
                    let $el = jQuery(el);
                    data.push({
                        href: $el.attr('href'),
                        name: $el.text().trim(),
                        job: $el.parents('tr').find('td:last-child').text().trim(),
                    });
                });
                return data;
            },
            fnAfterExecute: function(data, page, option){
                Logger.success('DATA NE '+ chunks[2]);
                console.log(data)
            },
            cacheKey: cacheKey,
        });
        await task.run(page, option);
    }
}

module.exports = ProcessAuthorPage;
