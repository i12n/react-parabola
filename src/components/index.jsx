import React, { Component } from 'react';
import PropTypes from 'prop-types';

const nil = () => false;

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

export default class Parabola extends Component {
  static defaultProps = {
    rate: 1,
    duration: 800,
    top: 0,
    delay: 0,
    children: null,
    onEnd: nil,
    onBeforeStart: nil,
    onAfterEnd: nil,
  }

  static propTypes = {
    rate: PropTypes.number,
    start: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequire,
      height: PropTypes.number.isRequire,
    }).isRequired,
    end: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequire,
      height: PropTypes.number.isRequire,
    }).isRequired,
    duration: PropTypes.number,
    top: PropTypes.number,
    delay: PropTypes.number,
    children: PropTypes.element,
    onEnd: PropTypes.func,
    onBeforeStart: PropTypes.func,
    onAfterEnd: PropTypes.func,

  }

  /*
   * 根据极值点和另外一点计算抛物线参数
   * 抛物线顶点式方程：y=a(x-h)^2+k，其中 (h, k) 为 极值点坐标
   */
  static calculate(extreme, point) {
    const { x: ex, y: ey } = extreme;
    const { x, y } = point;

    const a = (y - ey) / ((x - ex) ** 2);
    const h = ex;
    const k = ey;

    return { a, h, k };
  }

  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
      animationEnd: false,
    };

    this.startTime = new Date();

    this.initParabolas();
  }

  componentDidMount() {
    this.beforeStart();
    this.draw();
  }

  componentWillUnmount() {
    this.afterEnd();
  }

  draw() {
    setTimeout(() => {
      this.update();
      this.startTime = new Date();
    }, this.props.delay);
  }
  finish() {
    if (this.props.onEnd) {
      this.props.onEnd();
    }
  }
  beforeStart() {
    if (this.props.onBeforeStart) {
      this.props.onBeforeStart();
    }
  }

  afterEnd() {
    if (this.props.onAfterEnd) {
      this.props.onAfterEnd();
    }
  }

  /*
   * 坐标系统转换，将全局坐标系转换为相对坐标系
   */
  initParabolas() {
    const { rate, top, start, end } = this.props;
    const left = { // 起点
      x: 0,
      y: 0,
    };
    const right = { // 终点
      x: end.x - start.x,
      y: end.y - start.y,
    };
    const extreme = { // 极值点
      x: rate * right.x,
      y: Math.min(right.y, left.y) - top,
    };

    const lParabola = Parabola.calculate(extreme, left);   // 极值点左侧抛物线参数
    const rParabola = Parabola.calculate(extreme, right);  // 极值点右侧抛物线参数

    this.parabolas = { lParabola, rParabola };
    return this.parabolas;
  }

  update() {
    const { duration, rate, start, end } = this.props;
    let { animationEnd } = this.state;
    let interval = Date.now() - this.startTime;

    if (interval > duration) {
      if (animationEnd) {
        return this.finish();
      }

      interval = duration;
      animationEnd = true;
    }

    const percent = interval / duration;
    const { lParabola, rParabola } = this.parabolas;
    const { a, h, k } = rate > percent ? lParabola : rParabola;

    // 计算位置
    const x = percent * (end.x - start.x);
    const y = (a * ((x - h) ** 2)) + k;

    // 计算缩放
    const scaleX = 1 - (percent * (1 - ((end.width || 1) / (start.width || 1))));
    const scaleY = 1 - (percent * (1 - ((end.height || 1) / (start.height || 1))));

    this.setState({
      translateX: x,
      translateY: y,
      scaleX,
      scaleY,
      animationEnd,
    });

    // 刷新
    requestAnimationFrame(this.update.bind(this));

    return false;
  }

  render() {
    const { translateX, translateY, scaleX, scaleY } = this.state;
    const { start, children } = this.props;
    return (
      <div
        style={{
          position: 'absolute',
          left: `${start.x}px`,
          top: `${start.y}px`,
          width: `${start.width}px`,
          height: `${start.height}px`,
          transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
          transformOrigin: '0 0',
        }}
      >
        { children }
      </div>
    );
  }
}

