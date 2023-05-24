import React, { useEffect, useLayoutEffect, useState } from "react";
import { Atleta, Sexo } from "../../electron/model/atleta";
import { Link, useParams } from "react-router-dom";
import { DatabaseInterface, ExistingDatabase } from "../persistence/persistence";




export const Atletas = () => {

    const [atletas, setAtletas] = useState([] as Atleta[])
    const [atletasFiltrados,setAtletasFiltrados] = useState([] as Atleta[])

    const [searchInput, setSearch] = useState("")

    useEffect(() => {
          const getAll = async () => {
            const all = await new DatabaseInterface(ExistingDatabase.atleta).getAll()
            setAtletas(all as Atleta [])
          }
          getAll();
      }, []);

    useEffect(() => {
      setAtletasFiltrados(atletas)
    },[atletas])

      const handleSearch = (e) => {
        e.preventDefault()
        setSearch(e.target.value);
        if (e.target.value === 0)  setAtletasFiltrados(atletas); else setAtletasFiltrados(atletas.filter(a=> a.nombre.toLowerCase().includes(e.target.value.toLowerCase())))
      }

      const borrarAtleta = async (atleta : Atleta) => {
        const newAtletas = await new DatabaseInterface(ExistingDatabase.atleta).delete(atleta)
        setAtletas(newAtletas as Atleta[])
        setAtletasFiltrados(newAtletas as Atleta[])
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
            <div className="ListAtletasAtleta">{a.nombre}</div>
            <Link className="ListAtletasLink" to={"./"+a.id}> Ver </Link>
            <button onClick={() => borrarAtleta(a)}>Eliminar</button>
          </li>)}
          </ul>
        </div>
        </div>
        </div>
    )
};






