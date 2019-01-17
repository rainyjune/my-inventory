import React from 'react';
import './App.css';
import MyForm from '../containers/form';
import VisibleItemList from '../containers/VisibleItemList';
import Toolbar from './Toolbar';
import Notification from '../containers/Notification';

const App = () => (
  <div className="App">
    <header className="App-header">
      My Inventory
    </header>
    <MyForm />
    <Notification />
    <Toolbar />
    <VisibleItemList />
  </div>
);

export default App;