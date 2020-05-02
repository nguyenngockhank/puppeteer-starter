let utils = require('./utils');
let { _ } = utils._;
 
const fs = require('fs');


let dataRuntime = {
    fs: fs,
};

_.extend(dataRuntime, utils);

exports.dataRuntime = dataRuntime;