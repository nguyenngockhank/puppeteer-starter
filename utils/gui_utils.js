let Logger = require('./logger')

function siteUrl(link) {
    return process.env.SITE_URL + link;
}

async function keyIn(page, selector, content, option = null) {
    await page.focus(selector);
    await page.keyboard.type(content, option);
}

async function dblClick(page, selector) {
    page.click(selector, {clickCount: 2}); // double click
}

async function screenshot(page, name, path = 'screen') {
    await page.screenshot({ path: `${path}/${name}.png` });
}

async function accessPage(page, url, capture = '', timeWait = 2000) {
    await page.bringToFront(); // active

    /// correct url
    let siteurl = url;
    if(!url.startsWith('http')) {
        siteurl = siteUrl(url);
    }
    Logger.info('ACCESS PAGE: ' + siteurl);
    /// end correct url

    await page.goto(siteurl, {
        waitUntil: 'networkidle2'
    });

    await page.waitFor(timeWait); // wait for dom render

    if(capture != '') {
        await screenshot(page, capture); 
    }
}

exports.siteUrl = siteUrl;
exports.keyIn = keyIn;
exports.dblClick = dblClick;
exports.accessPage = accessPage;
exports.screenshot = screenshot;