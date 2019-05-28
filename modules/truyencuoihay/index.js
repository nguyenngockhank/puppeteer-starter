let GrabPostLinks = require('./tasks/GrabPostLinks');

const config = {
    name: 'TruyenCuoiHay', 
}

let TruyenCuoiHayProcess = AppProcess(config);
TruyenCuoiHayProcess.addTask(GrabPostLinks);


module.exports = TruyenCuoiHayProcess;