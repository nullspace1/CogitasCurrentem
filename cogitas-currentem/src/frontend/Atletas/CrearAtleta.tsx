import React, { useState } from "react"
import { Sexo, Atleta } from "../../electron/model/atleta"
import { DatabaseInterface, ExistingDatabase } from "../persistence/persistence"

export const AtletasCrear : React.FC = () => {

    const [atletaData,setData] = useState(
      {nombre:"",
      fechaNacimiento : "",
      alturaEnCm: 0,
      sexo: Sexo.Hombre,
      aniosEntrenamiento: 0,
      pesoEnKilos: 0,
      objetivos:""
    })

    const [date,dateSet] = useState("")

    const handleChange = (event) => {
      const name = event.target.name
      const value = event.target.value
      const type = event.target.type
      setData(prevData => ({...prevData,[name]: type === "number" ? parseInt(value,10) : value}))

    }

    const crearAtleta = async () => {
        var atleta : Atleta = new Atleta(atletaData.nombre,new Date(atletaData.fechaNacimiento),atletaData.pesoEnKilos,atletaData.alturaEnCm,atletaData.sexo,atletaData.aniosEntrenamiento,atletaData.objetivos)
        new DatabaseInterface(ExistingDatabase.atleta).add(atleta)
        dateSet(atletaData.fechaNacimiento)
    }

    return (
  <div>
    <h1>Crear Atleta</h1>
    <form className = "Formulario" onSubmit={crearAtleta}>

      <h2> Datos Fisicos </h2>
      <label htmlFor="nombre">Nombre</label>
      <input onChange={handleChange} type="text" id="nombre" name="nombre" value={atletaData.nombre}></input>

      <label htmlFor="fechaNacimiento"> Fecha de nacimiento </label>
      <input onChange={handleChange} type="date" id="fechaNacimiento" name="fechaNacimiento" value={atletaData.fechaNacimiento}></input>

      <label htmlFor="alturaEnCm"> Altura (en cm)</label>
      <input onChange={handleChange} type="number" min={0} id="alturaEnCm" name="alturaEnCm" value={atletaData.alturaEnCm}></input>

      <label htmlFor="sexo"> Sexo </label>
      <select onChange={handleChange} name="sexo" value={atletaData.sexo}>
        <option value={Sexo.Hombre}> Hombre </option>
        <option value={Sexo.Mujer}> Mujer </option>
      </select>

      <label htmlFor="pesoEnKilos"> Peso (en kg) </label>
      <input onChange={handleChange} type="number" name="pesoEnKilos" value={atletaData.pesoEnKilos}></input>


      <h2> Sobre Atletismo</h2>


      <label htmlFor="aniosEntrenamiento">Años de Entrenamiento</label>
      <input onChange={handleChange} type="number" min={0} name="aniosEntrenamiento" value={atletaData.aniosEntrenamiento}></input>

      <label htmlFor="objetivos"> Objetivos </label>
      <input onChange={handleChange} type="text" name="objetivos" value={atletaData.objetivos}></input>


      <button type="submit" > Cargar </button>
    </form>

  </div>
  )}
