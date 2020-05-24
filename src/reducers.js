import { combineReducers } from 'redux';
import types from './containers/Types/reducer';
import objects from './containers/Objects/reducer';

export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    ...injectedReducers,
    types,
    objects,
  });
}
