import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          My Inventory
        </header>
        <div>
          <form>
            <div className="form-row">
              <label htmlFor="itemName">Name</label>
              <input type="text" id="itemName" />
            </div>
            <div className="form-row">
              <label htmlFor="itemQuantity">Quantity</label>
              <input type="number" id="itemQuantity" />
            </div>
            <div className="form-row">
              <label htmlFor="itemPrice">Price</label>
              <input type="number" id="itemPrice" step="any" />
            </div>
            <div className="form-row">
              <button type="submit" value="Submit">Submit</button>
            </div>
          </form>
        </div>
        <table className="itemList">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.props.items.map(item =>
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
