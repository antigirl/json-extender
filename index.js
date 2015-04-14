var Promise = require('bluebird');

function extendJson(json, pointer) {
    Object.keys(json).map(function (key) {
        if (typeof json[key] === 'object') {
            return extendJson(json[key], pointer);
        }

        if (key.indexOf(pointer) !== -1) {
            var extendedJson = require(json[key]);
            newKey = Object.keys(extendedJson)[0];
            json[newKey] = extendedJson[newKey];
            delete json[key];
        }
    });

    return json;
}

module.exports = function(json, pointer) {
    return Promise.try(function() {
        return extendJson(json, pointer);
    });
};
