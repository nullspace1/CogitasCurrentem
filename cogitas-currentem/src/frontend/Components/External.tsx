import React from "react";
import { Link, useNavigate } from "react-router-dom";



export const MoveButton : React.FC<{n : number, msg : string}> = (props : {n : number, msg : string}) => {
  let navigate = useNavigate();
    return (
          <button className="return" onClick={() => navigate(props.n)}>{props.msg}</button>
    );
}


export const Header : React.FC = () => {
  return (
    <div className = "header">
      <div className = "MoveButtons">
        <div className = "MoveButton"><MoveButton n={-1} msg={"Volver"} /></div>
        <div className = "MoveButton"><MoveButton n={1} msg={"Adelante"}/></div>
      </div>
      <div className="title"> Praecurre Alpha v0.1</div>
      <div className = "Links">
        <Link to={'./atleta'} className="Link"> Atletas </Link>
        <Link to={'/planificacion'} className="Link"> Planificacion </Link>
        <Link to= {'/historial'} className="Link"> Historial </Link>
      </div>
    </div>
  )
}
