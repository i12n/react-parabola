## Install 

添加购物车的抛物线动画

```sh
npm install react-parabola --save-dev
```

## Usage

```js
import { showParabola } from 'react-parabola';

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

showParabola({
  duration: 1500,
  rate: 0.8,
  delay: 50,
  top: 80,
  start: {
    x: 0,
    y: 500,
    width: 20,
    height: 20,
  },
  end: {
    x: 500,
    y: 500,
    width: 20,
    height: 20,
  },
});
```

## Demos

[https://gewenmao.github.io/react-parabola/](https://gewenmao.github.io/react-parabola/)
