const tcltqProps = {
    chaptersUrl: `https://truyencuatui.net/truyen/tu-chan-lieu-thien-quan.html`,
    prefix: 'tcltq',
};

const songKiemProps = {
    prefix: `songkiem`,
    chaptersUrl: `https://truyencuatui.net/truyen/song-kiem.html`,
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