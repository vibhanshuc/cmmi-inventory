import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import createReducer from './reducers';

function configureStore(initialState = {}) {
  let composeEnhancers = compose;
  const middlewares = [];

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  );

  // Make reducers hot reloadable, see http://mxs.is/googmo
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return {
    store,
    persistor: persistStore(store),
  };
}

export default configureStore;
