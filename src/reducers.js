import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import types from './containers/Types/reducer';
import objects from './containers/Objects/reducer';

export default function createReducer(injectedReducers = {}) {
  return persistReducer(
    {
      key: 'cmmi-store',
      storage,
    },
    combineReducers({
      ...injectedReducers,
      types,
      objects,
    }),
  );
}
