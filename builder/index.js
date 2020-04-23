const BaseDecorator = require('./decorator/base/BaseDecorator');
const Access = require('./decorator/Access');
const Click = require('./decorator/Click');
const StoreResponse = require('./decorator/StoreResponse');
const ProcessProp = require('./decorator/ProcessProp');


const isRequired = () => { throw new Error('param is required'); };

class PageBuilder {
 

    static init(page = isRequired()) {
        let instance = new PageBuilder;


        let decor = new BaseDecorator();
        decor.setPage(page);
        return instance._setNewDecor(decor);
    }

    access(url = isRequired()) {
        let decor = new Access(this._decor);
        decor.setUrl(url);
        return this._setNewDecor(decor);
    }

    click(selector = isRequired()) {
        let decor = new Click(this._decor);
        decor.setSelector(selector);
        return this._setNewDecor(decor); 
    }

    storeResponse(url = isRequired(), name = undefined, contentType = 'json', cacheItem = null) {
        let decor = new StoreResponse(this._decor);
        decor.setUrl(url);
        decor.setPropName(name);
        decor.setContentType(contentType);
        decor.setCacheItem(cacheItem);
        return this._setNewDecor(decor); 
    }

    processProp(propName = isRequired(), processFn = isRequired(), storedName = '') {
        let decor = new ProcessProp(this._decor);
        decor.setPropName(propName);
        decor.setProcessFn(processFn);
        decor.setStoredPropName(storedName);
        return this._setNewDecor(decor); 
    }

    /**
     * Execute the chainning actions 
     */
    async execute() {
        await this._decor.execute();
    }

    _setNewDecor(decor) {
        this._decor = decor;
        return this;
    }
}

module.exports = PageBuilder;