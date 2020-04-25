const ProcessBuilder = require('./ProcessBuilder');
const CacheItem = _require('core/common/CacheItem');

const isRequired = () => { throw new Error('param is required'); };

/**
 * A object containning callbacks
 * @typedef {Object} PageProcessCallbacks
 * @property {Function} before - before process
 * @property {Function} build - build process
 * @property {Function} after - after process
 */

class PageProcess {

    /**
     * To process a page
     * @param {Page} page 
     * @param {PageProcessCallbacks} callbacks - DS: { before: Function, after: Function, build: Function }
     */
    static async execute(page = isRequired(), callbacks = isRequired()) {
        let { before, after, build } = callbacks; // callbacks must be an Object

        if (before) {
            let skip = before() === false;
            if (skip) {
                return;
            }
        }

        let builder = ProcessBuilder.init(page);
    
        build(builder);
        await builder.execute();

        if (after) {
            after(builder);
        }

        return builder;
    }

    /**
     * To process a page
     * @param {Page} page 
     * @param {Object} cacheOption - DS: { key: String, propName: String }
     * @param {PageProcessCallbacks} callbacks - DS: { before: Function, after: Function, build: Function }
     */
    static async withCache(page, cacheOption, callbacks) {
        let {  build } = callbacks; 

        let { key, propName, } = cacheOption;

        const cacheItem = CacheItem.init(key);

        await PageProcess.execute(page, {
            before() {
                if (cacheItem.exist()) {
                    return false;
                }
            },
            after(builder) {
                // store attribute
                cacheItem.set(builder._decor.getProp(propName));
            }, 
            build
        });

        return cacheItem.get('json');
    }
}

module.exports = PageProcess;