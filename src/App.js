import React from 'react';
import './App.css';
import MyForm from './components/form/form';
import VisibleItemList from './components/VisibleItemList';
import Toolbar from './components/Toolbar';
import Notification from './components/Notification';

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