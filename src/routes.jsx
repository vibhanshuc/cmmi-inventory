import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Types from './containers/Types/Types';
import Objects from './containers/Objects/Objects';

export default (
  <Switch>
    <Route path="/types/:id">
      <Objects />
    </Route>
    <Route path="/types">
      <Types />
    </Route>
    <Route path="/">
      <Objects />
    </Route>
  </Switch>
);
