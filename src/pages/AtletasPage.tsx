// pages/Page1.tsx
import React from 'react';
import { Title } from '../components/Title';
import { ListComponent } from '../components/ListComponent';
import { atletas_path } from '../components/Main';

export const AtletasPage: React.FC = () => {
  return (
    <div>
    <Title title = 'Atletas'/>
    <ListComponent title = {'Listado de Atletas'} link = {atletas_path+"/create"} />
    </div>
  )
};
