import React from 'react';
import { connect } from 'react-redux';
import './form-row.css';
import { saveNewItem, fetchItemList, setAjaxError, setFormMode, updateFormInput } from '../actions/index';

const mapStateToProps = state => {
  return {
    formMode: state.formMode,
    selectedItem: state.formValues || {
      id: '',
      name: '',
      quantity: '',
      price: ''
    }
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: e => {
      dispatch(updateFormInput(e));
    },
    onSubmit: e => {
      e.preventDefault();
      dispatch(saveNewItem()).then((json) => {
        if (json.status !== 'ok') {
          dispatch(setAjaxError(json.msg));
        } else {
          alert('Item saved successfully.');
          dispatch(fetchItemList());
        }
      });
    },
    onClose: e => {
      e.preventDefault();
      dispatch(setFormMode('NONE'));
    }
  }
}

let Form = ({ formMode, selectedItem, onInputChange, onSubmit, onClose }) => {
  const permittedMode = ['CREATE', 'EDIT'];
  if (permittedMode.indexOf(formMode) === -1) return null;
  return (
    <div>
      <form id="item-form" onSubmit={onSubmit}>
        <input type="hidden" id="itemId" value={selectedItem.id} />
        <div className="form-row">
          <label htmlFor="itemName">Name</label>
          <input name="name" type="text" required value={selectedItem.name} onChange={onInputChange} />
        </div>
        <div className="form-row">
          <label htmlFor="itemQuantity">Quantity</label>
          <input name="quantity" type="number"required value={selectedItem.quantity} onChange={onInputChange} />
        </div>
        <div className="form-row">
          <label htmlFor="itemPrice">Price</label>
          <input type="number" name="price" step="any" required value={selectedItem.price} onChange={onInputChange} />
        </div>
        <div className="form-row">
          <button type="submit" value="Submit">Submit</button>
          <button type="reset" value="Reset">Reset</button>
          <button value="Close" onClick={onClose}>Close</button>
        </div>
      </form>
    </div>
  );
};

Form = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

export default Form;