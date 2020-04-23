(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.util = {}));
}(this, (function (exports) { 'use strict';

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
      var second = arguments.length > 2 ? arguments[2] : undefined;
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

    var Session = {
      get: getSession,
      set: setSession,
      remove: removeSession,
      clear: function clear() {
        return sessionStorage.clear();
      },
      key: function key(n) {
        return sessionStorage.key(n);
      }
    };

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
      var second = arguments.length > 2 ? arguments[2] : undefined;
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

    var Local = {
      get: getLocal,
      set: setLocal,
      remove: removeLocal,
      clear: function clear() {
        return localStorage.clear();
      },
      key: function key(n) {
        return localStorage.key(n);
      }
    };

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

    var Cookies = {
      set: setCookie,
      get: getCookie,
      remove: delCoolie
    };

    function _typeof(obj) {
      "@babel/helpers - typeof";

      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    /**
     * 判空
     * @param {any} input
     * @return { bollean }
     */
    var isEmpty = function isEmpty(input) {
      // null or undefined
      if (input === null || input === undefined) return true; // Array or String

      if (input instanceof Array || typeof input === 'string') return !input.length; // Map or Set

      if (input instanceof Map || input instanceof Set) return !input.size; // Date or Number

      if (input instanceof Date || typeof input === 'number' || typeof input === 'boolean') return false; // Object

      if (_typeof(input) === 'object' && Object.keys(input).length === 0) return true;
      return false;
    };

    /**
     * 判断是否对对象
     *
     */
    var isObject = function isObject(input) {
      var _type = _typeof(input);

      return input !== null && (_type === 'object' || _type === 'function');
    };

    /**
     * 这是来自某网友的代码, 由于时间太久了,我也忘了是在哪找的了 所以没办法标注出处
     */
    function uuid (bar) {
      var d = new Date().getTime();
      var tpl = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
      !bar && (tpl = tpl.replace(/-/g, ''));
      var uuid = tpl.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
      });
      return uuid;
    }

    var API = {
      Local: Local,
      Session: Session,
      Cookies: Cookies,
      isEmpty: isEmpty,
      isObject: isObject,
      uuid: uuid
    };

    exports.Cookies = Cookies;
    exports.Local = Local;
    exports.Session = Session;
    exports.default = API;
    exports.isEmpty = isEmpty;
    exports.isObject = isObject;
    exports.uuid = uuid;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
