const { contentPath } = require('./helpers');
const ProcessStaticList = _require('core/builder/ProcessStaticList');
const CacheItem = _require('core/common/CacheItem');

var striptags = require('striptags');

const STORED_PROP = 'chap_content';

/**
 * Filter content 
 * @param {String} content 
 * @param {Array} textFilters 
 * @return {String}
 */
function filterContent(content, textFilters = []) {
    // strip tags
    content = striptags(content, ['br']);

    // Remove everything after a certain character
    if (textFilters && textFilters.length > 0) {
        textFilters.map((str) => {
            if (content.indexOf(str) > 0) {
                content = content.substring(0, content.indexOf(str));
            }
        });
    }

    if (!content) {
        console.warn('> Empty content');
    }
    return content;
}

/**
 * Process static page
 * @param {*} builder 
 * @param {*} item 
 * @param {*} grabContentFn 
 * @param {*} config 
 */
function processStaticPage( builder, item, grabContentFn, config) {
    let { textFilters } = config;

    builder.disableJs()
        .access(item.href)
        .evaluate(STORED_PROP, grabContentFn)
        .processProp(STORED_PROP, (content) => {
            return filterContent(content, textFilters);
        });
}

/**
 * Process static page
 * @param {*} builder 
 * @param {*} item 
 * @param {*} grabContentFn 
 * @param {*} config 
 */
function processSinglePage(builder, item, grabContentFn, config) {
    let { textFilters, contentSelector } = config;

    if (!contentSelector) {
        console.error(`Missing 'contentSelector' props of config!`);
    }

    builder.enableJs()
        .access(item.href)
        .waitFor(contentSelector)
        .evaluate(STORED_PROP, grabContentFn)
        .processProp(STORED_PROP, (content) => {
            return filterContent(content, textFilters);
        });
}


module.exports = async (page, chapItems, grabContentFn, config) => {
    let { prefix, processType = 'static' } = config;

    // item : { index, href, title }
    await ProcessStaticList.execute(chapItems, page, {
        before(item) {
            let cacheItem = CacheItem.init(contentPath(prefix, item.index));
            if (cacheItem.exist() && cacheItem.get()) {
                return false;
            }
        },
        after(builder, item) {
            let cacheItem = CacheItem.init(contentPath(prefix, item.index));
            cacheItem.set(builder._decor.getProp(STORED_PROP));
        },
        build(builder, item) {
            console.log('PROCESS ITEM INDEX ', item.index);
            if (processType === 'static') {
                processStaticPage(builder, item, grabContentFn, config);
            } else {
                processSinglePage(builder, item, grabContentFn, config);
            }
        },
    });
}