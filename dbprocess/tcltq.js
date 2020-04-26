const CacheItem = _require('core/common/CacheItem');

const prefix = `tcltq`;
const baseUrl = `https://truyencuatui.net`;

module.exports = async (db) => {

    const { Story, Chapter } = db.getModels();

    let [ story ] = await Story.findOrCreate({
        where: { slug: `tu-chan-lieu-thien-quan`},
        defaults: {
            name: 'Tu chân liêu thiên quần',
            url: `https://truyencuatui.net/truyen/tu-chan-lieu-thien-quan.html`,
        }
    });

    let storyId = story.id;
 
    const chaps = CacheItem.init(`${prefix}/chaps.json`).get(`json`);

    for(let chap of chaps) {
        let index = chap.index + 1;
        let content = CacheItem.init(`${prefix}/chaps.${index}.html`).get();

        await Chapter.findOrCreate({
            where: { story_id: storyId, order: index },
            defaults: {
                title: chap.text,
                content,
                origin_url: `${baseUrl}${chap.href}`,
            }
        });
    }
}