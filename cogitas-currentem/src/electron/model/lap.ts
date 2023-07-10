
import { Persistable } from "../persistence/persistence"
import { Distancia, Tiempo, Pace, Velocidad } from "../typeConfigs"



export class Lap extends Persistable{

    private distancia : Distancia


    private tiempo : Tiempo

    constructor(tiempo : Tiempo, distanciaRecorrida : Distancia){
        super()
        this.tiempo = tiempo
        this.distancia = distanciaRecorrida
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
