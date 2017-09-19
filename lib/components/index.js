'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Parabola = function (_Component) {
  _inherits(Parabola, _Component);

  _createClass(Parabola, null, [{
    key: 'calculate',


    /*
     * 根据极值点和另外一点计算抛物线参数
     * 抛物线顶点式方程：y=a(x-h)^2+k，其中 (h, k) 为 极值点坐标
     */
    value: function calculate(extreme, point) {
      var ex = extreme.x,
          ey = extreme.y;
      var x = point.x,
          y = point.y;


      var a = (y - ey) / Math.pow(x - ex, 2);
      var h = ex;
      var k = ey;

      return { a: a, h: h, k: k };
    }
  }]);

  function Parabola(props) {
    _classCallCheck(this, Parabola);

    // 初始状态
    var _this = _possibleConstructorReturn(this, (Parabola.__proto__ || Object.getPrototypeOf(Parabola)).call(this, props));

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
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.beforeStart();
      this.draw();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.afterEnd();
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _this2 = this;

      setTimeout(function () {
        _this2.update();
        _this2.startTime = new Date();
      }, this.props.delay);
    }
  }, {
    key: 'finish',
    value: function finish() {
      if (this.props.onEnd) {
        this.props.onEnd();
      }
    }
  }, {
    key: 'beforeStart',
    value: function beforeStart() {
      if (this.props.onBeforeStart) {
        this.props.onBeforeStart();
      }
    }
  }, {
    key: 'afterEnd',
    value: function afterEnd() {
      if (this.props.onAfterEnd) {
        this.props.onAfterEnd();
      }
    }

    /*
     * 坐标系统转换，将全局坐标系转换为相对坐标系
     */

  }, {
    key: 'initParabolas',
    value: function initParabolas() {
      var _props = this.props,
          rate = _props.rate,
          top = _props.top,
          start = _props.start,
          end = _props.end;

      var left = { // 起点
        x: 0,
        y: 0
      };
      var right = { // 终点
        x: end.x - start.x,
        y: end.y - start.y
      };
      var extreme = { // 极值点
        x: rate * right.x,
        y: Math.min(right.y, left.y) - top
      };

      var lParabola = Parabola.calculate(extreme, left); // 极值点左侧抛物线参数
      var rParabola = Parabola.calculate(extreme, right); // 极值点右侧抛物线参数

      this.parabolas = { lParabola: lParabola, rParabola: rParabola };
      return this.parabolas;
    }
  }, {
    key: 'update',
    value: function update() {
      var _props2 = this.props,
          duration = _props2.duration,
          rate = _props2.rate,
          start = _props2.start,
          end = _props2.end;
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
      var _parabolas = this.parabolas,
          lParabola = _parabolas.lParabola,
          rParabola = _parabolas.rParabola;

      var _ref = rate > percent ? lParabola : rParabola,
          a = _ref.a,
          h = _ref.h,
          k = _ref.k;

      // 计算位置


      var x = percent * (end.x - start.x);
      var y = a * Math.pow(x - h, 2) + k;

      // 计算缩放
      var scaleX = 1 - percent * (1 - (end.width || 1) / (start.width || 1));
      var scaleY = 1 - percent * (1 - (end.height || 1) / (start.height || 1));

      this.setState({
        translateX: x,
        translateY: y,
        scaleX: scaleX,
        scaleY: scaleY,
        animationEnd: animationEnd
      });

      // 刷新
      requestAnimationFrame(this.update.bind(this));

      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          translateX = _state.translateX,
          translateY = _state.translateY,
          scaleX = _state.scaleX,
          scaleY = _state.scaleY;
      var _props3 = this.props,
          start = _props3.start,
          children = _props3.children;

      return _react2.default.createElement(
        'div',
        {
          style: {
            position: 'absolute',
            left: start.x + 'px',
            top: start.y + 'px',
            width: start.width + 'px',
            height: start.height + 'px',
            transform: 'translate(' + translateX + 'px, ' + translateY + 'px) scale(' + scaleX + ', ' + scaleY + ')',
            transformOrigin: '0 0'
          }
        },
        children
      );
    }
  }]);

  return Parabola;
}(_react.Component);

Parabola.defaultProps = {
  rate: 1,
  duration: 800,
  top: 0,
  delay: 0,
  children: null,
  onEnd: nil,
  onBeforeStart: nil,
  onAfterEnd: nil
};
Parabola.propTypes = {
  rate: _propTypes2.default.number,
  start: _propTypes2.default.shape({
    x: _propTypes2.default.number.isRequired,
    y: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number.isRequire,
    height: _propTypes2.default.number.isRequire
  }).isRequired,
  end: _propTypes2.default.shape({
    x: _propTypes2.default.number.isRequired,
    y: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number.isRequire,
    height: _propTypes2.default.number.isRequire
  }).isRequired,
  duration: _propTypes2.default.number,
  top: _propTypes2.default.number,
  delay: _propTypes2.default.number,
  children: _propTypes2.default.element,
  onEnd: _propTypes2.default.func,
  onBeforeStart: _propTypes2.default.func,
  onAfterEnd: _propTypes2.default.func };
exports.default = Parabola;