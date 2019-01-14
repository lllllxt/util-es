'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * 判断是否对对象
 * 
 */

var isObject = function isObject(input) {
  var _type = typeof input === 'undefined' ? 'undefined' : _typeof(input);
  return input !== null && (_type === 'object' || _type === 'function');
};
module.exports = isObject;