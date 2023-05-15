import React from 'react';
import {Routes, Route, Link } from 'react-router-dom';
import './css/App.css';
import { Atletas } from './frontend/AtletasPage';
import { Historial } from './frontend/HistorialPage';
import { Planificacion } from './frontend/PlanificacionPage';
import { Home } from './frontend/Home';

// const ipcRenderer = window.require('electron').ipcRenderer;

const App: React.FC = () => {

  return (
      <div>
        <Routes>
          <Route path = '/' Component = {Home}/>
              <Route path='/atletas' Component={Atletas} />
              <Route path='/planificacion' Component={Planificacion} />
              <Route path='/historial' Component={Historial} />
        </Routes>
      </div>
  );
};

export default App;

