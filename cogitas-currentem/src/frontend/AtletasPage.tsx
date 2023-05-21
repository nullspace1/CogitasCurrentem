import React, { useEffect, useLayoutEffect, useState } from "react";
import { Atleta, Sexo } from "../electron/model/atleta";
import { Link, useParams } from "react-router-dom";
import { AtletaDB } from "../electron/persistence/atleta_schema";



export const Atletas = () => {

    const [atletas, setAtletas] = useState([] as Atleta[])
    const [atletasFiltrados,setAtletasFiltrados] = useState([] as Atleta[])

    const [searchInput, setSearch] = useState("")

    useEffect(() => {
          const getAll = async () => {
            const all = await new AtletaDB().getAll()
            setAtletas(all)
          }
          getAll();
      }, []);

    useEffect(() => {
      setAtletasFiltrados(atletas)
    },[atletas])

      const handleSearch = (e) => {
        e.preventDefault()
        setSearch(e.target.value);
        if (e.target.value === 0)  setAtletasFiltrados(atletas); else setAtletasFiltrados(atletas.filter(a=> a.getNombre().toLowerCase().includes(e.target.value.toLowerCase())))
      }

      const borrarAtleta = async (atleta : Atleta) => {
        const newAtletas = await new AtletaDB().delete(atleta)
        setAtletas(newAtletas)
        setAtletasFiltrados(newAtletas)
      }

    return (
        <div className = "Page">
        <h1 className = "Title"> Listado de Atletas</h1>
        <p> Aca podes visualizar a todos los atletas cargados en el sistema.</p>
        <div className = "ListAtletas">
        <div className = "ListAtletasHeader">
          <input placeholder = "Buscar..." type="Text" onChange={handleSearch} value={searchInput} defaultValue={""}/>
          <Link to={"./nuevo"}> Nuevo Atleta </Link>
        </div>
        <div className = "ListAtletas">
          <ul>
          {atletasFiltrados.map((a,index) =>
          <li key = {index}>
            <div className="ListAtletasAtleta">{a.getNombre()}</div>
            <Link className="ListAtletasLink" to={"./"+a.getId()}> Ver </Link>
            <button onClick={() => borrarAtleta(a)}>Eliminar</button>
          </li>)}
          </ul>
        </div>
        </div>
        </div>
    )
};


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

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    const type = event.target.type
    setData(prevData => ({...prevData,[name]: type === "number" ? parseInt(value,10) : value}))
  }

  const crearAtleta = async () => {
      var atleta : Atleta = new Atleta(atletaData.nombre,new Date(atletaData.fechaNacimiento),atletaData.pesoEnKilos,atletaData.alturaEnCm,atletaData.sexo,atletaData.aniosEntrenamiento,atletaData.objetivos)
      new AtletaDB().add(atleta)
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


export const AtletaPag : React.FC<any> = () => {
  const { id } = useParams();
  const [atletaInfo, setAtletaInfo] = useState(null)

  useLayoutEffect( () => {const fetch = async () => {
    const atletas = await new AtletaDB().getAll()
    const atleta = atletas.filter(x => x.getId() !== id)[0]
    setAtletaInfo(atleta)
  }
    fetch()
  },[])

  if (atletaInfo == null) return (<div></div>)

  return (
    <div>
      <h1>{atletaInfo.getNombre()} </h1>
      <div className="infopersonal">
        <h2>Informacion Personal</h2>
        <ul>
        <li>Edad:   {atletaInfo.getEdad()} </li>
        </ul>
      </div>
    </div>
  )
}
