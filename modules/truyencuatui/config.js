const tcltqProps = {
    firstChapUrl: `https://truyencuatui.net/truyen/tu-chan-lieu-thien-quan.html`,
    prefix: 'tcltq',
    storyName: `Tu chân liêu thiên quần`,
    storySlug: `tu-chan-lieu-thien-quan`,
};

const songKiemProps = {
    prefix: `songkiem`,
    firstChapUrl: `https://truyencuatui.net/truyen/song-kiem.html`,
    storyName: `Song kiếm`,
    storySlug: `song-kiem`,
};

const CONFIG = {
    base: `https://truyencuatui.net`,
    baseUrl: `https://truyencuatui.net`,
    // ...tcltqProps
    ...songKiemProps,
    
    textFilters: [
        `Giao diện cho điện thoại`,
    ],
};

module.exports = CONFIG;