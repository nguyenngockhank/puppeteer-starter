const {Logger, UI_Utils, _} = runtime;
let GrabListDataTask = _require('common/GrabListDataTask');

let GrabPostsData = TaskAbstract();

GrabPostsData.execute = async function(page, option){
    console.log(option.data.categories)


    for(var catinfo of  option.data.categories) {
        var { href, title } = catinfo;

        Logger.info('>>> Start to grab quotes of ', title);

        var posts = [];
        let task = GrabListDataTask({
            url: href, // first link
            // capture: true, 
            firstCacheKey: 1, 
            fnCacheKey: function(key){
                return `tddn-${title}-${key}`; 
            }, // must a Function
            fnGetNextCacheKey: function(){
                return jQuery('.C0001_DarkGrey_Selected').next().text();
            }, 
            fnGetNextUrl: function(){
                let $el = jQuery('.C0001_DarkGrey_Selected').next();
                if($el.length == 0) {
                    return null;
                }
                return $el.attr('href');
            },  // must a Function
            // must a Function
            fnExecute: function(){
                let data = [];
                let $postEls = jQuery('.qtMain');
                $postEls.each(function(k, el){
                    let $el = jQuery(el);
                    let $a = $el.find('p:nth-child(1) a');


                    data.push({
                        url: $a.attr('href'),
                        content: $a.text().trim(),
                        raw_content: $el.find('p:nth-child(2)').text(),
                        meta: {
                            author: $el.find('p:nth-child(3) a').text(),
                        }
                    });
                })
                return data;
            },
            fnAfterExecute: function(data){
                // Logger.success('>>> SUCCESS:', data);
                // option.data.posts = data;
                for(var key in data) {
                    posts = posts.concat(data[key]);
                }
            }
        });

        await task.execute(page);

        var posts = posts.map((post) => {
            post.meta = JSON.stringify(post.meta);
            return {
                ...post,
                title,
                'module': 'tudiendanhngon',
            }
        })

        //// INSERT INTO DATABASE
        if (posts.length > 0) {
            await AppModels.Post.bulkCreate(posts, { ignoreDuplicates: true });
        }
    }
}

module.exports = GrabPostsData;

