import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { fetchItemList } from './actions/index';
import rootReducer from './reducers/index';
import './index.css';
import App from './components/App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware
    )
  )
);

const renderApp = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
};

renderApp();

store.subscribe(renderApp);
store.dispatch(fetchItemList());

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();