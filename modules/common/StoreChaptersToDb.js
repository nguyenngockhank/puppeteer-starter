const { contentPath, storyPath } = require('./helpers');
const CacheItem = _require('core/common/CacheItem');

/**
 * Create a Story
 * @param {Database} db 
 * @return {Story}
 */
async function createStory(db, chapterCount, config) {
    const { Story } = db.getModels();
    const { storyName, storySlug, firstChapUrl, author, summary } = config;

    let [ story ] = await Story.findOrCreate({
        where: { slug: storySlug },
        defaults: {
            name: storyName,
            url: firstChapUrl,
            summary: summary,
            author: author,
            chapter_count: parseInt(chapterCount), 
        }
    });

    story.author = author;
    story.name = storyName;
    story.summary = summary;
    story.url = firstChapUrl;
    story.chapter_count = parseInt(chapterCount);
    if (story.changed()) {
        await story.save();
    }
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

/**
 * Create story if not exist
 * then store chapter list to database
 *  - grab content chapter from cache
 */
module.exports = async (db, chapItems, config) => {
    const { prefix, baseUrl } = config;
    
    let storyInfo = CacheItem.init(storyPath(prefix)).get('json') || {};
    let storyConfig = { ...config, ...storyInfo };
    let story = await createStory(db, chapItems.length, storyConfig);

    let storyId = story.id;
    
    for(let chap of chapItems) {
        let { index, href, title } = chap;
        let content = CacheItem.init(contentPath(prefix, index)).get();
        let originUrl = href.startsWith(baseUrl) ? href : `${baseUrl}${href}`;

        await createChapter(db, {
            storyId, content, title, index, originUrl, 
        });
    }

}