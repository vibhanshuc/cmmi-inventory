import { combineReducers } from 'redux';
import types from './containers/Types/reducer';

export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    ...injectedReducers,
    types,
  });
}
