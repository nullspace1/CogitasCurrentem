import React, { useState, useLayoutEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Atleta } from "../../electron/model/atleta";
import { DatabaseInterface, ExistingDatabase } from "../persistence/persistence";
import { Dimension, DistanceConverter, PaceConverter, ValueOption, WeightConverter } from "../../electron/typeConfigs";

export const AtletaPag: React.FC<any> = () => {
  const { id } = useParams();
  const [atletaInfo, setAtletaInfo] = useState(null as Atleta)

  useLayoutEffect(() => {
    const fetch = async () => {
      const atletas = await new DatabaseInterface(ExistingDatabase.atleta).getAll()
      const atleta = atletas.filter(x => x.id == id)[0]
      setAtletaInfo(atleta as Atleta)
    }
    fetch()
  }, [])

  if (atletaInfo == null) return (<div></div>)

  return (
    <div>
      <h1>{atletaInfo.getNombre()} </h1>
      <div> <Link to={'./edicion'}> Editar Informacion </Link> </div>
      <div>
        <InformacionPersonal atleta={atletaInfo} />
        <InformacionAtleta atleta={atletaInfo} />
        <EntrenamientosList list={atletaInfo.getEntrenamientos()} nombre={"Entrenamientos realizados"} />
        <EntrenamientosList list={atletaInfo.getCarreras()} nombre={"Carreras participadas"} />
        <EntrenamientosList list={atletaInfo.getTests()} nombre={"Tests realizados"} />
        <MacroCiclo atleta={atletaInfo} />
      </div>
    </div>
  )
}

function MacroCiclo({ atleta }: { atleta: Atleta }) {
  let macrociclo = atleta.getMacroCiclos()

  return (
    <div>
      <h2>Macrociclos</h2>
      <Link to={'/macrociclo/nuevo'} state={{ids : [atleta.id]}}>Crear Nuevo</Link>
      <ul>
        {macrociclo.map(m =>
          <ul>
            <li>Nombre: {m.getNombre()}</li>
            <li>Anio: {m.getAnio()}</li>
            <Link to={'/macrociclo/' + m.id} > Ver </Link>
          </ul>
        )}
      </ul>
    </div>
  )
}

function InformacionPersonal({ atleta }: { atleta: Atleta }) {
  return (
    <div>
      <h2>Informacion Personal</h2>
      <ul>
        <li>Edad:   {atleta.getEdad()} </li>
        <li>Peso: <UnitSelector value={atleta.getPeso()} converter={new WeightConverter()} /></li>
        <li>Altura: <UnitSelector value={atleta.getAltura()}  converter={new DistanceConverter()} /> </li>
        <li>Sexo: {atleta.getSexo().toString()}</li>
      </ul>
    </div>
  )
}

function InformacionAtleta({ atleta }: { atleta: Atleta }) {
  return (
    <div>
      <h2>Informacion Atletismo</h2>
      <ul>
        <li>Años de entrenamiento: {atleta.getAniosEntrenamiento()}</li>
        <li>Objetivo Actual: {atleta.getObjetivos()}</li>
        <li>Kilometros Semanales: <UnitSelector value={atleta.getDistanciaSemanal()} converter={new DistanceConverter()} /></li>
        <li>Ritmo Maximo: <UnitSelector value={atleta.getRitmoMaximo()}  converter={new PaceConverter()} /></li>
      </ul>
    </div>
  )
}

export function EntrenamientosList({ list, nombre }) {
  return (
    <div>
      <h2>{nombre}</h2>
      <div>
        <div>
          <Link to={'./entrenamientos/nuevo'}> Agregar </Link>
          <Link to={'./entrenamientos'}> Ver Todos </Link>
        </div>
        <ul>
          {list.map((e, index) =>
            <li>
              <ul>
                <li>Semana: {e.getSemana()}</li>
                <li>Dia: {e.getDia()}</li>
                <li>Resultado: {e.getResultado().toString()}</li>
                <li>Cantidad de kilometros: <UnitSelector value={e.getDistancia()} converter={ new DistanceConverter()} /></li>
              </ul>
              <Link to={'./entrenamientos/' + e.id}>Ver</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}



const UnitSelector = ({ value, converter }: { value: number, converter: Dimension }) => {
  const [selectedUnit, setSelectedUnit] = useState(converter.default() as ValueOption);
  return (
    <div>
      {converter.convert(value,selectedUnit)}
      <select value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value as ValueOption)}>
        {converter.getList().map((unit) => (
          <option value={unit} key={unit}>{unit}</option>
        ))}
      </select>
    </div>
  );
};

export default UnitSelector;
