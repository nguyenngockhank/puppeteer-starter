const ModuleProcess = _require('core/common/ModuleProcess');

const GrabAllChapters = require('./GrabAllChapters');
const GrabChapContentList = require('./GrabChapContentList');
const StoreToDb = require('./StoreToDb');

class Runner extends ModuleProcess {

    async run() {
        let allChapters = await GrabAllChapters(this._page);
        await GrabChapContentList(this._page, allChapters);

        let db = require('../common/loadStoryDb');
        await StoreToDb(db, allChapters);
        console.log('--- DONE ---');
    }
}

module.exports = new Runner;