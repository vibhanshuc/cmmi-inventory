import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Types from './pages/Types';

export default (
  <Switch>
    <Route path="/types">
      <Types />
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
);
