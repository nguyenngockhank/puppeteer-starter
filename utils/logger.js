const colors = require('colors');

let Logger = {
    info: function(str){
        console.log(colors.cyan(str));
    }, 
    error: function(str){
        console.log(colors.red(str));
    },
    success: function(str){
        console.log(colors.green(str));
    },
    case: function(str){
        var prefix = '>>> Case: ';
        console.log(colors.rainbow(prefix + str));
    },
    subCase: function(str){
        var prefix = '>>> Sub case: ';
        console.log(colors.yellow(prefix + str));
    },
    pink: function (str) {
        console.log(colors.magenta(str));
    }, 
    yellow: function(str){
        console.log(colors.yellow(str));
    }
}

module.exports = Logger;