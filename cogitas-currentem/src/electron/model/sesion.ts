import { Type } from "class-transformer"
import { Semana } from "../typeConfigs"
import { Atleta } from "./atleta"
import {   Entrenamiento } from "./entrenamiento"


export class Sesion{

    @Type(() => Map<Atleta,Entrenamiento>)
    private entrenamientos : Map<Atleta,Entrenamiento>

    private lugar : string
    private semana : Semana

    constructor(semana : Semana,
       entrenamientos : Map<Atleta,Entrenamiento>, lugar : string){
       this.semana = semana
       this.entrenamientos = entrenamientos
       this.lugar = lugar
    }

    public registrarEntrenamiento(){
        for (const [atleta,entrenamiento] of this.entrenamientos) {
            atleta.agregarEntrenamiento(entrenamiento)
        }
    }

    public getLugar() : string {
        return this.lugar;
    }

    public getSemana() : Semana {
        return this.semana
    }

    public getEntrenamientos() : Map<Atleta,Entrenamiento>{
        return this.entrenamientos
    }

}

