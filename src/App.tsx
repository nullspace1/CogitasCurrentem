import React from 'react';
import './App.css';
import Main from './components/Main';
import { NavBar } from './components/NavBar';

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar/>
      <Main/>
    </div>
  );
};

export default App;
