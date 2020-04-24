require('./bootstrap');

const JQueryHelper = require('./common/JqueryHelper');
const cacheItem =  require('./common/CacheItem').init('tcltq.chaps');
let content = cacheItem.get();

// console.log('CONTENT ', content);
let $ = JQueryHelper.getInstance(content);
let result = [];
$('.chuong-item').each(function( index ) {
    let item = {
        index,
        href: $(this).prop('href'),
        text: $(this).text(),
    };

    result.push(item);
});


console.log(
    result
);

