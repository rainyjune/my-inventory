import React from 'react';
import './items.css';
import Item from '../item/index';

const ItemList = ({ items, onItemClick, selectedItem }) => (
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
      {items.map((item, index) => (
        <Item
          key={item.id}
          {...item}
          isSelected={selectedItem && selectedItem.id === item.id}
          onClick={() => onItemClick(item)}
        />
      ))}
      {
        items.length === 0 &&
        <tr>
          <td style={{textAlign: 'center'}} colSpan={4}>There are no items available.</td>
        </tr>
      }
    </tbody>
  </table>
);

export default ItemList;