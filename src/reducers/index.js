import { combineReducers } from 'redux';
import appError from './appError';
import items from './items';
import formMode from './formMode';
import selectedItem from './selectedItem';

const reducer = combineReducers({appError, items, formMode, selectedItem});
export default reducer;