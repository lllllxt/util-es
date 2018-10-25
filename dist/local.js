'use strict';

/**
 * 获取localStorage
 * @param key
 * @returns {any}
 */
var getLocal = function getLocal(key) {
    var result = null;
    var _local = JSON.parse(localStorage.getItem(key));
    var isObj = Object.prototype.toString.call(_local) === '[object Object]';
    if (isObj && _local.$$ExpiryTime) {
        if (new Date().getTime() > new Date(_local.$$ExpiryTime).getTime()) {
            // 过期
            result = null;
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
var setLocal = function setLocal(key) {
    var dataSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var second = arguments[2];

    var result = {};
    if (second) {
        var d = new Date();
        d.setTime(d.getTime() + second * 1000);
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
var removeLocal = function removeLocal(key) {
    key && localStorage.removeItem(key);
};

module.exports = {
    get: getLocal,
    set: setLocal,
    remove: removeLocal
};