import React, { useEffect, useState } from "react";
import { Atleta } from "../../electron/model/atleta";
import { Link} from "react-router-dom";
import { DatabaseConnection } from "../PersistenceConnection";




export const Atletas = () => {

  const [atletas, setAtletas] = useState([] as Atleta[])
  const [atletasFiltrados, setAtletasFiltrados] = useState([] as Atleta[])

  const [searchInput, setSearch] = useState("")

  useEffect(() => {
    const getAll = async () => {
      const all = await new DatabaseConnection().getAllAtletas()
      setAtletas(all as Atleta[])
      setAtletasFiltrados(all as Atleta[])
    }

    getAll();
  }, []);

  useEffect(() => {
    setAtletasFiltrados(atletas)
  }, [atletas])

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(e.target.value);
    if (e.target.value === 0) setAtletasFiltrados(atletas); else setAtletasFiltrados(atletas.filter(a => a.nombre.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const borrarAtleta = async (atleta: Atleta) => {
    await new DatabaseConnection().deleteAtleta(atleta)
    let atletas = await new DatabaseConnection().getAllAtletas()
    setAtletas(atletas as Atleta[])
    setAtletasFiltrados(atletas as Atleta[])
  }

  return (
    <div >
      <h1 > Listado de Atletas</h1>
      <p> Aca podes visualizar a todos los atletas cargados en el sistema.</p>
      <div>
        <div>
          <input placeholder="Buscar..." type="Text" onChange={handleSearch} value={searchInput}  />
          <Link to={"./nuevo"}> Nuevo Atleta </Link>
        </div>
        <div>
          <ul>
            {atletasFiltrados.map((a, index) =>
              <li key={index}>
                <div>{a.nombre}</div>
                <Link  to={"./" + a.id}> Ver </Link>
                <button onClick={() => borrarAtleta(a)}>Eliminar</button>
              </li>)}
          </ul>
        </div>
      </div>
    </div>
  )
};






