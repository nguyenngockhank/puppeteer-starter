let GrabAuthorLinks = require('./tasks/GrabAuthorLinks');
let GrabAuthorPages = require('./tasks/GrabAuthorPages');
let GrabAuthorPosts = require('./tasks/GrabAuthorPosts');

const config = {
    name: 'Crawl page', 
}

let HomeProcess = AppProcess(config);
HomeProcess.addTask(GrabAuthorLinks);
HomeProcess.addTask(GrabAuthorPages);
HomeProcess.addTask(GrabAuthorPosts);

module.exports = HomeProcess;