const CONFIG = require('./config');
const GrabChapContentList = require('../common/GrabChapContentList');

function grabContentFn() {
    let el = document.querySelector('.container.chapter>div:nth-child(2)');
    return el ? el.innerHTML : '';
}

module.exports = async(page, truyenInfo) => {
    let { storySlug, baseUrl, } = CONFIG;
    let { maxChapter,  } = truyenInfo;
    maxChapter = parseInt(maxChapter);

    let chapItems = [];
    for(let i = 1; i <= maxChapter; ++i) {
        chapItems.push({
            index: i,
            href: `${baseUrl}doc-truyen/${storySlug}/${i}`,
        });
    }

    // chapItems.length = 10;
    return GrabChapContentList(
        page, chapItems, grabContentFn, { 
            ...CONFIG, 
            processType: 'single',
            contentSelector: '.container.chapter>div:nth-child(2)'
        }
    );
}