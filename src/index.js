import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { fetchItemList, saveNewItem, removeItem, setFormMode, clearAppError, unselectItem, selectItem, setAjaxError } from './actions';
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
        store.dispatch(setFormMode('NONE'));
      }}
      onTipsHide={() => {
        store.dispatch(clearAppError());
      }}
      onFormSubmit={(name, quantity, price, id) => {
        store.dispatch(saveNewItem(name, quantity, price, id)).then((json) => {
          if (json.status !== 'ok') {
            store.dispatch(setAjaxError(json.msg));
          } else {
            alert('Item saved successfully.');
            store.dispatch(fetchItemList());
          }
        });
      }}
      onCreateBtnClick={() => {
        store.dispatch(setFormMode('CREATE'));
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
        store.dispatch(setFormMode('EDIT'));
      }}
      onItemClick={(arg) => {
        const selectedItem = store.getState().selectedItem;
        if (selectedItem && selectedItem.id === arg.id) {
          store.dispatch(unselectItem());
        } else {
          store.dispatch(selectItem(Object.assign({}, arg)));
        }
      }}
    />,
    document.getElementById('root')
  );
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
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
