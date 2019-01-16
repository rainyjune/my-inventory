import React, { Component } from 'react';
import './App.css';
import MyForm from './components/form/index';
import VisibleItemList from './components/VisibleItemList';

class App extends Component {
  render() {
    const tipsClassNames = ['tips'];
    if (this.props.appError) {
      tipsClassNames.push('show');
    }
    const editRemoveBtnDisabled = !this.props.selectedItem;
    //debugger;
    return (
      <div className="App">
        <header className="App-header">
          My Inventory
        </header>
        {this.props.formMode !== "NONE" &&
        <MyForm
          formMode={this.props.formMode}
          selectedItem={this.props.selectedItem}
          onSubmit={this.props.onFormSubmit}
          onFormClose={this.props.onFormClose}
        />}
        <div className={tipsClassNames.join(' ')} onAnimationEnd={this.props.onTipsHide}>{this.props.appError}</div>
        <div>
          <button className="tool-button" onClick={this.props.onCreateBtnClick}>New</button>
          <button disabled={editRemoveBtnDisabled} className="tool-button" onClick={this.props.onEditBtnClick}>Edit</button>
          <button disabled={editRemoveBtnDisabled} className="tool-button" onClick={this.props.onRemoveBtnClick}>Remove</button>
        </div>
        <VisibleItemList />
      </div>
    );
  }
}

export default App;
