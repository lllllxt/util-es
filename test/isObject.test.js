import { isObject } from '../src/index.js'

class A {}
describe('test isObject', () => {
    describe('应为false', () => {
        test('undefined', () => {
            expect(isObject(undefined)).toBeFalsy()
        })
        test('null 对象', () => {
            expect(isObject(null)).toBeFalsy()
        })
        test('数字', () => {
            expect(isObject(123)).toBeFalsy()
        })
        test('字符', () => {
            expect(isObject('asd')).toBeFalsy()
        })
        test('布尔值', () => {
            expect(isObject(true)).toBeFalsy()
        })
    })
    describe('应为true', () => {
        test('空对象', () => {
            expect(isObject({})).toBeTruthy()
        })
        test('数组', () => {
            expect(isObject([])).toBeTruthy()
        })
        test('Function', () => {
            expect(isObject(function () {})).toBeTruthy()
        })
        test('Date', () => {
            expect(isObject(new Date())).toBeTruthy()
        })
        test('自定义class', () => {
            expect(isObject(new A())).toBeTruthy()
        })
    })
})
