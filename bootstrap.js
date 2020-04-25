require('dotenv').config()

var path = require('path');
global.appRoot = path.resolve(__dirname) + '/';

global._require = function _require(path) {
    let fullPath = appRoot + path;
    return  require(fullPath);
}