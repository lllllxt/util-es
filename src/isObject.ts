/**
 * 判断输入参数是否为对象(不包含null和undefined)
 * @param {any} input
 * @return {boolean}
 */
const isObject = (input: any): boolean => {
    const _type = typeof input
    return input !== null && (_type === 'object' || _type === 'function')
}
export default isObject
