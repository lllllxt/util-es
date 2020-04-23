import { Session } from '../src/index.js'
describe('test Session', () => {
    const SK1 = '不带过期时间'
    const SK2 = '原生的'
    const SK3 = '带过期时间'
    const a = { num: 1, arr: [1, 2, 3] }
    Session.set(SK1, a)
    sessionStorage.setItem(SK2, 666)
    test('能正常存取数据', () => {
        const b = Session.get(SK1)
        expect(Session.get(SK2)).toBe(666)

        expect(b.num).toBe(a.num)
        expect(b.arr).toEqual(a.arr)

        expect(Session.key(0)).toBe(SK1)
    })

    test('删除或清空后返回null', () => {
        Session.remove(SK1)
        expect(Session.get(SK1)).toBeNull()
        Session.clear()
        expect(Session.get(SK2)).toBeNull()
    })

    test('应返回null', () => {
        Session.set(SK3, a, 1)
        expect(Session.get(SK3)).toEqual(a)
        Session.set(SK3, a, -1)
        expect(Session.get(SK3)).toBeNull()
    })
})
