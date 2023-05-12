// pages/Page1.tsx
import React, { useEffect, useState } from 'react';
import { Title } from '../components/Title';
import { atletas_path } from '../components/Main';
import { ipcRenderer } from 'electron';



export const AtletaList: React.FC = () => {

  const [atletas,setAtletas] = useState([])
  const [search,setSearch] = useState()

  const handleSearchChange = (e : any) => {
    setAtletas(e.target.value)
  }

  useEffect(() => {
    ipcRenderer.send('fetch-items');
    ipcRenderer.once('items-fetched', (_, results) => {
    setAtletas(results)
  });

  },[search])

  return (
    <div className = 'AtletaList'>
      <div className = 'AtletaListHeader'>
        <div className = 'Title'>
          Listado de Atletas Registrados
        </div>
      <input
        type="text"
        placeholder="Busca un atleta..."
        value={search}
        onChange={handleSearchChange}
      />
    </div>
    <div className = 'List'>
    <ul>
    {atletas.map((item) => (
          <li>{item}</li>
        ))}
    </ul>
    </div>
    </div>
  )
}

export const AtletasPage: React.FC = () => {
  return (
    <div>
    <Title title = 'Atletas'/>
    <AtletaList/>
    </div>
  )
};
