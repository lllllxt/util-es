/**
 * 获取localStorage
 * @param key
 * @returns {any}
 */
const getLocal = function (key) {
    let result = null;
    let _local = JSON.parse(localStorage.getItem(key));
    let isObj = Object.prototype.toString.call(_local) === '[object Object]';
    if (isObj && _local.$$ExpiryTime) {
        if ((new Date().getTime() > new Date(_local.$$ExpiryTime).getTime())) { // 过期
            result = null;
            localStorage.removeItem(key)
        } else {
            result = _local.data;
        }
    } else {
        result = _local;
    }
    return result;
};

/**
 * 设置localStorage (可存对象)
 * @param key 键值
 * @param dataSource 数据
 * @param second 过期时间(s)
 * @returns {any}
 */
const setLocal = function (key, dataSource = null, second) {
    let result = {};
    if (second) {
        const d = new Date();
        d.setTime(d.getTime() + (second * 1000));
        result.data = dataSource;
        result.$$ExpiryTime = d;
    } else {
        result = dataSource;
    }
    localStorage.setItem(key, JSON.stringify(result));
    return result;
};

/**
 * 移除localStorage
 * @param key
 */
const removeLocal = function (key) {
    key && localStorage.removeItem(key);
};

module.exports = {
    get: getLocal,
    set: setLocal,
    remove: removeLocal,
    clear: () => localStorage.clear(),
    key: () => localStorage.key()
}