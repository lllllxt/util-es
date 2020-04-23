import { Cookies } from '../src/index.js'
describe('test Cookies', () => {
    const SK1 = '不带过期时间'
    const SK2 = '原生的'
    const SK3 = '带过期时间'
    const a = '666666666'
    Cookies.set(SK1, a)
    document.cookie = `${SK2}=${666};`
    test('能正常存取数据', () => {
        const b = Cookies.get(SK1)
        expect(Cookies.get(SK2)).toBe('666')

        expect(b).toBe(a)
    })

    test('删除或清空后返回空字符', () => {
        Cookies.remove(SK1)
        expect(Cookies.get(SK1)).toBe('')
        // Cookies.clear()
        // expect(Cookies.get(SK2)).toBe('')
    })

    Cookies.set(SK3, a, 0)
    test('应返回空字符', () => {
        const c = Cookies.get(SK3)
        expect(c).toBe('')
    })
})
