const CONFIG = require('./config');
const ProcessStaticList = _require('core/builder/ProcessStaticList');
const CacheItem = _require('core/common/CacheItem');

var striptags = require('striptags');

module.exports = async (page, chapItems) => {

    let { prefix, textFilters } = CONFIG;
    let STORED_PROP = 'chap_content';

    await ProcessStaticList.execute(chapItems, page, {
        before(item) {
            let cacheItem = CacheItem.init(`${prefix}/chaps.${item.index + 1}.html`);
            if (cacheItem.exist() && cacheItem.get()) {
                return false;
            }
        },
        after(builder, item) {
            let cacheItem = CacheItem.init(`${prefix}/chaps.${item.index + 1}.html`);
            cacheItem.set(builder._decor.getProp(STORED_PROP));
        },
        build(builder, item) {
            console.log('PROCESS ITEM INDEX ', item.index);
            
            let href = CONFIG.base + item.href;
            builder.disableJs()
                .access(href)
                .evaluate(STORED_PROP, function() {
                    let el = document.querySelector('.chapter-content')
                    return el ? el.innerHTML : '';
                })
                .processProp(STORED_PROP, (content) => {
                    // strip tags
                    content = striptags(content, ['br']);
                    // Remove everything after a certain character
                    textFilters.map((str) => {
                        if (content.indexOf(str) > 0) {
                            content = content.substring(0, content.indexOf(str));
                        }
                    });

                    if (!content) {
                        console.warn('> Empty content at ', item.index);
                    }
                    return content;
                });
        },
    });
}