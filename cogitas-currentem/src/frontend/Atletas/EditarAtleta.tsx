import React from "react";
import { Atleta } from "../../electron/model/atleta";
import { AtletaForm } from "./AtletaForm";
import { useParams } from "react-router-dom";

export function EditarAtleta (){
    const {id} = useParams()
    return (<div>id is: {id}<AtletaForm id={id}/></div>)

}
