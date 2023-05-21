import React from 'react';
import {Routes, Route } from 'react-router-dom';
import { AtletaPag, Atletas, AtletasCrear } from './frontend/AtletasPage';
import { Historial } from './frontend/HistorialPage';
import { Planificacion } from './frontend/PlanificacionPage';
import { Home } from './frontend/Home';
import { Header } from './frontend/Components/External';



const App: React.FC = () => {

  return (
      <div>
        <Header/>
        <Routes>
              <Route path = '/' Component = {Home}/>
              <Route path='/atleta' Component={Atletas} />
              <Route path='/planificacion' Component={Planificacion} />
              <Route path='/historial' Component={Historial} />
              <Route path='/atleta/nuevo' Component= {AtletasCrear} />
              <Route path='/atleta/:id'  Component = {AtletaPag}/>
        </Routes>
      </div>
  );
};

export default App;

