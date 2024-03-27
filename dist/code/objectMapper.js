"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectMapperComplex = exports.objectMapperSimple = void 0;
var objectMapperSimple = function (callback) {
    return function (p, properties) {
        var newObject = {};
        for (var prop in p) {
            // @ts-ignore
            newObject[prop] = properties.includes(prop) ? callback(p[prop]) : p[prop];
        }
        return newObject;
    };
};
exports.objectMapperSimple = objectMapperSimple;
var objectMapperComplex = function (callback) {
    return function (p, properties) {
        var newObject = {};
        for (var prop in p) {
            // @ts-ignore
            newObject[prop] = properties.includes(prop) ? callback(p[prop]) : p[prop];
        }
        return newObject;
    };
};
exports.objectMapperComplex = objectMapperComplex;
//# sourceMappingURL=objectMapper.js.map