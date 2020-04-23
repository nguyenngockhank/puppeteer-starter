const fs = require('fs');

class CacheItem {

    constructor(key) {
        this.appRoot = global.appRoot;
        this._key = key;
    }

    static init(key) {
        return new CacheItem(key);
    }

    getPath() {
        return `${this.appRoot}cache/${this._key}`;
    }

    exist() {
        let path = this.getPath();
        return fs.existsSync(path);
    }
    
    set(content) {
        let path = this.getPath();
        return fs.writeFileSync(path, content, 'utf8',);
    }

    get() {
        let path = this.getPath();
        return fs.readFileSync(path, 'utf8');
    }

}

module.exports = CacheItem;