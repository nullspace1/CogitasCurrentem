import { Semana } from "../typeConfigs"
import { Atleta } from "./atleta"
import {   Entrenamiento } from "./entrenamiento"


export class Sesion{

    private entrenamientos : Map<Atleta,Entrenamiento>
    private lugar : String
    private nombreEntrenamiento : String
    private semana : Semana

    constructor(nombreEntrenamiento : String,semana : Semana,
       entrenamientos : Map<Atleta,Entrenamiento>, lugar : String){
       this.nombreEntrenamiento = nombreEntrenamiento
       this.semana = semana
       this.entrenamientos = entrenamientos
       this.lugar = lugar
    }

    public registrarEntrenamiento(){
        for (const [atleta,entrenamiento] of this.entrenamientos) {
            atleta.agregarEntrenamiento(entrenamiento)
        }
    }

}

