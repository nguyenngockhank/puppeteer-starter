const ActionDecorator = require('./base/ActionDecorator');

class ProcessProp extends ActionDecorator {

    constructor(decor) {
        super(decor);

        this._contentType = 'json';

        this.setCallback(async (page) => {
            let { _name, _fnProcess, _storedName } = this;

            // filter value 
            let value = this.getProp(_name);
            if (this._fnFilter) {
                value = this._fnFilter(value); 
            }
            // end filter
            
            let result = _fnProcess(value);
            let storedPropName = _storedName || _name;

            this.setProp(storedPropName, result);
        });
    }

    setFilterFn(fnFilter) {
        this._fnFilter = fnFilter;
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