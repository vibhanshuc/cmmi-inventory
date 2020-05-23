import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './containers/App/App';
import configureStore from './configureStore';
import history from './utils/history';

import 'antd/dist/antd.css';
import './index.scss';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState);
const MOUNT_NODE = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    MOUNT_NODE,
  );
};

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
