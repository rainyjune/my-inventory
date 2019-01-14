import React, { Component } from 'react';

export default class Form extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const isEditMode = this.props.formMode === 'EDIT' && this.props.selectedItem;
    const {id, name, quantity, price} = this.props.selectedItem || {};

    this.itemIDInput.value = isEditMode ? id: '';
    this.itemNameInput.value = isEditMode ? name: '';
    this.itemQuantityInput.value = isEditMode ? quantity: '';
    this.itemPriceInput.value = isEditMode ? price: '';
  }
  render() {
    return (
      <div>
        <form id="item-form" onSubmit={e => {
          e.preventDefault();
          this.props.onSubmit(this.itemNameInput.value, this.itemQuantityInput.value, this.itemPriceInput.value, this.itemIDInput.value);
        }}>
          <input ref={node => {this.itemIDInput = node}} type="hidden" id="itemId" />
          <div className="form-row">
            <label htmlFor="itemName">Name</label>
            <input ref={node => {this.itemNameInput = node}} type="text" id="itemName" required />
          </div>
          <div className="form-row">
            <label htmlFor="itemQuantity">Quantity</label>
            <input ref={node => {this.itemQuantityInput = node}} type="number" id="itemQuantity" required />
          </div>
          <div className="form-row">
            <label htmlFor="itemPrice">Price</label>
            <input ref={node => {this.itemPriceInput = node}} type="number" id="itemPrice" step="any" required />
          </div>
          <div className="form-row">
            <button type="submit" value="Submit">Submit</button>
            <button type="reset" value="Reset">Reset</button>
            <button value="Close" onClick={this.props.onFormClose}>Close</button>
          </div>
        </form>
      </div>
    );
  }
}