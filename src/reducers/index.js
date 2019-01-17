import { combineReducers } from 'redux';
import appError from './appError';
import items from './items';
import formMode from './formMode';
import selectedItem from './selectedItem';
import formValues from './formValues';
import itemsListLoading from './itemsListLoading';

export default combineReducers({
  appError,
  items,
  formMode,
  selectedItem,
  itemsListLoading,
  formValues
});