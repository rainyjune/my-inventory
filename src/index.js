import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { fetchItemList, saveNewItem, removeItem } from './actions';
import reducer from './reducers/index';

const render = () => {
  const state = store.getState();
  ReactDOM.render(
    <App
      appError={state.appError}
      formMode={state.formMode}
      selectedItem={state.selectedItem}
      items={state.items}
      onFormClose={() => {
        store.dispatch({
          type: 'SET_FORMMODE',
          mode: 'NONE'
        });
      }}
      onTipsHide={() => {
        store.dispatch({
          type: 'CLEAR_APPERROR'
        });
      }}
      onFormSubmit={(name, quantity, price, id) => {
        store.dispatch(saveNewItem(name, quantity, price, id)).then((json) => {
          if (json.status !== 'ok') {
            store.dispatch({
              type: 'AJAX_ERROR',
              msg: json.msg
            });
          } else {
            alert('Item saved successfully.');
            store.dispatch(fetchItemList());
          }
        });
      }}
      onCreateBtnClick={() => {
        store.dispatch(store.dispatch({
          type: 'SET_FORMMODE',
          mode: 'CREATE'
        }));
      }}
      onRemoveBtnClick={() => {
        const selectedItem= store.getState().selectedItem;
        if (!selectedItem) {
          alert('Please select one item first.');
          return ;
        }
        if (window.confirm("Are you sure to continue?") === false) {
          return ;
        }
        store.dispatch(removeItem(selectedItem.id)).then(() => {
          alert('The item was removed successfully.');
          store.dispatch(fetchItemList());
        });
      }}
      onEditBtnClick={() => {
        const selectedItem= store.getState().selectedItem;
        if (!selectedItem) {
          alert('Please select one item first.');
          return ;
        }
        store.dispatch({
          type: 'SET_FORMMODE',
          mode: 'EDIT'
        });
      }}
      onItemClick={(arg) => {
        const selectedItem = store.getState().selectedItem;
        if (selectedItem && selectedItem.id === arg.id) {
          store.dispatch({
            type: 'UNSELECT_ITEM'
          });
        } else {
          store.dispatch({
            type: 'SELECT_ITEM',
            item: Object.assign({}, arg)
          });
        }

      }}
    />,
    document.getElementById('root')
  );
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
//const store = createStore(reducer,
  applyMiddleware(
    thunkMiddleware
  )
));

render();
store.subscribe(render);
store.dispatch(fetchItemList());

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
