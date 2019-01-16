import { combineReducers } from 'redux';
import appError from './appError';
import items from './items';
import formMode from './formMode';
import selectedItem from './selectedItem';
import formValues from './formValues';

const reducer = combineReducers({appError, items, formMode, selectedItem, formValues});
export default reducer;