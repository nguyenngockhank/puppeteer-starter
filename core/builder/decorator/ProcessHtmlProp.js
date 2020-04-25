const ProcessProp = require('./ProcessProp');
const JqueryHelper = _require('core/common/JqueryHelper');

class ProcessHtmlProp extends ProcessProp {

    constructor(decor) {
        super(decor);

        this.setFilterFn((value) => {
            return JqueryHelper.getInstance(value);
        });
    }
}

module.exports = ProcessHtmlProp;