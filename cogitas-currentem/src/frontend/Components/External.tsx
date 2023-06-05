import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";



export const MoveButton: React.FC<{ n: number, msg: string }> = (props: { n: number, msg: string }) => {
  let navigate = useNavigate();
  return (
    <button  onClick={() => navigate(props.n)}>{props.msg}</button>
  );
}


export const Header: React.FC = () => {
  return (
    <div>
      <div >
        <div ><MoveButton n={-1} msg={"Volver"} /></div>
        <div ><MoveButton n={1} msg={"Adelante"} /></div>
      </div>
      <div > Praecurre Alpha v0.1</div>
      <div >
        <Link to={'./atleta'} > Atletas </Link>
        <Link to={'/planificacion'} > Planificacion </Link>
        <Link to={'/historial'}> Historial </Link>
      </div>
      Current: {useLocation().pathname}
    </div>
  )
}
