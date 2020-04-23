class BaseDecorator {

    /**
     * Create an instance of BaseDecorator
     * @param {BaseDecorator} decorator 
     */
    constructor(decorator) {
        this._decorator = decorator;

        if (!decorator) {
            this._props = {};
        }
        console.log('Init ', this.constructor.name);
    }

    getProp(name) {
        return this.getProps()[name];
    }

    getProps() {
        return this._props || this._decorator.getProps();
    }

    setProp(name, value) {
        // console.log(`Stored prop: ${name}`);
        this.getProps()[name] = value;
    }

    /**
     * @return {Page} page. 
     * Detail at: https://github.com/puppeteer/puppeteer/blob/v3.0.1/docs/api.md#class-page
     */ 
    getPage() {
        return this._page || this._decorator.getPage();
    }


    /**
     * Set page property. 
     * @param {Page} page 
     */
    setPage(page) {
        this._page = page;
    }

    /**
     * Execute
     */
    async execute() {
        // nothing here
    }
}

module.exports = BaseDecorator;