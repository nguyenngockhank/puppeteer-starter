const fs = require('fs');
const path = require('path');
const makeDir = require('make-dir');

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
    
    createPathIfNotExist() {
        let dirname = path.dirname(this.getPath());
        if (!fs.existsSync(dirname)) {
            makeDir.sync(dirname);
        }
    }

    set(content) {
        this.createPathIfNotExist();

        let path = this.getPath();
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        return fs.writeFileSync(path, content, 'utf8',);
    }

    get(type = 'text') {
        let path = this.getPath();
        let content = fs.readFileSync(path, 'utf8');
        return type === 'text' ? content : JSON.parse(content);
    }

}

module.exports = CacheItem;