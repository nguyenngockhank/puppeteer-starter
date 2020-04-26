const CONFIG = require('./config');
const PageProcess = _require(`core/builder/PageProcess`);

module.exports = async (page) => {
    const { prefix, chaptersUrl } = CONFIG;

    const STORED_PROP = 'all_chaps';
    const cacheOption = {
        key: `${prefix}/chaps.json`,
        propName: STORED_PROP,
    };

    let chapItems = await PageProcess.withCache(
        page, 
        cacheOption,
        {
            build(builder) {
                // const chapHtmlCache = CacheItem.init('tcltq/chaps.html');
                builder.access(chaptersUrl)
                    .click(`.btn-chapters`)
                    .storeResponse(
                        chaptersUrl.replace(`/truyen/`, `/chuong/`), 
                        'chapters', 
                        'text'
                    )
                    .processHtmlProp('chapters', ($) => {
                        let result = [];
                        $('.chuong-item').each(function( index ) {
                            index = parseInt(index) + 1;

                            let item = {
                                index,
                                href: $(this).prop('href'),
                                text: $(this).text(),
                            };
                            result.push(item);
                        });
                        return result;
                    }, STORED_PROP);
            }
        }
    );
    
    return chapItems;
}