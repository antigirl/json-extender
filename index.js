var Promise = require('bluebird');

function findPointer(json, pointer) {
    return new Promise(function (resolve, reject) {
        Promise.each(Object.keys(json), function (key) {
            var value = json[key];
            if (typeof value === "object") {
                return findPointer(value, pointer);
            }
            if (key.indexOf(pointer) != -1) {
                readFile(value).
                then(JSON.parse).
                then(function (res) {
                    extendJson(json, res, key);
                });
            }
        }).catch(function (e) {
            reject(e);
        }).done(function () {
            resolve(json);
        });
    });
}

function extendJson(json, file, key) {
    var fileJsonKey = Object.keys(file)[0];
    json[key] = file[fileJsonKey];
    json[fileJsonKey] = json[key];
    delete json[key];
    return json;
}

function readFile(filePath) {
    return Promise.resolve(JSON.stringify(require(filePath)));
}

module.exports = findPointer;
