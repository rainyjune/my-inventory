export default function formValues(state = {
  id: '',
  name: '',
  quantity: '',
  price: ''
}, action) {
  switch(action.type) {
    case 'SET_FORM_VALUES_EDIT':
      return Object.assign({}, action.item);
    case 'UPDATE_FORM_INPUT_NAME':
      return Object.assign({}, state, {
        name: action.value
      });
    case 'UPDATE_FORM_INPUT_QUANTITY':
      return Object.assign({}, state, {
        quantity: action.value
      });
    case 'UPDATE_FORM_INPUT_PRICE':
      return Object.assign({}, state, {
        price: action.value
      });
    case 'CLEAR_FORM_VALUES':
      return {
        id: '',
        name: '',
        quantity: '',
        price: ''
      };
    default:
      return state;
  }
};