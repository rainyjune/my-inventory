export default function itemsListLoading(state = false, action) {
  if (action.type === 'ITEM_LIST_LOADING') {
    return true;
  } else if (action.type === 'ITEM_LIST_LOADED') {
    return false;
  }
  return state;
};