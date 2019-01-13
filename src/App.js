import React, { Component } from 'react';
import './App.css';
import MyForm from './components/form/index';
import ItemList from './components/itemList/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          My Inventory
        </header>
        <MyForm
          formMode={this.props.formMode}
          selectedItem={this.props.selectedItem}
          onSubmit={this.props.onFormSubmit}
        />
        {
          this.props.items.length > 0 &&
          <div>
            <button className="tool-button" onClick={this.props.onEditBtnClick}>Edit</button>
            <button className="tool-button" onClick={this.props.onRemoveBtnClick}>Remove</button>
          </div>
        }
        <ItemList
          selectedItem={this.props.selectedItem}
          items={this.props.items}
          onItemClick={ arg =>this.props.onItemClick(arg) }
        />
      </div>
    );
  }
}

export default App;
