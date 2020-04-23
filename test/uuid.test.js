import { uuid } from '../src/index.js'
// const reg = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
describe('test uuid', () => {
    const reg = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    const reg2 = /^[0-9a-f]{8}[0-9a-f]{4}[1-5][0-9a-f]{3}[89ab][0-9a-f]{3}[0-9a-f]{12}$/i
    test('uuid合法性(带-)', () => {
        expect(reg.test(uuid(true))).toBeTruthy()
    })
    test('uuid合法性(不带-)', () => {
        expect(reg2.test(uuid())).toBeTruthy()
    })
})
