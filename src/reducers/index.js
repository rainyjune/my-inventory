import appError from './appError';
import items from './items';
import formMode from './formMode';
import selectedItem from './selectedItem';

const reducer = (state = {
  items: [],
  selectedItem: null,
  formMode: 'NONE',
  appError: ''
}, action) => {
  return {
    appError: appError(state.appError, action),
    items: items(state.items, action),
    formMode: formMode(state.formMode, action),
    selectedItem: selectedItem(state.selectedItem, action)
  };
};

export default reducer;