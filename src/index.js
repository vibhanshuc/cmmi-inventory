import React from 'react';
import ReactDOM from 'react-dom';
import { Button, DatePicker } from 'antd';
import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.css';
import './index.css';

const App = () => (
    <>
        <Button type="primary">PRESS ME</Button>
        <DatePicker placeholder="select date" />
    </>
);

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
