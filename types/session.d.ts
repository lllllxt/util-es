declare const _default: {
    /**
     * 获取对应key的session
     * @param {string} key 键值
     * @returns {any}
     */
    get: (key: string) => any;
    /**
     * 设置sessionStorage (可存对象)
     * @param {string} key 键值
     * @param {string} dataSource 数据
     * @param {number} second 过期时间(s)
     * @returns {any}
     */
    set: (key: string, dataSource?: string, second?: number) => any;
    /**
     * 移除对应key的session
     * @param {string} key 键值
     */
    remove: (key: string) => void;
    /** 清空sessionStorage */
    clear: () => void;
    /**
     * 获取sessionStorage中第n+1个的key
     * @param {number} n
     */
    key: (n: number) => string;
};
export default _default;
