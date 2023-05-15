import React from "react"
import { Link } from "react-router-dom"

export const Home : React.FC = () => {return (
    <div>
    <h1>Praecurre v0.1 Pre-Alpha</h1>
    <div className = 'Links'>
      <div className= 'Link'> <Link to={'./atletas'}> Atletas </Link> </div>
      <div className= 'Link'> <Link to={'/planificacion'}> Planificacion </Link></div>
      <div className= 'Link'> <Link to= {'/historial'}> Historial </Link> </div>
    </div>
    </div>
)}
