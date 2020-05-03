import { Local } from '../src/index.ts'
describe('test Local', () => {
    const SK1 = '不带过期时间'
    const SK2 = '原生的'
    const SK3 = '带过期时间'
    const a = { num: 1, arr: [1, 2, 3] }
    Local.set(SK1, a)
    localStorage.setItem(SK2, 666)
    test('能正常存取数据', () => {
        const b = Local.get(SK1)
        expect(Local.get(SK2)).toBe(666)

        expect(b.num).toBe(a.num)
        expect(b.arr).toEqual(a.arr)

        expect(Local.key(0)).toBe(SK1)
    })

    test('删除或清空后返回null', () => {
        Local.remove(SK1)
        expect(Local.get(SK1)).toBeNull()
        Local.clear()
        expect(Local.get(SK2)).toBeNull()
    })

    test('应返回null', () => {
        Local.set(SK3, a, 1)
        expect(Local.get(SK3)).toEqual(a)
        Local.set(SK3, a, -1)
        expect(Local.get(SK3)).toBeNull()

        Local.set(SK1)
        expect(Local.get(SK1)).toBeNull()
    })
})
