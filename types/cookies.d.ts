declare const _default: {
    /**
     * 设置cookies
     * @param {string} cname 键值
     * @param {string} cvalue 数据
     * @param {number} second 过期时间(s)
     * @returns {void}
     */
    set: (cname: string, cvalue: string, second?: number) => void;
    /**
     * 获取对应key的cookies
     * @param {string} cname 键值
     * @returns {string}
     */
    get: (cname: string) => string;
    /**
     * 移除对应cname的cookies
     * @param {string} cname 键值
     */
    remove: (cname: string) => void;
};
export default _default;
