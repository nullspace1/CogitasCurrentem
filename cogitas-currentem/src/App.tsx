import "reflect-metadata";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Atletas } from './frontend/Atletas/MainPage';
import { Historial } from './frontend/HistorialPage';
import { Planificacion } from './frontend/PlanificacionPage';
import { Home } from './frontend/Home';
import { Header } from './frontend/Components/External';
import { AtletasCrear } from './frontend/Atletas/CrearAtleta';
import { AtletaPag } from './frontend/Atletas/AtletaIndividual';
import { EditarAtleta } from "./frontend/Atletas/EditarAtleta";
import { MacroCicloCrear } from "./frontend/Macrociclos/CrearMacrociclo";
import { VerMacroCiclo } from "./frontend/Macrociclos/VerMacroCiclo";



const App: React.FC = () => {

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/atleta' Component={Atletas} />
        <Route path='/planificacion' Component={Planificacion} />
        <Route path='/historial' Component={Historial} />
        <Route path='/atleta/nuevo' Component={AtletasCrear} />
        <Route path='/atleta/:id' Component={AtletaPag} />
        <Route path='/atleta/:id/edicion' Component={EditarAtleta}/>
        <Route path='/macrociclo/nuevo' Component={MacroCicloCrear}/>
        <Route path='/macrociclo/:id' Component={VerMacroCiclo}/>
      </Routes>
    </div>
  );
};

export default App;

