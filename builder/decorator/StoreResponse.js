const ActionDecorator = require('./base/ActionDecorator');

/**
 * A class to store ajax repsonse. 
 * Class Response at: https://github.com/puppeteer/puppeteer/blob/v3.0.1/docs/api.md#class-response
 */
class StoreResponse extends ActionDecorator {

    constructor(decor) {
        super(decor);

        this._contentType = 'json';

        this.setCallback(async (page) => {
            let { _url, _contentType, _name, _cacheItem } = this;

            let content = '';

            // get from cache 
            if (_cacheItem && _cacheItem.exist()) { 
                content = _cacheItem.get();
                if (_contentType != 'text') {
                    content = JSON.parse(content);
                }
            } else {
            // process 
                const response = await page.waitForResponse(_url);
                content = await (_contentType === 'text' ?  response.text() : response.json() );

                if (_cacheItem) {
                    _cacheItem.set(content);
                }
            }
           
            this.setProp(_name, content);
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
    setPropName(name) {
        this._name = name;
    }

    /**
     * Set Url
     * @param {String} name 
     */
    setUrl(url) {
        this._url = url;
    }

    
    setCacheItem(cacheItem) {
        this._cacheItem = cacheItem;
    }
}

module.exports = StoreResponse;