export default function items(state = [], action) {
  switch(action.type) {
    case 'GET_ITEMLIST':
      return action.items;
    default:
      return state;
  }
};