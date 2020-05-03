export default {
    /**
     * 设置cookies
     * @param {string} cname 键值
     * @param {string} cvalue 数据
     * @param {number} second 过期时间(s)
     * @returns {void}
     */
    set: (cname: string, cvalue: string, second?: number): void => {
        const d = new Date()
        d.setTime(d.getTime() + second * 1000)
        const expires = 'expires=' + d.toUTCString()
        document.cookie = cname + '=' + cvalue + '; ' + expires
    },
    /**
     * 获取对应key的cookies
     * @param {string} cname 键值
     * @returns {string}
     */
    get: (cname: string): string => {
        const name = cname + '='
        const ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            const c = ca[i].trim()
            if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
        }
        return ''
    },
    /**
     * 移除对应cname的cookies
     * @param {string} cname 键值
     */
    remove: (cname: string) => {
        document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    },
}
