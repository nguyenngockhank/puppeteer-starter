const ModuleProcess = _require('core/common/ModuleProcess');

const GrabAllChapters = require('./GrabAllChapters');
const GrabChapContentList = require('./GrabChapContentList');

class Runner extends ModuleProcess {

    async run() {
        let allChapters = await GrabAllChapters(this._page);
        await GrabChapContentList(this._page, allChapters);
    }

}

module.exports = new Runner;