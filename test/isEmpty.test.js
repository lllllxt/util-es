import util from '../src/index.js'
describe('test isEmpty', () => {
    describe('应为false', () => {
        test('空格', () => {
            expect(util.isEmpty(' ')).toBeFalsy()
        })
        test('数字0', () => {
            expect(util.isEmpty(0)).toBeFalsy()
        })
        test('布尔值false', () => {
            expect(util.isEmpty(false)).toBeFalsy()
        })
        test('Symbol', () => {
            expect(util.isEmpty(Symbol(666))).toBeFalsy()
        })
    })
    describe('应为true', () => {
        test('空字符串', () => {
            expect(util.isEmpty('')).toBeTruthy()
            expect(util.isEmpty(new String())).toBeTruthy()
        })
        test('空数组', () => {
            expect(util.isEmpty([])).toBeTruthy()
        })
        test('空对象', () => {
            expect(util.isEmpty({})).toBeTruthy()
        })
        test('Map', () => {
            expect(util.isEmpty(new Map())).toBeTruthy()
        })
        test('Set', () => {
            expect(util.isEmpty(new Set())).toBeTruthy()
        })
        test('null', () => {
            expect(util.isEmpty(null)).toBeTruthy()
        })
        test('undefined', () => {
            expect(util.isEmpty(undefined)).toBeTruthy()
        })
    })
})
