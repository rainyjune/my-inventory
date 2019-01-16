import React from 'react';

const Item = ({ id, name, quantity, price, onClick, isSelected }) => (
  <tr
    onClick={onClick}
    style={{
      backgroundColor: isSelected ? '#bdeabf' : ''
    }}
  >
    <td>{id}</td>
    <td>{name}</td>
    <td>{quantity}</td>
    <td>{price}</td>
  </tr>
);

export default Item;