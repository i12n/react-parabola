/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.appendChild(div);

function render(Component) {
  ReactDOM.render(<Component />, div);
}

render(App);