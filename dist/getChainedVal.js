'use strict';

/**
 * 获取链式操作符的值
 * @param {String} expression 
 * @param {Object} scope 
 */
function getChainedVal(expression) {
  var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

  var output = scope;
  if (!output) return undefined;
  expression = expression.split('.');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = expression[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      output = output[key];
      if (!output) return undefined;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return output;
}

module.exports = getChainedVal;