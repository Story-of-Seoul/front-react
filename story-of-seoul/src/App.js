import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Router from './router/Router';

const App = () => {
  return (
    <div className="App">
      <Nav/>
      <Router/>
    </div>
  );
};

export default App;