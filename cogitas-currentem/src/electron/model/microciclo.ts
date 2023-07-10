import { Type } from "class-transformer"
import { Distancia, Semana } from "../typeConfigs"
import { Entrenamiento } from "./entrenamiento"
import { Anio, Grupo } from "./anio"
import { Persistable } from "../persistence/persistence"




export class MicroCiclo extends Persistable{

    @Type(() => Entrenamiento)
    private dias : Entrenamiento[]

    private semana : Semana

    constructor(numeroSemana : Semana){
        super()
        this.semana = numeroSemana
    }

    public agregarEntrenamiento(entrenamiento : Entrenamiento){
        this.dias.push(entrenamiento)
    }

    public getDistanciaTotal() : Distancia{
        return this.dias.map(d => d.getDistancia()).reduce((x,y) => x + y, 0)
    }

    public getNumeroSemana() : Semana{
        return this.semana
    }



}

