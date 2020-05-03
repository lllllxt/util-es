export default {
    /**
     * 获取对应key的localStorage
     * @param {string} key 键值
     * @returns {any}
     */
    get: (key: string): any => {
        let result = null
        let _local = JSON.parse(localStorage.getItem(key))
        let isObj = Object.prototype.toString.call(_local) === '[object Object]'
        if (isObj && _local.$$ExpiryTime) {
            if (new Date().getTime() > new Date(_local.$$ExpiryTime).getTime()) {
                // 过期
                result = null
                localStorage.removeItem(key)
            } else {
                result = _local.data
            }
        } else {
            result = _local
        }
        return result
    },
    /**
     * 设置localStorage (可存对象)
     * @param {string} key 键值
     * @param {string} dataSource 数据
     * @param {number} second 过期时间(s)
     * @returns {any}
     */
    set: (key: string, dataSource: string = null, second?: number): object => {
        let result: any = {}
        if (second) {
            const d = new Date()
            d.setTime(d.getTime() + second * 1000)
            result.data = dataSource
            result.$$ExpiryTime = d
        } else {
            result = dataSource
        }
        localStorage.setItem(key, JSON.stringify(result))
        return result
    },
    /**
     * 移除对应key的localStorage
     * @param {string} key 键值
     */
    remove: (key: string) => {
        key && localStorage.removeItem(key)
    },
    /** 清空localStorage */
    clear: () => localStorage.clear(),
    /**
     * 获取localStorage中第n+1个的key
     * @param {number} n
     */
    key: (n: number) => localStorage.key(n),
}
