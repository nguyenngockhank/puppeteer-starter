const ActionDecorator = require('./ActionDecorator');

/**
 * A class to store ajax repsonse. 
 * Class Response at: https://github.com/puppeteer/puppeteer/blob/v3.0.1/docs/api.md#class-response
 */
class StoreResponse extends ActionDecorator {

    constructor(decor) {
        super(decor);

        this._contentType = 'json';

        this.setCallback(async (page) => {
            let { _url, _contentType, _name } = this;

            const response = await page.waitForResponse(_url);

            if (_name) {
                let content = await (_contentType === 'text' ?  response.text() : response.json() );
                this.setProp(_name, content);
            }
        });
    }

    /**
     * Set get content type
     * @param {String} name ['text', 'json']
     */
    setContentType(contentType) {
        this._contentType = contentType;
    }

    /**
     * Set property name
     * @param {String} name 
     */
    setName(name) {
        this._name = name;
    }

    setUrl(url) {
        this._url = url;
    }
}

module.exports = StoreResponse;