import { Distancia, Tiempo, Pace } from "../typeConfigs"

export class Lap {

    private distancia : Distancia
    private tiempo : Tiempo

    constructor(tiempo : Tiempo, distanciaRecorrida : Distancia){
        this.tiempo = tiempo
        this.distancia = distanciaRecorrida
    }

    public pace(): Pace {
       var tiempo = this.tiempo.valueOf() / this.distancia.valueOf()
       return tiempo
    }

}
