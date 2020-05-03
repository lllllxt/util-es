/**
 * 判断类型
 * @param {any} input
 * @return { string }
 */
function getType(input: any): string {
    if (input === null) return 'null'
    if (input === undefined) return 'undefined'
    const type = Object.prototype.toString.call(input).slice(8, -1).toLowerCase()
    if (type === 'string' && typeof input === 'object') return 'object'
    else return type
}

/**
 * 判断传入数据是否为空字符或对象 ( {} [] Map Set), 返回 Boolean
 * @param {any} input
 * @return { boolean }
 */
const isEmpty = function (input: any): boolean {
    const type = getType(input)
    // null or undefined
    if (type === 'null' || type === 'undefined') return true
    // Array or String
    if (type === 'array' || typeof input === 'string') return !input.length
    // Map or Set
    if (type === 'map' || type === 'set') return !input.size
    // Date or Number/Bigint or Boolean 不管具体是什么都应该为true
    if (['date', 'number', 'bigint', 'boolean'].includes(type)) return false
    // Object
    if (type === 'object' && Object.keys(input).length === 0) return true
    console.warn(`isEmpty暂未兼容 '${type}' 类型, 默认返回false`)
    return false
}
export default isEmpty
