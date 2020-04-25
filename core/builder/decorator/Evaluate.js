const ActionDecorator = require('./base/ActionDecorator');

class Evaluate extends ActionDecorator {

    constructor(decor) {
        super(decor);

        this.setCallback(async (page) => {
            let callback = this._fnProcess;
            const result = await page.evaluate(callback);
            this.setProp(this._propName, result);
        });
    }
    /**
     * Set process callback 
     * @param {Function} fnProcess 
     */
    setProcessFn(fnProcess) {
        this._fnProcess = fnProcess;
    }

    setPropName(propName) {
        this._propName = propName;
    }
}

module.exports = Evaluate;