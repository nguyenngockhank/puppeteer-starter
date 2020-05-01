const CacheItem = _require('core/common/CacheItem');

/**
 * Create a Story
 * @param {Database} db 
 * @return {Story}
 */
async function createStory(db, config) {
    const { Story } = db.getModels();
    const { storyName, storySlug, firstChapUrl } = config;

    let [ story ] = await Story.findOrCreate({
        where: { slug: storySlug },
        defaults: {
            name: storyName,
            url: firstChapUrl,
        }
    });

    return story;
}

/**
 * Create a Chapter
 * @param {Database} db 
 * @param {Object} info 
 */
async function createChapter(db, { storyId, content, index, originUrl }) {
    const { Chapter } = db.getModels();

    let [ chapter ] = await Chapter.findOrCreate({
        where: { story_id: storyId, order: index },
        defaults: {
            content,
            origin_url: originUrl,
        }
    });

    return chapter;
}

module.exports = async (db, chapItems, config) => {
    const { prefix, baseUrl } = config;
    
    let story = await createStory(db, config);
    let storyId = story.id;
    
    for(let chap of chapItems) {
        let { index, href } = chap;
        let content = CacheItem.init(`${prefix}/chaps.${index}.html`).get();
        let originUrl = href.startsWith(baseUrl) ? href : `${baseUrl}${href}`;

        await createChapter(db, {
            storyId, content, index, originUrl, 
        });
    }

}