const CONFIG = require('./config');
const PageProcess = _require(`core/builder/PageProcess`);

module.exports = async (page, truyenId) => {
    const { prefix, baseUrl, storySlug, } = CONFIG;

    const STORED_PROP = 'allChapters';
    const cacheOption = {
        key: `${prefix}/chaps.json`,
        propName: STORED_PROP,
    };

    let optionUrl = `${baseUrl}ajax.php?type=chapter_option&data=${truyenId}`;

    let callbacks = {
        build(builder) {

            builder
                .access(optionUrl)
                .evaluate(STORED_PROP, function() {
                    let result = [];
                    for(var optionEl of document.getElementsByTagName('option')) {
                        result.push(optionEl.value);
                    }
                    return result;
                })
                .processProp(STORED_PROP, (content) => {
                    return content.map((chapSlug) => {
                        // chapSlug example: `chuong-1`
                        let [, index] = chapSlug.match(/chuong-([0-9]+)/);
                        index = parseInt(index);
                        
                        return {
                            href: `${storySlug}/${chapSlug}/`,
                            index 
                        };
                    });
                });
        }
    };

    let chapItems = await PageProcess.withCache(
        page, 
        cacheOption,
        callbacks
    );
    
    return chapItems;
}
