import { Semana } from "../typeConfigs"
import { Entrenamiento } from "./entrenamiento"

export class MicroCiclo{
    private dias : Entrenamiento[]
    private numeroSemana : Semana
    constructor(numeroSemana : Semana){
        this.numeroSemana = numeroSemana
        this.dias = []
    }

    public agregarEntrenamiento(entrenamiento : Entrenamiento){
        this.dias.push(entrenamiento)
    }

}

