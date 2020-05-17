const CONFIG = require('./config');
const GrabChapContentList = require('../common/GrabChapContentList');

function grabContentFn() {
    let el = document.querySelector('.container.chapter>div:nth-child(2)');
    return el ? el.innerHTML : '';
}

module.exports = async (page, chapItems) => {
   
    // chapItems.length = 10;
    return GrabChapContentList(
        page, chapItems, grabContentFn, { 
            ...CONFIG, 
            processType: 'single',
            contentSelector: '.container.chapter>div:nth-child(2)'
        }
    );
}