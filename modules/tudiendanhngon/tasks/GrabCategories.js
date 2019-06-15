const {Logger, UI_Utils, _} = runtime;
let GrabDataTask = _require('common/GrabDataTask');
let GrabCategories= TaskAbstract();

var allTypeCats = ["a","b","c","d","đ","g","h","i","k","l","m","n","o","p","q","r","s","t","u","v","x","y"];
allTypeCats = allTypeCats.map(function(k) {
    return 'http://www.tudiendanhngon.vn/danhngon/sw/' + k;
})

GrabCategories.execute = async function(page, option){
    var categories = [];

    for(var href of allTypeCats) {
        var [lastChar, ...a] = href.split('/').reverse();

        var task = GrabDataTask({
            url: href,
            cacheKey: 'tudiendanhngon-'  + lastChar,
            // capture: true,
            fnExecute: function(){
                var listA = jQuery('.middleTitle .RBlackList a');

                var result = [];
                listA.each((i, element) => {
                    var $el = jQuery(element);
                    var obj = {
                        href: $el.attr('href'),
                        title: $el.text().trim()
                    }
                    result.push(obj);
                });

               
                return result;
            },
            fnAfterExecute: async function(data, page, option){
                categories = categories.concat(data);
            },
        })


        await task.execute(page);
    }

    option.data.categories = categories;

}

module.exports = GrabCategories;
