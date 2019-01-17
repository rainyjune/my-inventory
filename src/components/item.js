import React from 'react';
import PropTypes from 'prop-types';

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

Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Item;