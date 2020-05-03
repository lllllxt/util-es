/**
 * 这是来自某网友的代码, 由于时间太久了,我也忘了是在哪找的了 所以没办法标注出处
 */
/**
 * 生成并返回一个uuid
 * @param {boolean} bar 是否带“ - ” 默认false
 * @return {string} uuid
 */
export default function (bar?: boolean): string {
    let d: number = new Date().getTime()
    let tpl: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    !bar && (tpl = tpl.replace(/-/g, ''))
    const uuid: string = tpl.replace(/[xy]/g, function (c) {
        var r: number = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
    return uuid
}
