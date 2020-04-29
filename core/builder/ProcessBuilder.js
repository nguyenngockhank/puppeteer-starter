const BaseDecorator = require('./decorator/base/BaseDecorator');
const Access = require('./decorator/Access');
const Click = require('./decorator/Click');
const WaitFor = require('./decorator/WaitFor');
const SetJsEnabled = require('./decorator/SetJsEnabled');
const Evaluate = require('./decorator/Evaluate');
const StoreResponse = require('./decorator/StoreResponse');
const ProcessProp = require('./decorator/ProcessProp');
const ProcessHtmlProp = require('./decorator/ProcessHtmlProp');


const isRequired = () => { throw new Error('param is required'); };

class ProcessBuilder {
 
    static init(page = isRequired()) {
        let instance = new ProcessBuilder;
        let decor = new BaseDecorator();
        decor.setPage(page);
        return instance._setNewDecor(decor);
    }

    access(url = isRequired()) {
        let decor = new Access(this._decor);
        decor.setUrl(url);
        return this._setNewDecor(decor);
    }

    waitFor(action = isRequired()) {
        let decor = new WaitFor(this._decor);
        decor.setAction(action);
        return this._setNewDecor(decor);
    }

    enableJs() {
        let decor = new SetJsEnabled(this._decor);
        decor.setEnabled(true);
        return this._setNewDecor(decor);
    }

    disableJs() {
        let decor = new SetJsEnabled(this._decor);
        decor.setEnabled(false);
        return this._setNewDecor(decor);
    }

    click(selector = isRequired()) {
        let decor = new Click(this._decor);
        decor.setSelector(selector);
        return this._setNewDecor(decor); 
    }

    evaluate(propName = isRequired(), processFn = isRequired()) {
        let decor = new Evaluate(this._decor);
        decor.setPropName(propName);
        decor.setProcessFn(processFn);
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
        return this._processProp(decor, propName, processFn, storedName);
    }

    processHtmlProp(propName = isRequired(), processFn = isRequired(), storedName = '') {
        let decor = new ProcessHtmlProp(this._decor);
        return this._processProp(decor, propName, processFn, storedName);
    }

    /**
     * Execute the chainning actions 
     */
    async execute() {
        await this._decor.execute();
    }

    _processProp(decor, propName, processFn, storedName) {
        decor.setPropName(propName);
        decor.setProcessFn(processFn);
        decor.setStoredPropName(storedName);
        return this._setNewDecor(decor); 
    }

    _setNewDecor(decor) {
        this._decor = decor;
        return this;
    }
}

module.exports = ProcessBuilder;