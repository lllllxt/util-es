const { isObject } = require('../dist/index.js')

console.log('----------------------test isObject----------------------')
class A {}

console.assert(isObject({}), '空对象')
console.assert(isObject([]), '数组')
console.assert(isObject(function () {}), 'Function')
console.assert(isObject(new Date()), 'Date')
console.assert(isObject(new A()), '自定义class')

console.assert(!isObject(undefined), 'undefined')
console.assert(!isObject(null), 'null 对象')
console.assert(!isObject(123), '数字')
console.assert(!isObject('asd'), '字符')
console.assert(!isObject(true), '布尔值')