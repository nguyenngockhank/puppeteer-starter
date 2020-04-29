const CONFIG = require('./config');
const PageProcess = _require(`core/builder/PageProcess`);

module.exports = async (page) => {
    const { prefix, firstChapUrl } = CONFIG;

    const STORED_PROP = 'info';
    const cacheOption = {
        key: `${prefix}/info.json`,
        propName: STORED_PROP,
    };

    const callbacks = {
        build(builder) {
            builder
                .access(firstChapUrl)
                .waitFor(`.mat-tab-list`)
                .click('.mat-tab-list .mat-tab-label:nth-child(2)')
                .waitFor(3000)
                .evaluate(STORED_PROP, function() {
                    let lastChapHref = document.querySelector('#chapter li a').href; 
                    let [, maxChapter] = lastChapHref.match(/toi-cuong-phan-phai-he-thong\/([0-9]+)/)

                    let author = document.querySelector('.author .author').textContent;
                    let storyName = document.querySelector('.title-detail').textContent;

                    return {
                        storyName,
                        maxChapter: parseInt(maxChapter),
                        author,
                    };
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
