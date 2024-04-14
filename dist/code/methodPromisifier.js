"use strict";
exports.__esModule = true;
exports.promisifyAllMethods = void 0;
var promisifier_1 = require("../code/promisifier");
var objectMapper_1 = require("./objectMapper");
// TODO: any way to get rid of ignore, e.g. in the case below?
// /** @ts-ignore  */
// export const promisifierHkt: SimpleFunctionAsHKT<PromisifierFnHkt> = promisifier;
var promisifyAllMethods = function (objectWithCpsmethods, props) {
    return (0, objectMapper_1.objectMapperSimple)(promisifier_1.promisifier)(objectWithCpsmethods, props);
};
exports.promisifyAllMethods = promisifyAllMethods;
//# sourceMappingURL=methodPromisifier.js.map