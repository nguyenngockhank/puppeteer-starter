const PageBuilder = require('./builder');
const puppeteer = require('puppeteer');

const CONFIG = {
    url: `https://truyencuatui.net/truyen/tu-chan-lieu-thien-quan.html`,
    selector: `.btn-chapters`,
    chaptersUrl: `https://truyencuatui.net/chuong/tu-chan-lieu-thien-quan.html`,
};

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    let builder = PageBuilder.init(page)
        .access(CONFIG.url)
        .click(CONFIG.selector)
        .storeResponse(CONFIG.chaptersUrl, 'chapters', 'text');

    await builder.execute();

    let { chapters } = builder._decor.getProps();
    // get content here
    
    // console.log(chapters);

    //   await browser.close();
})();

