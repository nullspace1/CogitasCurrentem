import { Type } from "class-transformer"
import { Semana } from "../typeConfigs"
import { Atleta } from "./atleta"
import {   Entrenamiento } from "./entrenamiento"
import { Column, Entity } from "typeorm"
import { Persistable } from "../../frontend/persistence/persistable"

@Entity()

export class Sesion extends Persistable{

    @Type(() => Map<Atleta,Entrenamiento>)
    private entrenamientos : Map<Atleta,Entrenamiento>

    @Column({type: "text"})
    private lugar : string

    @Column({type: "integer"})
    private semana : Semana

    constructor(semana : Semana,
       entrenamientos : Map<Atleta,Entrenamiento>, lugar : string){
        super()
       this.semana = semana
       this.entrenamientos = entrenamientos
       this.lugar = lugar
    }

    init(){}

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

