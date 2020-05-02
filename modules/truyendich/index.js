const ModuleProcess = _require('core/common/ModuleProcess');

const GrabTruyenInfo = require('./GrabTruyenInfo');
const GrabChapContentList = require('./GrabChapContentList');

class Runner extends ModuleProcess {

    async run() {
        let truyenInfo = await GrabTruyenInfo(this._page);
        await GrabChapContentList(this._page, truyenInfo);

        // let db = require('../common/loadStoryDb');
        // await StoreToDb(db, allChapters);
        // console.log('--- DONE ---');
    }

}

module.exports = new Runner;