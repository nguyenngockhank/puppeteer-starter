const ModuleProcess = _require('core/common/ModuleProcess');
const GrabTruyenInfo = require('./GrabTruyenInfo');
const GrabChapContentList = require('./GrabChapContentList');
const StoreToDb = require('./StoreToDb');

const CONFIG  = require('./config');

function buildChapItems(truyenInfo) {
    let {storySlug, baseUrl} = CONFIG;

    let { maxChapter,  } = truyenInfo;
    maxChapter = parseInt(maxChapter);

    let chapItems = [];
    for(let i = 1; i <= maxChapter; ++i) {
        chapItems.push({
            index: i,
            href: `${baseUrl}doc-truyen/${storySlug}/${i}`,
        });
    }
    return chapItems;
}

class Runner extends ModuleProcess {

    async run() {
        let truyenInfo = await GrabTruyenInfo(this._page);
        
        let chapItems = buildChapItems(truyenInfo);
        await GrabChapContentList(this._page, chapItems);

        let db = require('../common/loadStoryDb');
        await StoreToDb(db, chapItems);
        console.log('--- DONE ---');
    }

}

module.exports = new Runner;