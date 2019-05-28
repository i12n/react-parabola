"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var nil = function nil() {
  return false;
};
/*
 * Parabola 组件参数说明：
 * - start 起始点坐标/宽高
 * - end 终点坐标/宽高
 * - duration 运动时间
 * - rate 取值范围[0, 1]，确定极值点 x 坐标位置（(end.x - start.x) * rate）
 * - top 确定极值点 y 坐标位置 (end.y - top)
 * - delay 动画开始之前延迟时间
 * - onBeforeStart 动画开始之前事件
 * - onEnd 动画结束事件
 * - onAfterEnd 动画销毁之后事件
 */


var Parabola =
/*#__PURE__*/
function (_Component) {
  _inherits(Parabola, _Component);

  _createClass(Parabola, null, [{
    key: "calculate",
    value: function calculate(extreme, point) {
      var ex = extreme.x,
          ey = extreme.y;
      var x = point.x,
          y = point.y;
      var a = (y - ey) / Math.pow(x - ex, 2);
      var h = ex;
      var k = ey;
      return {
        a: a,
        h: h,
        k: k
      };
    }
  }]);

  function Parabola(props) {
    var _this;

    _classCallCheck(this, Parabola);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Parabola).call(this, props)); // 初始状态

    _this.state = {
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
      animationEnd: false
    };
    _this.startTime = new Date();

    _this.initParabolas();

    return _this;
  }

  _createClass(Parabola, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.beforeStart();
      this.draw();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.afterEnd();
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this2 = this;

      var delay = this.props.delay;
      setTimeout(function () {
        _this2.update();

        _this2.startTime = new Date();
      }, delay);
    }
  }, {
    key: "finish",
    value: function finish() {
      var onEnd = this.props.onEnd;

      if (onEnd) {
        onEnd();
      }
    }
  }, {
    key: "beforeStart",
    value: function beforeStart() {
      var onBeforeStart = this.props.onBeforeStart;

      if (onBeforeStart) {
        onBeforeStart();
      }
    }
  }, {
    key: "afterEnd",
    value: function afterEnd() {
      var onAfterEnd = this.props.onAfterEnd;

      if (onAfterEnd) {
        onAfterEnd();
      }
    }
    /*
     * 坐标系统转换，将全局坐标系转换为相对坐标系
     */

  }, {
    key: "initParabolas",
    value: function initParabolas() {
      var _this$props = this.props,
          rate = _this$props.rate,
          top = _this$props.top,
          start = _this$props.start,
          end = _this$props.end;
      var left = {
        // 起点
        x: 0,
        y: 0
      };
      var right = {
        // 终点
        x: end.x - start.x,
        y: end.y - start.y
      };
      var extreme = {
        // 极值点
        x: rate * right.x,
        y: Math.min(right.y, left.y) - top
      };
      var lParabola = Parabola.calculate(extreme, left); // 极值点左侧抛物线参数

      var rParabola = Parabola.calculate(extreme, right); // 极值点右侧抛物线参数

      this.parabolas = {
        lParabola: lParabola,
        rParabola: rParabola
      };
      return this.parabolas;
    }
  }, {
    key: "update",
    value: function update() {
      var _this$props2 = this.props,
          duration = _this$props2.duration,
          rate = _this$props2.rate,
          start = _this$props2.start,
          end = _this$props2.end;
      var animationEnd = this.state.animationEnd;
      var interval = Date.now() - this.startTime;

      if (interval > duration) {
        if (animationEnd) {
          return this.finish();
        }

        interval = duration;
        animationEnd = true;
      }

      var percent = interval / duration;
      var _this$parabolas = this.parabolas,
          lParabola = _this$parabolas.lParabola,
          rParabola = _this$parabolas.rParabola;

      var _ref = rate > percent ? lParabola : rParabola,
          a = _ref.a,
          h = _ref.h,
          k = _ref.k; // 计算位置


      var x = percent * (end.x - start.x);
      var y = a * Math.pow(x - h, 2) + k; // 计算缩放

      var scaleX = 1 - percent * (1 - (end.width || 1) / (start.width || 1));
      var scaleY = 1 - percent * (1 - (end.height || 1) / (start.height || 1));
      this.setState({
        translateX: x,
        translateY: y,
        scaleX: scaleX,
        scaleY: scaleY,
        animationEnd: animationEnd
      }); // 刷新

      requestAnimationFrame(this.update.bind(this));
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          translateX = _this$state.translateX,
          translateY = _this$state.translateY,
          scaleX = _this$state.scaleX,
          scaleY = _this$state.scaleY;
      var _this$props3 = this.props,
          start = _this$props3.start,
          children = _this$props3.children;
      return _react["default"].createElement("div", {
        style: {
          position: 'absolute',
          left: "".concat(start.x, "px"),
          top: "".concat(start.y, "px"),
          width: "".concat(start.width, "px"),
          height: "".concat(start.height, "px"),
          transform: "translate(".concat(translateX, "px, ").concat(translateY, "px) scale(").concat(scaleX, ", ").concat(scaleY, ")"),
          transformOrigin: '0 0'
        }
      }, children);
    }
  }]);

  return Parabola;
}(_react.Component);

exports["default"] = Parabola;

_defineProperty(Parabola, "defaultProps", {
  rate: 1,
  duration: 800,
  top: 0,
  delay: 0,
  children: null,
  onEnd: nil,
  onBeforeStart: nil,
  onAfterEnd: nil
});

_defineProperty(Parabola, "propTypes", {
  rate: _propTypes["default"].number,
  start: _propTypes["default"].shape({
    x: _propTypes["default"].number.isRequired,
    y: _propTypes["default"].number.isRequired,
    width: _propTypes["default"].number.isRequired,
    height: _propTypes["default"].number.isRequired
  }).isRequired,
  end: _propTypes["default"].shape({
    x: _propTypes["default"].number.isRequired,
    y: _propTypes["default"].number.isRequired,
    width: _propTypes["default"].number.isRequired,
    height: _propTypes["default"].number.isRequired
  }).isRequired,
  duration: _propTypes["default"].number,
  top: _propTypes["default"].number,
  delay: _propTypes["default"].number,
  children: _propTypes["default"].element,
  onEnd: _propTypes["default"].func,
  onBeforeStart: _propTypes["default"].func,
  onAfterEnd: _propTypes["default"].func
  /*
   * 根据极值点和另外一点计算抛物线参数
   * 抛物线顶点式方程：y=a(x-h)^2+k，其中 (h, k) 为 极值点坐标
   */

});