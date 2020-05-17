const CONFIG = require('./config');
const GrabChapContentList = require('../common/GrabChapContentList');

function grabContentFn() {
    let el = document.querySelector('#chapter-c');
    return el ? el.innerHTML : '';
}

module.exports = async(page, chapItems) => {
    return GrabChapContentList(
        page, chapItems, grabContentFn, CONFIG
    );
}