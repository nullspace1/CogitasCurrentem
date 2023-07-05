import { Column, Entity, ManyToOne } from "typeorm"
import { Distancia, Tiempo, Pace, Velocidad } from "../typeConfigs"
import { Entrenamiento } from "./entrenamiento"
import { Type } from "class-transformer"
import { Persistable } from "../../frontend/persistence/persistable"

@Entity()
export class Lap extends Persistable{

    @Column({type:'real'})
    private distancia : Distancia

    @Column({type:'real'})
    private tiempo : Tiempo

    @Type(() => Entrenamiento)
    @ManyToOne(() => Entrenamiento)
    public entrenamiento : Entrenamiento

    init(){}

    constructor(tiempo : Tiempo, distanciaRecorrida : Distancia, entrenamiento :Entrenamiento){
        super()
        this.tiempo = tiempo
        this.distancia = distanciaRecorrida
        this.entrenamiento = entrenamiento;
    }

    public getPace(): Pace {
       return this.tiempo / this.distancia
    }

    public getVelocidad() : Velocidad{
        return this.distancia /  this.tiempo
    }

    public getDistancia() : Distancia{
        return this.distancia
    }

    public getTiempo() : Tiempo {
        return this.tiempo
    }



}
