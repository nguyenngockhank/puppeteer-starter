let utils = require('./utils');
let { _ } = utils._;
 
const config = require('./config').config;
const fs = require('fs');


let dataRuntime = {
    config: config,
    fs: fs,
};

_.extend(dataRuntime, utils);

exports.dataRuntime = dataRuntime;