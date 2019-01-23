const {Logger, UI_Utils, _} = runtime;
let GrabDataTask = _require('common/GrabDataTask');

let ProcessAuthorPage = TaskAbstract();

ProcessAuthorPage.execute = async function(page, option){
    let {authorLinks} = option.data;
    let dataAuthors = [];
    for(let { href  } of authorLinks) {
        let authorLink = href;
        var chunks = authorLink.match(/(tac\-gia\/)([a-z])(\.html)/);
        let cacheKey = 'authors-' +  chunks[2] + '.json' ;

        /// define task
        let task = GrabDataTask({
            url: authorLink,
            capture: true,
            cacheKey,
            /// 
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
            fnAfterExecute: function(data){
                dataAuthors = dataAuthors.concat(data);
            },
        });
        await task.run(page, option);
    }
    option.data.dataAuthors = dataAuthors;
}

module.exports = ProcessAuthorPage;
