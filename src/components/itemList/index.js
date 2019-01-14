import React, { Component } from 'react';
import './items.css';
import Item from '../item/index';

export default class ItemList extends Component {
  render() {
    return (
      <table className="itemList">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {this.props.items.map((item, index) =>(
            <Item
              key={index}
              {...item}
              selectedItem={this.props.selectedItem}
              onClick={(arg) => this.props.onItemClick(arg)}
            />
          ))}
          {
            this.props.items.length === 0 &&
            <tr>
              <td style={{textAlign: 'center'}} colSpan={4}>There are no items available.</td>
            </tr>
          }
        </tbody>
      </table>
    );
  }
};