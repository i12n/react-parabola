"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showParabola = showParabola;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _index = _interopRequireDefault(require("./components/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var nil = function nil() {};

function showParabola(config) {
  var props = _objectSpread({}, config);

  var div = document.createElement('div');
  document.body.appendChild(div);

  function remove() {
    var unmountResult = _reactDom["default"].unmountComponentAtNode(div);

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
      _onAfterEnd = _props$onAfterEnd === void 0 ? nil : _props$onAfterEnd,
      _props$onBeforeStart = props.onBeforeStart,
      _onBeforeStart = _props$onBeforeStart === void 0 ? nil : _props$onBeforeStart;

  _reactDom["default"].render(_react["default"].createElement(_index["default"], {
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
  }, children), div);
}

var _default = {
  showParabola: showParabola,
  Parabola: _index["default"]
}; // module.export { showParabola }, { Parabola };

exports["default"] = _default;