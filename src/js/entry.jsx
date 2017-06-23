import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './store';
import '../../css/styles.css';

ReactDOM.render(
  <Provider store={ store } key='provider'>
    <App />
  </Provider>,
  document.getElementById( 'root' )
);
