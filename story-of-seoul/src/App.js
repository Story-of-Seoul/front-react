import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Router from './router/Router';
import { Helmet } from 'react-helmet';

const App = () => {
  return (
    <div className="App">
      <div className='AppTitle'>
        <Helmet>
          <title>서울의 이야기</title>
        </Helmet>
      </div>
      <Nav/>
      <Router/>
    </div>
  );
};

export default App;