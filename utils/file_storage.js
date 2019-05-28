var fs = require('fs');

let instance = {};

function getFullPath(key){
    return global.appRoot + 'cache/' + key;
}


instance.set =  function(key, data){
    return new Promise(function(resolve, reject){
        let str = 'string' === typeof data ? data : JSON.stringify(data);
        let fullPath = getFullPath(key);
        fs.writeFile(fullPath, str, 'utf8', function(err){
            if(err) {
                return reject(err);
            }
            resolve();
        });
    })
}

instance.get = function(key) {
    return new Promise(function(resolve, reject){
        let fullPath = getFullPath(key);
        if (!fs.existsSync(fullPath)) {
            return resolve(null);
        }
        fs.readFile(fullPath, 'utf8', function readFileCallback(err, data){
            if(err) {
                return reject(err);
            }
            data = JSON.parse(data); 
            resolve(data)
        });
    });
}

instance.has = function(key) {
    let fullPath = getFullPath(key);
    return fs.existsSync(fullPath);
}



module.exports = instance;