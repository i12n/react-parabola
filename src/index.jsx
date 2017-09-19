import React from 'react';
import ReactDOM from 'react-dom';
import Parabola from './components/index';

const nil = () => {};

function showParabola(config) {
  const props = {
    ...config,
  };

  const div = document.createElement('div');
  document.body.appendChild(div);

  function remove() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  const {
    duration, rate, top,
    start, end, children, delay,
    onAfterEnd = nil, onBeforeStart = nil,
  } = props;

  ReactDOM.render(
    <Parabola
      duration={duration}
      rate={rate}
      delay={delay}
      top={top}
      start={start}
      end={end}
      onBeforeStart={() => onBeforeStart()}
      onEnd={() => remove()}
      onAfterEnd={() => onAfterEnd()}
    >
      { children }
    </Parabola>
  , div);
}

module.exports = {
  showParabola,
  Parabola,
};

// module.export { showParabola }, { Parabola };
