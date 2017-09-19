import React, { Component } from 'react';
import { showParabola } from './../src/index';
import './style.less';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlusOne: false,
    };
    this.config = {
      duration: 1500,
      rate: 0.8,
      delay: 50,
      top: 80,
      start: null,
      end: null,
      children: null,
    };
  }

  animate(startEl, endEl) {
    const { top: sY, left: sX } = startEl.getBoundingClientRect();
    const { top: eY, left: eX } = endEl.getBoundingClientRect();
    const start = {
      x: window.scrollX + sX + 10,
      y: window.scrollY + sY + 10,
      width: 30,
      height: 30,
    };
    const end = {
      x: (window.scrollX + eX) + 10,
      y: (window.scrollY + eY) - 10,
      width: 15,
      height: 15,
    };
    const children = (
      <div className="motion-item">
        1s
      </div>
    );

    const onAfterEnd = () => {
      this.setState({ showPlusOne: true });
      setTimeout(() => {
        this.setState({ showPlusOne: false });
      }, 1000);
    };

    this.config = { ...this.config, start, end, children, onAfterEnd };
    showParabola(this.config);
  }

  handleClick(startEl) {
    const endEl = document.getElementById('J-shoppingcart');
    if (startEl && endEl) {
      this.animate(startEl, endEl);
    }
  }

  render() {
    const items = Array(5).fill().map((v, i) => i);
    return (
      <div className="container">
        <div className="sale-list">
          {
            items.map(i => (
              <div
                key={i}
                role="button"
                tabIndex="0"
                className="sale-item"
                onClick={e => this.handleClick(e.target)}
              >
                1s
              </div>
            ))
          }
        </div>
        <div className="shopping-cart" id="J-shoppingcart">
          <span
            className={this.state.showPlusOne ? 'plus-one plus-one_animate' : 'plus-one'}
            onAnimationStart={() => setTimeout(() => this.setState({ showPlusOne: false }), 500)}
          >
            +1s
          </span>
        </div>
      </div>
    );
  }
}

