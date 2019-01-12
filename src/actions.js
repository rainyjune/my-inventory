import fetch from 'cross-fetch';

export function fetchItemList() {
  return function(dispatch) {
    return fetch('http://localhost/my-inventory/backend/list.php')
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch({
          type: 'GET_ITEMLIST',
          items: json.data
        })
      )
  }
}