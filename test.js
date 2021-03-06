require('./bootstrap');

const CacheItem = require('./common/CacheItem');

const puppeteer = require('puppeteer');

const CONFIG = {
    base: `https://truyencuatui.net`,
    url: `https://truyencuatui.net/truyen/tu-chan-lieu-thien-quan.html`,
    selector: `.btn-chapters`,
    chaptersUrl: `https://truyencuatui.net/chuong/tu-chan-lieu-thien-quan.html`,
};


const PageProcess = require('./builder/PageProcess');
const ProcessStaticList = require('./builder/ProcessStaticList');


var striptags = require('striptags');

(async () => {
    const browser = await puppeteer.launch({
        // headless: false
    });
    const page = await browser.newPage();

    let chapItems = await PageProcess.withCache(
        page, 
        {
            key: 'tcltq/chaps.json',
            propName: 'all_chaps',
        },
        {
            build(builder) {
                // const chapHtmlCache = CacheItem.init('tcltq/chaps.html');
                builder.access(CONFIG.url)
                    .click(CONFIG.selector)
                    .storeResponse(CONFIG.chaptersUrl, 'chapters', 'text')
                    .processHtmlProp('chapters', ($) => {
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
            }
        }
    );

    // remove 
    // chapItems.length = 50;
    
    ProcessStaticList.execute(chapItems, page, {
        before(item) {
            let cacheItem = CacheItem.init(`tcltq/chaps.${item.index + 1}.html`);
            if (cacheItem.exist()) {
                return false;
            }
        },
        after(builder, item) {
            let cacheItem = CacheItem.init(`tcltq/chaps.${item.index + 1}.html`);
            cacheItem.set(builder._decor.getProp(`chap_content`));
        },
        build(builder, item) {
            let href = CONFIG.base + item.href;
            builder.disableJs()
                .access(href)
                .evaluate('chap_content', function() {
                    return document.querySelector('.chapter-content').innerHTML;
                })
                .processProp('chap_content', (content) => {
                    // strip tags
                    content = striptags(content, ['br']);
                    // Remove everything after a certain character
                    content = content.substring(0, content.indexOf(`Convert by:`));
                    return content;
                });
        },
    });
   
    //   await browser.close();
})();

