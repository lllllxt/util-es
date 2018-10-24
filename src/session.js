/**
 * 获取sessionStorage
 * @param key
 * @returns {any}
 */
const getSession = function (key) {
    let result = null;
    let _session = JSON.parse(sessionStorage.getItem(key));
    let isObj = Object.prototype.toString.call(_session) === '[object Object]';
    if (isObj && _session.$$ExpiryTime) {
        if ((new Date().getTime() > new Date(_session.$$ExpiryTime).getTime())) { // 过期
            result = null;
        } else {
            result = _session.data;
        }
    } else {
        result = _session;
    }
    return result;
};

/**
 * 设置sessionStorage (可存对象)
 * @param key 键值
 * @param dataSource 数据
 * @param second 过期时间(s)
 * @returns {any}
 */
const setSession = function (key, dataSource, second) {
    let result = {};
    if (second) {
        const d = new Date();
        d.setTime(d.getTime() + (second * 1000));
        result.data = dataSource;
        result.$$ExpiryTime = d;
    } else {
        result = dataSource;
    }
    sessionStorage.setItem(key, JSON.stringify(result));
    return result;
};

/**
 * 移除sessionStorage
 * @param key
 */
const removeSession = function (key) {
    key && sessionStorage.removeItem(key);
};

module.exports = {
    get: getSession,
    set: setSession,
    remove: removeSession
}