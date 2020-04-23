const BaseDecorator = require('./BaseDecorator');

class ActionDecorator extends BaseDecorator {

    setCallback(fnExecute) {
        this._fn = fnExecute;
    }

    async execute() {
        await this._decorator.execute();
        let page = this.getPage();

        // action
        let fn = this._fn;
        await fn(page);
    }
}

module.exports = ActionDecorator;