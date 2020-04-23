require('dotenv').config()
var path = require('path');
global.appRoot = path.resolve(__dirname) + '/';

const PageBuilder = require('./builder');
const puppeteer = require('puppeteer');

const CONFIG = {
    url: `https://truyencuatui.net/truyen/tu-chan-lieu-thien-quan.html`,
    selector: `.btn-chapters`,
    chaptersUrl: `https://truyencuatui.net/chuong/tu-chan-lieu-thien-quan.html`,
};

const cacheItem =  require('./common/CacheItem').init('tcltq.chaps');

(async () => {
    const browser = await puppeteer.launch({
        // headless: false
    });
    const page = await browser.newPage();

    let builder = PageBuilder.init(page)
        .access(CONFIG.url)
        .click(CONFIG.selector)
        .storeResponse(CONFIG.chaptersUrl, 'chapters', 'text', cacheItem)
        .processProp('chapters', ($) => {
            let result = [];
            $('.chuong-item').each(function( index ) {
                let item = {
                    index,
                    href: $(this).prop('href'),
                    text: $(this).text(),
                };
        
                result.push(item);
            });
            return result;
        }, 'all_chaps');

    await builder.execute();

    let {  all_chaps } = builder._decor.getProps();
    console.log( all_chaps);
    // get content here

   
    //   await browser.close();
})();

