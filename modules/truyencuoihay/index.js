let GrabPostLinks = require('./tasks/GrabPostLinks');
let GrabPostsData = require('./tasks/GrabPostsData');

const config = {
    name: 'TruyenCuoiHay', 
    url: 'http://www.truyencuoihay.vn',
}

let TruyenCuoiHayProcess = AppProcess(config, { });
TruyenCuoiHayProcess.addTask(GrabPostLinks);
TruyenCuoiHayProcess.addTask(GrabPostsData);


module.exports = TruyenCuoiHayProcess;