const {Logger, UI_Utils, _} = runtime;
let GrabDataTask = _require('common/GrabDataTask');

let GrabAuthorPosts = TaskAbstract();

GrabAuthorPosts.execute = async function(page, option){
    console.log(option.data.posts)

    for(var key in  option.data.posts) {
        var listInfo = option.data.posts[key];


        var postInfos = [];
        for(let postInfo of listInfo) {
            
            let post = await AppModels.Post.findOne({ where: {url: postInfo.href, module: 'truyencuoihay'} });
            if (post != null) {
                continue;
            } 

            var task = GrabDataTask({
                url: postInfo.href,
                capture: false,
                fnExecute: function(){
                    var raw_content = $('.full-description').html();
                    var content = raw_content.replace(/<p>/g, '').replace(/<\/p>/g, "\n").replace(/&nbsp;/g, "").trim()
                    var title = $('.product-name').text()
                   
                    return {
                        raw_content,
                        content,
                        title
                    };
                },
                fnAfterExecute: async function(data, page, option){
                    postInfos.push({
                        'module': 'truyencuoihay',
                        'url': postInfo.href,
                        ...data,
                    })
                },
            })

            await task.execute(page);
            if (postInfos.length > 0) {
                AppModels.Post.bulkCreate(postInfos, { ignoreDuplicates: true });
            }
           
        }

        
    }



    
}

module.exports = GrabAuthorPosts;

