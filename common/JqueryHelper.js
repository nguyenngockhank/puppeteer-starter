const { JSDOM } = require( "jsdom" );
const jquery = require( "jquery" );

class JQueryHelper {
    static getInstance(content) {
        const { window } = new JSDOM(content);
        return jquery(window);
    }

    static getInstanceFromCache(key) {

    }
}

module.exports = JQueryHelper;