const CONFIG = require('./config');

const GrabChapContentList = require('../common/GrabChapContentList');

function grabContentFn() {
    let el = document.querySelector('.chapter-content')
    return el ? el.innerHTML : '';
}

module.exports = async(page, chapItems) => {
    let baseUrl = CONFIG.baseUrl;

    chapItems = chapItems.map((item) => {
        return {
            ...item,
            href: baseUrl + item.href,
        };
    });

    return GrabChapContentList(
        page, chapItems, grabContentFn, CONFIG
    );
}