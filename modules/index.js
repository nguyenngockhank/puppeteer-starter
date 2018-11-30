let Runner = {}

Runner.run = async function (page, moduleName) {
    var appProcess = require(`./${moduleName}`)
    appProcess.setPage(page)
    await appProcess.run();
}

module.exports = Runner