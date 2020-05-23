import { combineReducers } from 'redux';
import app from './containers/App/reducer';
import types from './containers/Types/reducer';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    ...injectedReducers,
    app,
    types,
  });

  return rootReducer;
}
