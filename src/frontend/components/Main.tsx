import React from 'react';
import {Route, Routes } from 'react-router-dom';

import {AtletasPage}  from '../pages/AtletasPage';
import HistorialEntrenamientosPage from '../pages/HistorialEntrenamientosPage';
import PlanificacionPage from '../pages/PlanificacionPage'
import HomePage from '../pages/HomePage';
import { CreacionAtletaPage } from '../pages/CreacionAtletaPage';

export const atletas_path = '/atletas'
export const historial_path = '/historial'
export const planificacion_path = '/planificacion'

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route path = {atletas_path} element ={<AtletasPage/>}></Route>
      <Route path= {historial_path} element ={<HistorialEntrenamientosPage/>}></Route>
      <Route path= {planificacion_path} element ={<PlanificacionPage/>}></Route>
      <Route path= '/' element ={<HomePage/>}></Route>
      <Route path= {atletas_path + '/create'} element={<CreacionAtletaPage/>}> </Route>
    </Routes>
  );
}

export default Main;
