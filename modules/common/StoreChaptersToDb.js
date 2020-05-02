const CacheItem = _require('core/common/CacheItem');

/**
 * Create a Story
 * @param {Database} db 
 * @return {Story}
 */
async function createStory(db, chapterCount, config) {
    const { Story } = db.getModels();
    const { storyName, storySlug, firstChapUrl } = config;

    let [ story ] = await Story.findOrCreate({
        where: { slug: storySlug },
        defaults: {
            name: storyName,
            url: firstChapUrl,
            chapter_count: parseInt(chapterCount), 
        }
    });

    return story;
}

/**
 * Create a Chapter
 * @param {Database} db 
 * @param {Object} info 
 */
async function createChapter(db, { storyId, title, content, index, originUrl }) {
    const { Chapter } = db.getModels();

    let [ chapter ] = await Chapter.findOrCreate({
        where: { story_id: storyId, order: index },
        defaults: {
            content,
            title,
            origin_url: originUrl,
        }
    });

    chapter.title = title; 
    chapter.content = content; 
    chapter.origin_url = originUrl; 
    if (chapter.changed()) {
        await chapter.save();
    }
    return chapter;
}

module.exports = async (db, chapItems, config) => {
    const { prefix, baseUrl } = config;
    
    let story = await createStory(db, chapItems.length, config);
    let storyId = story.id;
    
    for(let chap of chapItems) {
        let { index, href, title } = chap;
        let content = CacheItem.init(`${prefix}/chaps.${index}.html`).get();
        let originUrl = href.startsWith(baseUrl) ? href : `${baseUrl}${href}`;

        await createChapter(db, {
            storyId, content, title, index, originUrl, 
        });
    }

}