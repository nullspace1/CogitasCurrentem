import { Type } from "class-transformer"
import { Distancia, Semana } from "../typeConfigs"
import { Entrenamiento } from "./entrenamiento"
import { Persistable } from "../../frontend/persistence/persistable"

export class MicroCiclo extends Persistable{

    @Type(() => Entrenamiento)
    private dias : Entrenamiento[]
    private numeroSemana : Semana

    constructor(numeroSemana : Semana){
        super();
        this.numeroSemana = numeroSemana
        this.dias = []
    }

    public agregarEntrenamiento(entrenamiento : Entrenamiento){
        this.dias.push(entrenamiento)
    }

    public getDistanciaTotal() : Distancia{
        return this.dias.map(d => d.getDistancia()).reduce((x,y) => x + y, 0)
    }

}

