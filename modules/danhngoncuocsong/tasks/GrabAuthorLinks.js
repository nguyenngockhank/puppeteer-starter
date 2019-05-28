let GrabDataTask = _require('common/GrabDataTask');


const instance = GrabDataTask({
    url: '/tac-gia.html',
    cacheKey: 'author-links.json',
    capture: true,
    /// end capture screen
    fnExecute: function(){
        let data = [];
        let authorWrappers = jQuery('.bq_s .btn-primary'); 
        authorWrappers.each(function(key, el){
            data.push({
                href: jQuery(el).attr('href'),
            });
        });
        return data;
    },
    fnAfterExecute: function(data, page, option){
        option.data.authorLinks = data;
    },
})

module.exports = instance;