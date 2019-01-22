let InjectTask = require('./tasks/InjectJquery');
let GrabAuthorLinks = require('./tasks/GrabAuthorLinks');
let ProcessAuthor = require('./tasks/ProcessAuthorPage');

const config = {
    name: 'Crawl  page', 
    url: 'http://danhngoncuocsong.vn/tac-gia.html',
}

let HomeProcess = AppProcess(config);

HomeProcess.addTask(InjectTask);
HomeProcess.addTask(GrabAuthorLinks);
HomeProcess.addTask(ProcessAuthor);


module.exports = HomeProcess;