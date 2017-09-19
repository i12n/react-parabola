'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('./components/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nil = function nil() {};

function showParabola(config) {
  var props = _extends({}, config);

  var div = document.createElement('div');
  document.body.appendChild(div);

  function remove() {
    var unmountResult = _reactDom2.default.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  var duration = props.duration,
      rate = props.rate,
      top = props.top,
      start = props.start,
      end = props.end,
      children = props.children,
      delay = props.delay,
      _props$onAfterEnd = props.onAfterEnd,
      _onAfterEnd = _props$onAfterEnd === undefined ? nil : _props$onAfterEnd,
      _props$onBeforeStart = props.onBeforeStart,
      _onBeforeStart = _props$onBeforeStart === undefined ? nil : _props$onBeforeStart;

  _reactDom2.default.render(_react2.default.createElement(
    _index2.default,
    {
      duration: duration,
      rate: rate,
      delay: delay,
      top: top,
      start: start,
      end: end,
      onBeforeStart: function onBeforeStart() {
        return _onBeforeStart();
      },
      onEnd: function onEnd() {
        return remove();
      },
      onAfterEnd: function onAfterEnd() {
        return _onAfterEnd();
      }
    },
    children
  ), div);
}

module.exports = {
  showParabola: showParabola,
  Parabola: _index2.default
};

// module.export { showParabola }, { Parabola };