const ProcessBuilder = require('./ProcessBuilder');

const isRequired = () => { throw new Error('param is required'); };


class ProcessStaticList {

    /**
     * To process static list 
     * @param {Array} itemList 
     * @param {Page} page 
     * @param {Object} callbacks  - DS: { before: Function, after: Function, build: Function }
     */
    static async execute(itemList = isRequired(), page = isRequired(), callbacks = isRequired()) {
        let { before, after, build } = callbacks; // callbacks must be an Object

        for (let item of itemList) {
            let skip = before(item) === false;
            if (skip) {
                continue;
            }

            let builder = ProcessBuilder.init(page);
        
            build(builder, item);
            await builder.execute();

            after(builder, item);
        }
    }

    static async withCache() {
        
    }
}

module.exports = ProcessStaticList;