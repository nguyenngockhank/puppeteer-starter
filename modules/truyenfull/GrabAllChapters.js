const CONFIG = require('./config');
const PageProcess = _require(`core/builder/PageProcess`);

module.exports = async (page, truyenId) => {
    const { prefix, baseUrl, storySlug, } = CONFIG;

    const STORED_PROP = 'allChapters';
    let chapItems = [];
    let pageIndex = 1;
    let grabDone = false;

    do {
        let cacheOption = {
            key: `${prefix}/chaps/${pageIndex}.json`,
            propName: STORED_PROP,
        };

        let chapsUrl = `${baseUrl}${storySlug}/trang-${pageIndex}/`;

        function buildCallback(builder) {
            builder.access(chapsUrl)
                .evaluate(STORED_PROP, function() {
                    // -- grab chapter list
                    let chapters = [];
                    $('.list-chapter li').each((i, el) => {
                        let item = {};
                        let $a = $(el).find('a');
                        item.title = $a.attr('title');
                        item.href = $a.attr('href');
                        let [, index] = item.href.match(/\/chuong-([0-9]+)/);
                        item.index = parseInt(index);
                        chapters.push(item);
                    });
                    // -- end grab chapter list

                    // -- get current Page
                    $('.pagination .active .sr-only').remove();
                    let currentPage = parseInt($('.pagination .active').text());

                    return {
                        chapters,
                        currentPage,
                    };
                });
        }

        let info = await PageProcess.withCache(
            page, 
            cacheOption,
            {
                build: buildCallback
            }
        );
        
        // process chapters & grab done
        let { chapters, currentPage } = info;

        grabDone = currentPage != pageIndex;
        if (!grabDone) { // ignore the last page
            chapItems.push.apply(chapItems, chapters); 
        }

        // increase 
        ++pageIndex;
    } while(!grabDone);

    return chapItems;
}
