const CacheItem = _require('core/common/CacheItem');

const prefix = `1niemvinhhang`;
const baseUrl = `https://truyencuatui.net`;

module.exports = async (db) => {

    const { Story, Chapter } = db.getModels();

    let [ story ] = await Story.findOrCreate({
        where: { slug: `nhat-niem-vinh-hang`},
        defaults: {
            name: 'Nhất niệm vĩnh hằng',
            url: `https://truyenfull.vn/nhat-niem-vinh-hang/`,
        }
    });

    let storyId = story.id;
 
    const chaps = CacheItem.init(`${prefix}/chaps.json`).get(`json`);

    for(let chap of chaps) {
        let index = chap.index;
        // let index = chap.index + 1;
        let content = CacheItem.init(`${prefix}/chaps.${index}.html`).get();

        await Chapter.findOrCreate({
            where: { story_id: storyId, order: index },
            defaults: {
                // title: chap.text,
                content,
                origin_url: `${baseUrl}${chap.href}`,
            }
        });
    }
}