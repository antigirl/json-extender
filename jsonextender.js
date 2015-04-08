var _ = require('lodash');
var Promise = require('bluebird');

function readFilePath(filePath) {
    var file;
    try {
        file = require('./' + filePath);
        return Promise.resolve(file);
    } catch (e) {
        return Promise.reject('file not found', e);
    }
}

function extendJSON(json, key) {
    return readFilePath(json[key])
    .then(function(jsonToExtend) {
        var jsonKey = Object.keys(jsonToExtend)[0];
        json[key] = jsonToExtend[jsonKey];

        Object.defineProperty(json, jsonKey, Object.getOwnPropertyDescriptor(json, key));
        delete json[key];

        return json;
    });
}

function findPointer(json, pointer) {
    return new Promise( function(resolve) {
        _.forEach(json, function (value, key) {
            if (value !== null && typeof value === "object") { //arrays - map?
                findPointer(value, pointer);
            }
            if (key === pointer) {
                extendJSON(json, key).then( function(returnedJSON) {
                    json = returnedJSON;
                });
            }
        });
        resolve(json);
    });
}


var fileA = require('./fileA.json');
findPointer(fileA, '>>file').then(function(json) {
    console.log(json);
});

// module.exports = function (json, pointer) {
// };

