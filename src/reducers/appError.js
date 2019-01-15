export default function appError(state = '', action) {
  switch(action.type) {
    case 'AJAX_ERROR':
      return action.msg;
    case 'CLEAR_APPERROR':
      return '';
    default:
      return state;
  }
};