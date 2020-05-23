import { createStore, applyMiddleware, compose } from 'redux';
import persistState from 'redux-localstorage';
import createReducer from './reducers';

function configureStore(initialState = {}) {
  let composeEnhancers = compose;

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  const middlewares = [];

  const enhancers = [applyMiddleware(...middlewares), persistState()];

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

  return store;
}

export default configureStore;
