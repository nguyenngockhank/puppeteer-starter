const _ = require("underscore");

_.randVal = function(list){
    if(!_.isArray(list)) {
        return null;
    }

    if(list.length == 0) {
        return null;
    }

    let index = _.random(0, list.length - 1)
    return list[index];
}

_.randIndex = function(list) {
    if(!_.isArray(list)) {
        return null;
    }
    if(list.length == 0) {
        return null;
    }
    return _.random(0, list.length - 1)
}

_.access = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if(_.isNull(o) || _.isUndefined(o)) {
            return;
        }
        if (k in o) {
            if(!_.has(o,k)){
                return;
            }
            o = o[k];
        } else {
            return;
        }
    }
    return o;
};

exports._ = _;