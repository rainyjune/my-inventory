import fetch from 'cross-fetch';
import Config from './config';

const { SERVER } = Config;

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

export function fetchItemList() {
  return function(dispatch) {
    return fetch(SERVER + 'list.php')
      .then(status)
      .then(
        response => response.json()
      )
      .then(json => {
        if (json.status === 'ok') {
          dispatch(getItemList(json.data));
          dispatch(unselectItem());
        } else {
          dispatch(setAjaxError(json.msg));
        }
      }, e => {
        dispatch(setAjaxError(e.message));
      })
  };
};

export function saveNewItem() {
  return function(dispatch, getState) {
    const { id, name, quantity, price } = getState().formValues;
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
      .then(status)
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
      .then(status)
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

export function setFormItem(item) {
  return { type: 'SET_FORM_VALUES_EDIT', item };
}

export function clearFormItem() {
  return { type: 'CLEAR_FORM_VALUES' };
}

export function toggleItemSelect(item) {
  return function(dispatch, getState) {
    const selectedItem = getState().selectedItem;
    if (selectedItem && selectedItem.id === item.id) {
      dispatch(unselectItem());
      dispatch(clearFormItem());
    } else {
      dispatch(selectItem(Object.assign({}, item)));
      dispatch(setFormItem(item));
    }
  };
}

export function removeSelectedItem() {
  return function(dispatch, getState) {
    const selectedItem = getState().selectedItem;
    if (selectedItem && selectedItem.id) {
      return dispatch(removeItem(selectedItem.id));
    }
  }
}

export function updateFormInput(e) {
  const target = e.target;
  return {
    type: 'UPDATE_FORM_INPUT_' + target.name.toUpperCase(),
    value: target.value
  };
}