const CONFIG = require('./config');
const PageProcess = _require(`core/builder/PageProcess`);

const { storyPath } = require('../common/helpers');

var striptags = require('striptags');

/**
 * Filter content 
 * @param {String} content 
 * @return {String}
 */
function filterContent(content) {
    // strip tags
    content = striptags(content, ['br', 'i', 'b', 'strong', 'em']);

    if (!content) {
        console.warn('> Empty content');
    }
    return content;
}

module.exports = async (page) => {
    const { prefix, storySlug, baseUrl } = CONFIG;
    const STORED_PROP = 'truyenInfo';
    
    const cacheOption = {
        key: storyPath(prefix),
        propName: STORED_PROP,
    };

    
    const storyUrl = `${baseUrl}${storySlug}`;
    function buildFn(builder) {
        builder
            .access(storyUrl)
            .evaluate(STORED_PROP, function() {
                let name = document.querySelector('h3[itemprop="name"]').innerHTML;
                let description = document.querySelector('.desc-text-full').innerHTML;
                let author = document.querySelector('[itemprop="author"]').innerHTML;

                return {
                    name,
                    author,
                    summary: description,
                };
            })
            .processProp(STORED_PROP, (info) => {
                info.summary = filterContent(info.summary);
                return info;
            });
    }


    let storyInfo = await PageProcess.withCache(
        page, 
        cacheOption,
        {
            build: buildFn
        }
    );
    
    return storyInfo;
}
