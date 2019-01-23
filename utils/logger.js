const colors = require('colors');

let Logger = {
    info: function(str, ...args) {
        console.log(colors.cyan(str), ...args);
    }, 
    error: function(str, ...args) {
        console.log(colors.red(str), ...args);
    },
    success: function(str, ...args) {
        console.log(colors.green(str), ...args);
    },
    case: function(str, ...args) {
        var prefix = '>>> Case: ';
        console.log(colors.rainbow(prefix + str), ...args);
    },
    subCase: function(str, ...args) {
        var prefix = '>>> Sub case: ';
        console.log(colors.yellow(prefix + str), ...args);
    },
    pink: function (str, ...args) {
        console.log(colors.magenta(str), ...args);
    }, 
    yellow: function(str, ...args) {
        console.log(colors.yellow(str), ...args);
    }
}

module.exports = Logger;