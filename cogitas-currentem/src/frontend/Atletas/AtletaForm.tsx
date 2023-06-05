import React, { useEffect, useLayoutEffect, useState } from "react";
import { Sexo, Atleta } from "../../electron/model/atleta";
import { DatabaseInterface, ExistingDatabase } from "../persistence/persistence";



export function AtletaForm({ id }: { id: string }) {

  const [atletaData, setData] = useState({
    nombre: "",
    fechaNacimiento: "",
    altura: 0,
    sexo: Sexo.Hombre,
    aniosEntrenamiento: 0,
    peso: 0,
    objetivos: ""
  });

  const [notEdited, setEdited] = useState(true)


  useEffect(() => {
    if (notEdited) {
      const getAtletaExistente = async (id) => {
        const atleta = await new DatabaseInterface(ExistingDatabase.atleta).getById(id) as Atleta
        if (id !== "") {
          setData({
            nombre: atleta.getNombre(),
            fechaNacimiento: atleta.getFechaNacimiento().toISOString().split('T')[0],
            altura: atleta.getAltura(),
            sexo: atleta.getSexo(),
            aniosEntrenamiento: atleta.getAniosEntrenamiento(),
            peso: atleta.getPeso(),
            objetivos: atleta.getObjetivos()
          })
        }

      }
      getAtletaExistente(id)
      setEdited(false)
    }

  }, [atletaData])




  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const type = event.target.type;
    setData(prevData => ({ ...prevData, [name]: type === "number" ? parseInt(value, 10) : value }));

  };

  const transferirEntrenamientos = (atletaViejo: Atleta, atletaNuevo: Atleta) => {
    atletaViejo.getEntrenamientos().forEach(e => { atletaNuevo.agregarEntrenamiento(e) })
    atletaViejo.getCarreras().forEach(e => atletaNuevo.agregarCarrera(e))
    atletaViejo.getTests().forEach(e => atletaNuevo.agregarTest(e))
  }

  const crearAtleta = async () => {
    const db = new DatabaseInterface(ExistingDatabase.atleta);
    var atleta: Atleta = new Atleta(atletaData.nombre, new Date(atletaData.fechaNacimiento), atletaData.peso, atletaData.altura, atletaData.sexo, atletaData.aniosEntrenamiento, atletaData.objetivos);
    if (id !== "") {
      const atletaViejo = await db.getById(id) as Atleta;
      transferirEntrenamientos(atletaViejo, atleta)
      await db.replace(atletaViejo, atleta)
    } else {
      await db.add(atleta);
    }
  };

  return (
    <form onSubmit={crearAtleta}>
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


      <label htmlFor="aniosEntrenamiento">Años de Entrenamiento</label>
      <input onChange={handleChange} type="number" min={0} name="aniosEntrenamiento" value={atletaData.aniosEntrenamiento}></input>

      <label htmlFor="objetivos"> Objetivos </label>
      <input onChange={handleChange} type="text" name="objetivos" value={atletaData.objetivos}></input>


      <button type="submit"> Cargar </button>
    </form>
  );
}
