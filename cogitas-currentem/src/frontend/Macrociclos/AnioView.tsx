import React, { useLayoutEffect, useState } from 'react';
import "../css/CrearMacrociclo.css"
import { Anio, Grupo } from '../../electron/model/anio';
import { Link,  useParams } from 'react-router-dom';
import { UnitSelector } from '../Atletas/UnitSelector';
import {  DistanceConverter } from '../../electron/typeConfigs';



export function AnioView() {
  const { id} = useParams();
  const [usedMacrociclo,setMacrociclo] = useState(null as Anio)
  const [anio, setAnio] = useState(0)
  const [groupName, setName] = useState("")
  const [grupos, setGrupos] = useState([] as Grupo[])
  const [lowerBound, setLowerBound] = useState(-1)
  const [upperBound, setUpperBound] = useState(-1)


  const actualizarAnio = async (anioNuevo : number) => {
    usedMacrociclo.setAnio(anioNuevo)
    setAnio(anioNuevo)
   // await new DatabaseInterface(Tables.macrociclo).save(usedMacrociclo)
  }

  const setBound = (x : number) => {
    if (lowerBound !== -1 && upperBound !== -1) {
      setLowerBound(x)
      setUpperBound(-1)
    } else if (lowerBound === -1){
      setLowerBound(x)
    } else if (x < lowerBound) {
      setUpperBound(lowerBound)
      setLowerBound(x)
    } else {
      setUpperBound(x);
    }
  }

  const asignar = async () => {
    usedMacrociclo.asignarGrupoA(new Grupo(lowerBound,upperBound,groupName))
   await new DatabaseInterface(Tables.macrociclo).save(usedMacrociclo)
    setGrupos(usedMacrociclo.getGrupos())
    setLowerBound(-1)
    setUpperBound(-1)
  }

  const  stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}


  const getColor =  (i : number) => {
    if ((i >= lowerBound && i <= upperBound) || i === lowerBound || i=== upperBound) return 'white'
    let grupo = usedMacrociclo.getGrupoFor(i)
    if (grupo == null) return 'grey'
    else return stringToColor(grupo.nombre)
  }

  useLayoutEffect(() => {
    const fetch = async () => {
     const macrociclo = await new DatabaseInterface(Tables.macrociclo).get(id) as Anio
     setMacrociclo(macrociclo)
     setAnio(macrociclo.getAnio())
    }
    fetch()
  }, [id])

  if (usedMacrociclo == null) return (<div></div>)

  return (
    <div>
      <h1>Plan de Entrenamiento</h1>
      <label htmlFor="anio">Año</label>
      <input type='number' name="anio" onChange={(event) => actualizarAnio(event.target.valueAsNumber)} value={anio}></input>


      {lowerBound !== -1 && upperBound !== -1  &&  <div> <label>Nombre Grupo</label> <input minLength={1} value={groupName} onChange={(event) => setName(event.target.value)}></input>
      <button onClick={asignar}> Asignar Grupo </button> </div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
  {Array.from({ length: 52 }, (_, index) => index + 1).map(i =>
    <div style={{
      border: '1px solid black',
      padding: '10px',
      backgroundColor: getColor(i)
    }}>
      <p>Semana: {i}</p>
      <Link to={"./semana/" + i}>Ver</Link>
      <button onClick={() => setBound(i)}>Set</button>
    </div>
  )}
</div>

      <h3>Grupos:</h3>
      {grupos.map(g =>
      <div>
        <ul>
        <li>Nombre: {g.nombre}</li>
        <li>Comienzo: {g.semanaComienzo}</li>
        <li>Fin: {g.semanaFin}</li>
        <li>Distancia Total: <UnitSelector value={g.getDistanciaTotal()} converter={new DistanceConverter()}/></li>
        </ul>
       </div>
        )}

    </div>
  )

}







