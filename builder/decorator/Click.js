const ActionDecorator = require('./ActionDecorator');

class Click extends ActionDecorator {

    constructor(decor) {
        super(decor);

        this.setCallback(async (page) => {
            await page.click(`${this._selector}`);
        });
    }

    setSelector(selector) {
        this._selector = selector;
    }
}

module.exports = Click;