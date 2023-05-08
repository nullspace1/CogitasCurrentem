import React from 'react';
import './App.css';
import Main from './components/Main';
import { NavBar } from './components/NavBar';
import "./css/App.css"

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="NavBar">
      <NavBar/>
      </div>
      <div className="Application">
      <Main/>
      </div>
    </div>
  );
};

export default App;
