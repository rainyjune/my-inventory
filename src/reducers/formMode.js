export default function formMode(state = 'NONE', action) {
  if (action.type === "SET_FORMMODE") {
    return action.mode;
  } else {
    return state;
  }
};