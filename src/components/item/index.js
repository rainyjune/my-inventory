import React from 'react';

const Item = ({ id, name, quantity, price, onClick, selectedItem} ) => (
  <tr onClick={() => onClick({id, name, quantity, price})} style={{backgroundColor: selectedItem && selectedItem.id === id ? 'green' : ''}}>
    <td>{id}</td>
    <td>{name}</td>
    <td>{quantity}</td>
    <td>{price}</td>
  </tr>
);

export default Item;