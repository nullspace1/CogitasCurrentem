import { Atleta } from "./atleta"
import {   Entrenamiento } from "./entrenamiento"


export class Sesion{

    private entrenamientos : Map<Atleta,Entrenamiento>
    private fechaEntrenamiento : Date
    private lugar : String
    private nombreEntrenamiento : String

    constructor(nombreEntrenamiento : String,fechaEntrenamiento : Date,
       entrenamientos : Map<Atleta,Entrenamiento>, lugar : String){
       this.nombreEntrenamiento = nombreEntrenamiento
       this.fechaEntrenamiento = fechaEntrenamiento
       this.entrenamientos = entrenamientos
       this.lugar = lugar
    }

    registrarEntrenamiento(){
        for (const [atleta,entrenamiento] of this.entrenamientos) {
            atleta.registrarEntrenamiento(entrenamiento)
        }
    }

}

