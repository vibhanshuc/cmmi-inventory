import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { lazyLoadWithDelay } from './utils';

const Types = lazyLoadWithDelay(() => import('./containers/Types/Types'));
const Objects = lazyLoadWithDelay(() => import('./containers/Objects/Objects'));

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
