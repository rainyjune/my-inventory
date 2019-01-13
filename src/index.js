import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { fetchItemList, saveNewItem, removeItem } from './actions';

const render = () => {
  const state = store.getState();
  ReactDOM.render(
    <App
      formMode={state.formMode}
      selectedItem={state.selectedItem}
      items={state.items}
      onFormSubmit={(name, quantity, price, id) => {
        store.dispatch(saveNewItem(name, quantity, price, id)).then(() => {
          alert('Item saved successfully.');
          store.dispatch(fetchItemList());
        });
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
          type: 'FORM_EDIT_MODE'
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


const reducer = (defaultState = {
  items: [],
  selectedItem: null,
  formMode: 'CREATE'
}, action) => {
  switch (action.type) {
    case 'GET_ITEMLIST':
      return Object.assign({}, defaultState, {
        items: action.items
      });
    case 'SELECT_ITEM':
      return Object.assign({}, defaultState, {
        selectedItem: action.item
      });
    case 'UNSELECT_ITEM':
      return Object.assign({}, defaultState, {
        selectedItem: null
      });
    case 'FORM_EDIT_MODE':
      return Object.assign({}, defaultState, {
        formMode: 'EDIT'
      });
    case 'FORM_DEFAULT_MODE':
      return Object.assign({}, defaultState, {
        formMode: 'CREATE'
      });
    default:
      return defaultState;
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
