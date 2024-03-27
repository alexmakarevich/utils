"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisifier = void 0;
var promisifier = function (cpsFn, context) {
    return function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return new Promise(function (res, rej) {
            cpsFn.call.apply(cpsFn, __spreadArray(__spreadArray([context !== null && context !== void 0 ? context : null], params, false), [function (err) {
                    var results = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        results[_i - 1] = arguments[_i];
                    }
                    return (err ? rej(err) : res(results));
                }], false));
        });
    };
};
exports.promisifier = promisifier;
//# sourceMappingURL=promisifier.js.map