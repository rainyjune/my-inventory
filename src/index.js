import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { fetchItemList } from './actions';

const render = () => {
  ReactDOM.render(
    <App
      items={store.getState()}
    />,
    document.getElementById('root')
  );
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ITEMLIST':
      return action.items;
    default:
      return state;
  }
};

const store = createStore(reducer,
  applyMiddleware(
    thunkMiddleware
  )
);

render();
store.subscribe(render);
store.dispatch(fetchItemList());

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
