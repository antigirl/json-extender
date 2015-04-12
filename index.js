var Promise = require('bluebird');
var fileA = require('./fileA.json');

function findPointer(json, pointer) {
    return new Promise(function (resolve, reject) {
        Promise.each(Object.keys(json), function (key) {
            var value = json[key];
            if (typeof value === "object") {
                return findPointer(value, pointer);
            }
            if (key.indexOf(pointer) != -1) {
                extendJson(json, value, key)
                    .catch(function (e) {
                        reject(e);
                    });
            }
        }).done(function () {
            resolve(json);
        });
    });
}

function extendJson(json, filePath, key) {
    return new Promise(function (resolve, reject) {
        readFile(filePath)
            .then(function (file) {
                var fileJsonKey = Object.keys(file)[0];
                json[key] = file[fileJsonKey];
                json[fileJsonKey] = json[key];
                delete json[key];
                resolve(json);
            }).catch(function (e) {
                reject(e);
            });

    });
}

function readFile(filePath) {
    var file = require(filePath);
    if (file) {
        return Promise.resolve(file);
    }
    return Promise.reject(filePath, ' file not found', e);
}

module.exports = findPointer;
