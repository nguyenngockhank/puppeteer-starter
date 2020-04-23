const ActionDecorator = require('./base/ActionDecorator');

class Access extends ActionDecorator {

    constructor(decor) {
        super(decor);

        this.setCallback(async (page) => {
            await page.goto(this._url);
        });
    }

    setUrl(url) {
        this._url = url;
    }
}

module.exports = Access;