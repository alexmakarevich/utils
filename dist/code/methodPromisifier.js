"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisifyAllMethods = void 0;
var promisifier_1 = require("../code/promisifier");
var objectMapper_1 = require("./objectMapper");
var promisifyAllMethods = function (objectWithCpsmethods, props) {
    return (0, objectMapper_1.objectMapperSimple)(promisifier_1.promisifier)(objectWithCpsmethods, props);
};
exports.promisifyAllMethods = promisifyAllMethods;
//# sourceMappingURL=methodPromisifier.js.map