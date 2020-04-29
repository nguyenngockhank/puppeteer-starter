const ActionDecorator = require('./base/ActionDecorator');

class WaitFor extends ActionDecorator {

    constructor(decor) {
        super(decor);

        this.setCallback(async (page) => {
            await page.waitFor(this._action);
        });
    }

    setAction(action) {
        this._action = action;
    }
}

module.exports = WaitFor;