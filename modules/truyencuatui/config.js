const tcltqProps = {
    firstChapUrl: `https://truyencuatui.net/truyen/tu-chan-lieu-thien-quan.html`,
    prefix: 'tuchanlieuthienquan',
    storyName: `Tu chân liêu thiên quần`,
    storySlug: `tu-chan-lieu-thien-quan`,
    author: `Thánh Kỵ Sĩ Truyền Thuyết`,
};

const songKiemProps = {
    prefix: `songkiem`,
    firstChapUrl: `https://truyencuatui.net/truyen/song-kiem.html`,
    storyName: `Song kiếm`,
    storySlug: `song-kiem`,
    author: 'Hà Tả',
};

const takomuonnghichthienProps = {
    prefix: `takomuonnghichthien`,
    firstChapUrl: `https://truyencuatui.net/truyen/ta-khong-muon-nghich-thien-a.html`,
    storyName: `Ta Không Muốn Nghịch Thiên A`,
    storySlug: `ta-khong-muon-nghich-thien-a`,
    author: 'Tân Phong',
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