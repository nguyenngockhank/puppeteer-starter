const ActionDecorator = require('./base/ActionDecorator');

class SetJsEnabled extends ActionDecorator {

    constructor(decor) {
        super(decor);

        this.setCallback(async (page) => {
            await page.setJavaScriptEnabled(this._enableJs);
        });
    }

    setEnabled(value = true) {
        this._enableJs = !!value;
    }
}

module.exports = SetJsEnabled;