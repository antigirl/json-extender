var _ = require('lodash');
var fileA = require('./fileA.json');
var fileB = require('./fileB.json');

var jsonKey = Object.keys(fileB)[0];
var resolvedJson = fileB[jsonKey];

var pointer = '>>file';


function findThemKeys(file) {
    _.forEach(file, function (value, key) {
        if (value !== null && typeof value === "object") { //arrays - map?
            findThemKeys(value);
        }
        if (key === pointer) {
            file[key] = resolvedJson;

            Object.defineProperty(file, jsonKey,
                Object.getOwnPropertyDescriptor(file, key));
            delete file[key];
        }
    });
}

findThemKeys(fileA);
