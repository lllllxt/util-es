/**
 * 判空
 * @param {any} input
 * @return { bollean }
 */
const isEmpty = function (input) {
    // null or undefined
    if (input === null || input === undefined) return true;
    // Array or Map or Set
    if (input.length === 0 || input.size === 0) return true;
    if (input.length > 0 || input.size > 0) return false;
    // Date or Number
    if (input instanceof Date || typeof input === 'number') return false
    // Object
    if (Object.keys(input).length > 0) return false
    return true
}
export default isEmpty