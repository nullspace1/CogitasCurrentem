import React, { useState, useLayoutEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Atleta } from "../../electron/model/atleta";
import { DatabaseInterface, ExistingDatabase } from "../persistence/persistence";

export const AtletaPag : React.FC<any> = () => {
    const { id } = useParams();
    const [atletaInfo, setAtletaInfo] = useState(null as Atleta)

    useLayoutEffect( () => {const fetch = async () => {
      const atletas = await new DatabaseInterface(ExistingDatabase.atleta).getAll()
      const atleta = atletas.filter(x => x.id == id)[0]
      setAtletaInfo(atleta as Atleta)
    }
      fetch()
    },[])

    if (atletaInfo == null) return (<div></div>)

    return (
      <div>
        <h1>{atletaInfo.nombre} </h1>
        <div className="button"> <Link to={'/editar'}> Editar Informacion </Link> </div>
        <div className="infoBox">
          <h2>Informacion Personal</h2>
          <ul>
          <li>Edad:   {atletaInfo.getEdad()} </li>
          <li>Peso: {atletaInfo.pesoEnKilos} kg</li>
          <li>Altura: {atletaInfo.alturaEnCm} cm</li>
          <li>Sexo: {atletaInfo.sexo.toString()}</li>
          </ul>
          <div className="infoBox">
            <h2>Informacion Atletismo</h2>
            <ul>
            <li>Años de entrenamiento: {atletaInfo.getAniosEntrenamiento()}</li>
            <li>Objetivo Actual: {atletaInfo.objetivos}</li>
            <li>Kilometros Semanales: {atletaInfo.distanciaSemanal(new Date()) / 1000} km</li>
            <li>Ritmo Maximo: {atletaInfo.calcularRitmoAl(1)} </li>
            </ul>
          </div>
          <h2>Entrenamientos Realizados</h2>
          <div className="infoBox">
          <div className="infoBoxHeader">
            <Link to={'/entrenamientos/nuevo'}> Agregar </Link>
            <Link to={'/entrenamientos'}> Ver Todos </Link>
          </div>
          <ul>
            {atletaInfo.entrenamientosRealizados.map(e =>
            <li>
              <ul>
              <li>Fecha: {e.getFecha().toDateString()}</li>
              <li>Resultado: {e.getResultadoEntrenamiento().toString()}</li>
              </ul>
              <Link to={'/entrenamientos/'+e.getFecha().toDateString()}>Ver</Link>
              </li>
            )}
          </ul>
          </div>

          </div>
        </div>

    )
  }
