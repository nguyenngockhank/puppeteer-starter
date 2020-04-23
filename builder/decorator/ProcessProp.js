const ActionDecorator = require('./base/ActionDecorator');
const JqueryHelper = require('../../common/JqueryHelper');

class ProcessProp extends ActionDecorator {

    constructor(decor) {
        super(decor);

        this._contentType = 'json';

        this.setCallback(async (page) => {
            let { _name, _fnProcess, _storedName } = this;

            const value = this.getProp(_name);
            const $ = JqueryHelper.getInstance(value);

            // call 
            let result = _fnProcess($);
            let storedPropName = _storedName || _name;

            this.setProp(storedPropName, result);
        });
    }

    /**
     * Set process callback 
     * @param {Function} fnProcess 
     */
    setProcessFn(fnProcess) {
        this._fnProcess = fnProcess;
    }

    /**
     * Set property name
     * @param {String} name 
     */
    setPropName(name) {
        this._name = name;
    }

    /**
     * Set stored property name
     * @param {String} name 
     */
    setStoredPropName(storedName) {
        this._storedName = storedName;
    }
}

module.exports = ProcessProp;