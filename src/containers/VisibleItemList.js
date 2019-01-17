import { connect } from 'react-redux';
import { toggleItemSelect } from '../actions/index';
import ItemList from '../components/itemList';

const mapStateToProps = state => {
  return {
    items: state.items,
    selectedItem: state.selectedItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onItemClick: item => {
      dispatch(toggleItemSelect(item));
    }
  }
}

const VisibleItemList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList);

export default VisibleItemList;