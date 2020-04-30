const CONFIG = require('./config');
const PageProcess = _require(`core/builder/PageProcess`);

module.exports = async (page) => {
    const { prefix, firstChapUrl } = CONFIG;

    const STORED_PROP = 'truyenId';
    
    const cacheOption = {
        key: `${prefix}/info.json`,
        propName: STORED_PROP,
    };

    function buildFn(builder) {
        builder
            .access(firstChapUrl)
            .evaluate(STORED_PROP, function() {
                let truyenId = document.querySelector(`#truyen-id`).value;
                let name = document.querySelector('.truyen-title').text;
                return {
                    name,
                    truyenId
                };
            });
    }

    const callbacks = {
        build: buildFn
    };

    let chapItems = await PageProcess.withCache(
        page, 
        cacheOption,
        callbacks
    );
    
    return chapItems;
}
