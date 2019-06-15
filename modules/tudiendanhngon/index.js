let GrabCategories = require('./tasks/GrabCategories');
let GrabPostsData = require('./tasks/GrabPostsData');

const config = {
    name: 'TuDienDanhNgon', 
    url: 'http://www.tudiendanhngon.vn',
}



let TudienDanhngonProcess = AppProcess(config, { });
TudienDanhngonProcess.addTask(GrabCategories);
TudienDanhngonProcess.addTask(GrabPostsData);


module.exports = TudienDanhngonProcess;