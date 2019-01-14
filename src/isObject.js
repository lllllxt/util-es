/**
 * 判断是否对对象
 * 
 */

const isObject = function (input) {
    const _type = typeof input
    return input !== null && (_type === 'object' || _type === 'function')
}
module.exports = isObject