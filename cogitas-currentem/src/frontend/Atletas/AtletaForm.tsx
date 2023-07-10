import React, { useEffect, useLayoutEffect, useState } from "react";
import { Sexo, Atleta } from "../../electron/model/atleta";
import { useNavigate } from "react-router-dom";
import { DatabaseConnection } from "../PersistenceConnection";



export function AtletaForm({ id }: { id: string }) {

  const [atletaData, setData] = useState({
    nombre: "",
    fechaNacimiento: "",
    altura: 0,
    sexo: Sexo.Hombre,
    anioComienzoEntrenamiento: 2023,
    peso: 0,
    objetivos: ""
  });

  const [atleta, setAtleta] = useState(null as Atleta)

  const nav = useNavigate()


  useEffect(() => {
    const getAtleta = async () => {
      if (id != "") {
        const atleta = (await new DatabaseConnection().getAtleta(parseInt(id)))as Atleta
      setAtleta(atleta)
      setData({
        nombre: atleta.nombre,
        fechaNacimiento: atleta.fechaNacimiento.toISOString().split('T')[0],
        altura: atleta.altura,
        sexo: atleta.sexo,
        anioComienzoEntrenamiento : atleta.anioComienzoEntrenamiento,
        peso: atleta.peso,
        objetivos: atleta.objetivos
      } )
    }
  }
    getAtleta()

  }, [])




  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const type = event.target.type;
    setData(prevData => ({ ...prevData, [name]: type === "number" ? parseInt(value, 10) : value }));

  };



  const crearAtleta =  async () => {
    if (atleta !== null){
      atleta.nombre = atletaData.nombre
      atleta.fechaNacimiento = new Date(atletaData.fechaNacimiento)
      atleta.altura = atletaData.altura
      atleta.sexo = atletaData.sexo
      atleta.anioComienzoEntrenamiento= atletaData.anioComienzoEntrenamiento
      atleta.peso = atletaData.peso
      atleta.objetivos = atletaData.objetivos
      const object = await new DatabaseConnection().saveAtleta(atleta)
      const id = object.id
      nav('/atleta/' + id)

    } else {
      const newAtleta = new Atleta(atletaData.nombre,new Date(Date.parse(atletaData.fechaNacimiento)),atletaData.peso,atletaData.altura,atletaData.sexo,atletaData.anioComienzoEntrenamiento,atletaData.objetivos)
      const object = await new DatabaseConnection().saveAtleta(newAtleta)
      const id = object.id
      nav('/atleta/' + id)
    }

  };

  return (
    <form onSubmit={async event => {event.preventDefault();await crearAtleta();}}>
      <h2> Datos Fisicos </h2>
      <label htmlFor="nombre">Nombre</label>
      <input onChange={handleChange} type="text" id="nombre" name="nombre" value={atletaData.nombre}></input>

      <label htmlFor="fechaNacimiento"> Fecha de nacimiento </label>
      <input onChange={handleChange} type="date" id="fechaNacimiento" name="fechaNacimiento" value={atletaData.fechaNacimiento}></input>

      <label htmlFor="altura"> Altura (en cm)</label>
      <input onChange={handleChange} type="number" min={0} id="altura" name="altura" value={atletaData.altura}></input>

      <label htmlFor="sexo"> Sexo </label>
      <select onChange={handleChange} name="sexo" value={atletaData.sexo}>
        <option value={Sexo.Hombre}> Hombre </option>
        <option value={Sexo.Mujer}> Mujer </option>
      </select>

      <label htmlFor="peso"> Peso (en kg) </label>
      <input onChange={handleChange} type="number" name="peso" value={atletaData.peso}></input>


      <h2> Sobre Atletismo</h2>


      <label htmlFor="anioComienzoEntrenamiento">Año comienzo de entrenamiento</label>
      <input onChange={handleChange} type="number" min={1900} name="anioComienzoEntrenamiento" value={atletaData.anioComienzoEntrenamiento}></input>

      <label htmlFor="objetivos"> Objetivos </label>
      <input onChange={handleChange} type="text" name="objetivos" value={atletaData.objetivos}></input>


      <button type="submit"> Cargar </button>
    </form>
  );
}
