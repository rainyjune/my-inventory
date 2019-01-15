export default function selectedItem(state = null, action) {
  switch(action.type) {
    case 'SELECT_ITEM':
      return action.item;
    case 'UNSELECT_ITEM':
      return null;
    default:
      return state;
  }
};