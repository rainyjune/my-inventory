import { connect } from 'react-redux';
import Button from '../components/Button';
import { setFormMode, clearFormItem, unselectItem, removeSelectedItem, fetchItemList } from '../actions/index';

const mapStateToProps = (state, ownProps) => {
  return {
    active: (ownProps.type !== 'CREATE' && ownProps.type !== 'REFRESH') ? !!state.selectedItem : true
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (e) => {
      dispatch(setFormMode(ownProps.type));
      if (ownProps.type === "CREATE") {
        dispatch(clearFormItem());
        dispatch(unselectItem());
      } else if (ownProps.type === "REMOVE") {
        if (window.confirm("Are you sure to continue?") === false) {
          return ;
        }
        //debugger;
        dispatch(removeSelectedItem()).then(() => {
          alert('The item was removed successfully.');
          dispatch(fetchItemList());
        });
      } else if (ownProps.type === "REFRESH") {
        dispatch(fetchItemList());
      }
    }
  }
};

const ToolbarButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);

export default ToolbarButton;