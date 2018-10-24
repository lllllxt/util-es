'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 判空
 * @param {any} input
 * @return { bollean }
 */
var isEmpty = function isEmpty(input) {
    // null or undefined
    if (input === null || input === undefined) return true;
    // Array or Map or Set
    if (input.length === 0 || input.size === 0) return true;
    if (input.length > 0 || input.size > 0) return false;
    // Date or Number
    if (input instanceof Date || typeof para === 'number') return false;
    // Object
    if (Object.keys(input).length > 0) return false;
    return true;
};
exports.default = isEmpty;