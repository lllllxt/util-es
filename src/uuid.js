/**
 * 这是来自某网友的代码, 由于时间太久了,我也忘了是在哪找的了 所以没办法标注出处
 */
export default function (bar) {
    let d = new Date().getTime()
    let tpl = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    !bar && (tpl = tpl.replace(/-/g, ''))
    const uuid = tpl.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
    return uuid
}
