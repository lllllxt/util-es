'use strict';

/**
 * 判空
 * @param {any} input
 * @return { bollean }
 */
var isEmpty = function isEmpty(input) {
    // null or undefined
    if (input === null || input === undefined) return true;
    // Array or String
    if (input instanceof Array || typeof input === 'string') return !input.length;
    // Map or Set
    if (input instanceof Map || input instanceof Set) return !input.size;
    // Date or Number
    if (input instanceof Date || typeof input === 'number' || typeof input === 'boolean') return false;
    // Object
    if (Object.keys(input).length === 0) return true;
    return false;
};
module.exports = isEmpty;