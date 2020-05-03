/* util-es version 1.0.4, follow me on Github! @lllllxt */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.util = {}));
}(this, (function (exports) { 'use strict';

    var Session = {
      /**
       * 获取对应key的session
       * @param {string} key 键值
       * @returns {any}
       */
      get: function get(key) {
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
      },

      /**
       * 设置sessionStorage (可存对象)
       * @param {string} key 键值
       * @param {string} dataSource 数据
       * @param {number} second 过期时间(s)
       * @returns {any}
       */
      set: function set(key) {
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
      },

      /**
       * 移除对应key的session
       * @param {string} key 键值
       */
      remove: function remove(key) {
        key && sessionStorage.removeItem(key);
      },

      /** 清空sessionStorage */
      clear: function clear() {
        return sessionStorage.clear();
      },

      /**
       * 获取sessionStorage中第n+1个的key
       * @param {number} n
       */
      key: function key(n) {
        return sessionStorage.key(n);
      }
    };

    var Local = {
      /**
       * 获取对应key的localStorage
       * @param {string} key 键值
       * @returns {any}
       */
      get: function get(key) {
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
      },

      /**
       * 设置localStorage (可存对象)
       * @param {string} key 键值
       * @param {string} dataSource 数据
       * @param {number} second 过期时间(s)
       * @returns {any}
       */
      set: function set(key) {
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
      },

      /**
       * 移除对应key的localStorage
       * @param {string} key 键值
       */
      remove: function remove(key) {
        key && localStorage.removeItem(key);
      },

      /** 清空localStorage */
      clear: function clear() {
        return localStorage.clear();
      },

      /**
       * 获取localStorage中第n+1个的key
       * @param {number} n
       */
      key: function key(n) {
        return localStorage.key(n);
      }
    };

    var Cookies = {
      /**
       * 设置cookies
       * @param {string} cname 键值
       * @param {string} cvalue 数据
       * @param {number} second 过期时间(s)
       * @returns {void}
       */
      set: function set(cname, cvalue, second) {
        var d = new Date();
        d.setTime(d.getTime() + second * 1000);
        var expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + '; ' + expires;
      },

      /**
       * 获取对应key的cookies
       * @param {string} cname 键值
       * @returns {string}
       */
      get: function get(cname) {
        var name = cname + '=';
        var ca = document.cookie.split(';');

        for (var i = 0; i < ca.length; i++) {
          var c = ca[i].trim();
          if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }

        return '';
      },

      /**
       * 移除对应cname的cookies
       * @param {string} cname 键值
       */
      remove: function remove(cname) {
        document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
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
     * 判断类型
     * @param {any} input
     * @return { string }
     */
    function getType(input) {
      if (input === null) return 'null';
      if (input === undefined) return 'undefined';
      var type = Object.prototype.toString.call(input).slice(8, -1).toLowerCase();
      if (type === 'string' && _typeof(input) === 'object') return 'object';else return type;
    }
    /**
     * 判断传入数据是否为空字符或对象 ( {} [] Map Set), 返回 Boolean
     * @param {any} input
     * @return { boolean }
     */


    var isEmpty = function isEmpty(input) {
      var type = getType(input); // null or undefined

      if (type === 'null' || type === 'undefined') return true; // Array or String

      if (type === 'array' || typeof input === 'string') return !input.length; // Map or Set

      if (type === 'map' || type === 'set') return !input.size; // Date or Number/Bigint or Boolean 不管具体是什么都应该为true

      if (['date', 'number', 'bigint', 'boolean'].includes(type)) return false; // Object

      if (type === 'object' && Object.keys(input).length === 0) return true;
      console.warn("isEmpty\u6682\u672A\u517C\u5BB9 '".concat(type, "' \u7C7B\u578B, \u9ED8\u8BA4\u8FD4\u56DEfalse"));
      return false;
    };

    /**
     * 判断输入参数是否为对象(不包含null和undefined)
     * @param {any} input
     * @return {boolean}
     */
    var isObject = function isObject(input) {
      var _type = _typeof(input);

      return input !== null && (_type === 'object' || _type === 'function');
    };

    /**
     * 这是来自某网友的代码, 由于时间太久了,我也忘了是在哪找的了 所以没办法标注出处
     */

    /**
     * 生成并返回一个uuid
     * @param {boolean} bar 是否带“ - ” 默认false
     * @return {string} uuid
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
