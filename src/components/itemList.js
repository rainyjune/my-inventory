import React from 'react';
import './items.css';
import Item from './item';
import PropTypes from 'prop-types';
import loadingImg from '../loading.svg';

const ItemList = ({ items, itemsListLoading, onItemClick, selectedItem }) => (
  <div style={{position: 'relative'}}>
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
          isSelected={!!(selectedItem && selectedItem.id === item.id)}
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
  <div className={"itemlist-loading" + (itemsListLoading ? ' show' : '')}>
    <img src={loadingImg} className="spinner" alt="loading" />
  </div>
  </div>
);

const itemShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
});

ItemList.propTypes = {
  items: PropTypes.arrayOf(itemShape.isRequired).isRequired,
  selectedItem: itemShape,
  onItemClick: PropTypes.func.isRequired
};

export default ItemList;