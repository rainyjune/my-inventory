import fetch from 'cross-fetch';
import Config from './config';

const { SERVER } = Config;

export function fetchItemList() {
  return function(dispatch) {
    return fetch(SERVER + 'list.php')
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json => {
        if (json.status === 'ok') {
          dispatch(getItemList(json.data));
          dispatch(unselectItem());
        } else {
          dispatch(setAjaxError(json.msg));
        }
      })
  };
};

export function saveNewItem(name, quantity, price, id) {
  return function(dispatch) {
    let reqBody = 'name=' + encodeURIComponent(name) +'&quantity=' + encodeURIComponent(quantity) + '&price=' + encodeURIComponent(price);
    if (id) {
      reqBody += '&id=' + encodeURIComponent(id);
    }
    return fetch(SERVER + 'saveItem.php', {
        method: 'POST',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: reqBody
      })
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
  };
};

export function removeItem(id) {
  return function(dispatch) {
    return fetch(SERVER + 'removeItem.php', {
        method: 'POST',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'id=' + encodeURIComponent(id)
      })
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
  };
};

export function setFormMode(mode) {
  return { type: 'SET_FORMMODE', mode };
}

export function getItemList(items) {
  return { type: 'GET_ITEMLIST', items };
}

export function clearAppError() {
  return { type: 'CLEAR_APPERROR' };
}

export function unselectItem() {
  return { type: 'UNSELECT_ITEM' };
}

export function selectItem(item) {
  return { type: 'SELECT_ITEM', item };
}

export function setAjaxError(msg) {
  return { type: 'AJAX_ERROR', msg };
}

export function toggleItemSelect(item) {
  return function(dispatch, getState) {
    const selectedItem = getState();
    if (selectedItem && selectedItem.id === item.id) {
      dispatch(unselectItem());
    } else {
      dispatch(selectItem(Object.assign({}, item)));
    }
  };
}