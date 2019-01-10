(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var setCookie = function setCookie(cname, cvalue, second) {
    var d = new Date();
    d.setTime(d.getTime() + second * 1000);
    var expires = 'expires=' + d.toGMTString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
};

var getCookie = function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return '';
};

var delCoolie = function delCoolie(cname) {
    document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

module.exports = {
    set: setCookie,
    get: getCookie,
    remove: delCoolie
};
},{}],2:[function(require,module,exports){
'use strict';

var _session = require('./session');

var _session2 = _interopRequireDefault(_session);

var _local = require('./local');

var _local2 = _interopRequireDefault(_local);

var _cookies = require('./cookies');

var _cookies2 = _interopRequireDefault(_cookies);

var _isEmpty = require('./isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _uuid = require('./uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    Local: _local2.default,
    Session: _session2.default,
    Cookies: _cookies2.default,
    isEmpty: _isEmpty2.default,
    uuid: _uuid2.default
};
},{"./cookies":1,"./isEmpty":3,"./local":4,"./session":5,"./uuid":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 判空
 * @param {any} input
 * @return { bollean }
 */
var isEmpty = function isEmpty(input) {
    // null or undefined
    if (input === null || input === undefined) return true;
    // Array or Map or Set
    if (input.length === 0 || input.size === 0) return true;
    if (input.length > 0 || input.size > 0) return false;
    // Date or Number
    if (input instanceof Date || typeof input === 'number') return false;
    // Object
    if (Object.keys(input).length > 0) return false;
    return true;
};
exports.default = isEmpty;
},{}],4:[function(require,module,exports){
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
            localStorage.removeItem(key);
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
    remove: removeLocal,
    clear: localStorage.clear,
    key: localStorage.key
};
},{}],5:[function(require,module,exports){
'use strict';

/**
 * 获取sessionStorage
 * @param key
 * @returns {any}
 */
var getSession = function getSession(key) {
    var result = null;
    var _session = JSON.parse(sessionStorage.getItem(key));
    var isObj = Object.prototype.toString.call(_session) === '[object Object]';
    if (isObj && _session.$$ExpiryTime) {
        if (new Date().getTime() > new Date(_session.$$ExpiryTime).getTime()) {
            // 过期
            result = null;
            sessionStorage.removeItem(key);
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
var setSession = function setSession(key) {
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
    sessionStorage.setItem(key, JSON.stringify(result));
    return result;
};

/**
 * 移除sessionStorage
 * @param key
 */
var removeSession = function removeSession(key) {
    key && sessionStorage.removeItem(key);
};

module.exports = {
    get: getSession,
    set: setSession,
    remove: removeSession,
    clear: sessionStorage.clear,
    key: sessionStorage.key
};
},{}],6:[function(require,module,exports){
'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.util = _index2.default;
},{"./index":2}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = new Array(32);
    var rnd = 0;
    var r = void 0;
    for (var i = 0; i < 32; i++) {
        if (i === 12) {
            uuid[i] = '4';
        } else {
            if (rnd <= 0x02) rnd = 0x2000000 + Math.random() * 0x1000000 | 0;
            r = rnd & 0xf;
            rnd = rnd >> 4;
            uuid[i] = chars[i === 19 ? r & 0x3 | 0x8 : r];
        }
    }
    return uuid.join('');
};

; /**
   * 这是来自某网友的代码, 由于时间太久了,我也忘了是在哪找的了 所以没办法标注出处
   */
},{}]},{},[6]);
