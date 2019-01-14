import fetch from 'cross-fetch';

export function fetchItemList() {
  return function(dispatch) {
    return fetch('http://localhost/my-inventory/backend/list.php')
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json => {
        if (json.status === 'ok') {
          dispatch({
            type: 'GET_ITEMLIST',
            items: json.data
          });
          dispatch({
            type: 'UNSELECT_ITEM'
          });
        } else {
          dispatch({
            type: 'AJAX_ERROR',
            msg: json.msg
          });
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
    return fetch('http://localhost/my-inventory/backend/saveItem.php', {
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
    return fetch('http://localhost/my-inventory/backend/removeItem.php', {
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