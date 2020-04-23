const BaseDecorator = require('./decorator/BaseDecorator');
const Access = require('./decorator/Access');
const Click = require('./decorator/Click');
const StoreResponse = require('./decorator/StoreResponse');

// const ActionDecorator = require('./decorator/ActionDecorator');

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

    storeResponse(url = isRequired(), name = undefined, contentType = 'json') {
        let decor = new StoreResponse(this._decor);
        decor.setUrl(url);
        decor.setName(name);
        decor.setContentType(contentType);
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