"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var methodPromisifier_1 = require("./methodPromisifier");
var sampleCpsFn = function (a, b, cb) {
    cb(null, "something");
};
var srcObject = {
    aCpsMethod: sampleCpsFn,
};
var tryPromisifyAllMethods = (0, methodPromisifier_1.promisifyAllMethods)(srcObject, ["aCpsMethod"]);
//# sourceMappingURL=methodPromisifier.test.js.map