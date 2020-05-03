export default {
    /**
     * 获取对应key的session
     * @param {string} key 键值
     * @returns {any}
     */
    get: (key: string): any => {
        let result = null
        let _session = JSON.parse(sessionStorage.getItem(key))
        let isObj = Object.prototype.toString.call(_session) === '[object Object]'
        if (isObj && _session.$$ExpiryTime) {
            if (new Date().getTime() > new Date(_session.$$ExpiryTime).getTime()) {
                // 过期
                result = null
                sessionStorage.removeItem(key)
            } else {
                result = _session.data
            }
        } else {
            result = _session
        }
        return result
    },
    /**
     * 设置sessionStorage (可存对象)
     * @param {string} key 键值
     * @param {string} dataSource 数据
     * @param {number} second 过期时间(s)
     * @returns {any}
     */
    set: (key: string, dataSource: string = null, second?: number): any => {
        let result: any = {}
        if (second) {
            const d = new Date()
            d.setTime(d.getTime() + second * 1000)
            result.data = dataSource
            result.$$ExpiryTime = d
        } else {
            result = dataSource
        }
        sessionStorage.setItem(key, JSON.stringify(result))
        return result
    },
    /**
     * 移除对应key的session
     * @param {string} key 键值
     */

    remove: (key: string) => {
        key && sessionStorage.removeItem(key)
    },
    /** 清空sessionStorage */
    clear: () => sessionStorage.clear(),
    /**
     * 获取sessionStorage中第n+1个的key
     * @param {number} n
     */
    key: (n: number) => sessionStorage.key(n),
}
